import * as schema from './drizzle/schema';
import { setTimeout } from 'timers/promises';
import { insertBattleLogs, upsertCards, upsertPlayerStats, upsertSupportCards } from './db';
import { getBattleLog as getBattleLogs, getCards, getPlayerInfo } from './api';
import { battleLogToBattleLogInsert, cardsToCardInserts, playerInfoToPlayerStats, supportCardsToSupportCardInserts, toIso } from './utils';

/**
 * カードマスターデータを更新します。APIからカード情報を取得し、データベースを更新します。
 */
export async function updateCardMaster() {
    try {
        // データ取得
        const cardsResponse = await getCards();

        // マスターデータの生成
        const cardInserts = cardsToCardInserts(cardsResponse);
        const supportCardInserts = supportCardsToSupportCardInserts(cardsResponse);

        // 一括更新
        await upsertCards(cardInserts);
        console.log(`Updated ${cardInserts.length} cards`);
        await upsertSupportCards(supportCardInserts);
        console.log(`Updated ${supportCardInserts.length} support cards`);
    } catch (error) {
        console.error(`Failed to update card master:`, error);
        throw error;
    }
}

/**
 * 指定されたプレイヤーIDのプレイヤー統計情報を更新します。
 * @param playerIds 更新するプレイヤーのIDの配列。
 */
export async function updatePlayerStats(playerIds: string[]) {
    // 更新するプレイヤーデータの配列
    const playerDataToUpdate: typeof schema.mPlayerStats.$inferInsert[] = [];

    // プレイヤーデータをAPIから取得
    for (const playerId of playerIds) {
        try {
            const playerInfo = await getPlayerInfo(playerId);
            playerDataToUpdate.push(playerInfoToPlayerStats(playerInfo));
        } catch (error) {
            console.error(`Failed to get player stats for ${playerId}:`, error);
        }

        await setTimeout(1000); // 1秒待機
    }

    // 更新するデータがない場合は終了
    if (playerDataToUpdate.length === 0) {
        console.log('No player stats to update.');
        return;
    }

    // 一括更新
    try {
        await upsertPlayerStats(playerDataToUpdate);
        console.log(`Updated player stats for ${playerDataToUpdate.length} players.`);
    } catch (error) {
        console.error(`Failed to upsert player stats:`, error);
        throw error; // エラーを再スローして呼び出し元に伝える
    }
}

/**
 * 指定されたプレイヤーIDの対戦ログを更新します。
 * @param playerIds 更新するプレイヤーのIDの配列。
 */
export async function updateBattleLogs(playerIds: string[]) {
    // 更新するバトルログデータの配列
    const battleLogDataToInsert: typeof schema.tBattleLog.$inferInsert[] = [];

    for (const playerId of playerIds) {
        try {
            const battleLogs = await getBattleLogs(playerId);
            battleLogs.filter(log => log.type === 'pathOfLegend').forEach(log => {
                try {
                    battleLogDataToInsert.push(battleLogToBattleLogInsert(log));
                } catch (error) {
                    console.error(`Failed to convert battle log for player ${playerId}:`, error);
                }
            });
        } catch (error) {
            console.error(`Failed to get battle logs for ${playerId}:`, error);
        }

        await setTimeout(1000); // 1秒待機
    }

    // 更新するデータがない場合は終了
    if (battleLogDataToInsert.length === 0) {
        console.log('No battle logs to insert.');
        return;
    }

    // 一括更新
    try {
        battleLogDataToInsert.sort(
            (a, b) => (
                new Date(toIso(a.battleTime))
            ).getTime() - (
                new Date(toIso(b.battleTime))
            ).getTime()
        );
        const ids = await insertBattleLogs(battleLogDataToInsert);
        console.log(`Inserted ${ids.length} battle logs.`);
    } catch (error) {
        console.error(`Failed to insert battle logs:`, error);
        throw error;
    }
}