import * as schema from './drizzle/schema';
import { setTimeout } from 'timers/promises';
import { insertBattleLogs, upsertCards, upsertPlayerStats, upsertSupportCards } from './db';
import { getBattleLog as getBattleLogs, getCards, getPlayerInfo } from './api';
import { battleLogToBattleLogInsert, cardsToCardInserts, playerInfoToPlayerStats, supportCardsToSupportCardInserts } from './utils';
import { CardInfo } from './type';

export async function updateCardMaster() {
    // データ取得
    const cardsResponse = await getCards();
    const cards = cardsResponse.items;
    const supportCards = cardsResponse.supportItems;

    // マスターデータの生成
    const cardInserts = cardsToCardInserts(cardsResponse);
    const supportCardInserts = supportCardsToSupportCardInserts(cardsResponse);

    // 一括更新
    try {
        await upsertCards(cardInserts);
        console.log(`Updated ${cardInserts.length} cards`);
        await upsertSupportCards(supportCardInserts);
        console.log(`Updated ${supportCardInserts.length} support cards`);
    } catch (error: any) {
        console.error(`Failed to update card master: ${error.message}`);
    }
}

export async function updatePlayerStats(playerIds: string[]) {
    // 更新するプレイヤーデータの配列
    const playerDataToUpdate: typeof schema.mPlayerStats.$inferInsert[] = [];

    // プレイヤーデータをAPIから取得
    for (const playerId of playerIds) {
        try {
            const playerInfo = await getPlayerInfo(playerId);
            playerDataToUpdate.push(playerInfoToPlayerStats(playerInfo))
        } catch (error: any) {
            console.error(`Failed to update player stats for ${playerId}: ${error.message}`);
        }

        await setTimeout(1000); // 1秒待機
    }

    // 更新するデータがない場合は終了
    if (playerDataToUpdate.length === 0) {
        console.log('No player stats to update.');
        process.exit(0);
    }

    // 一括更新
    try {
        await upsertPlayerStats(playerDataToUpdate);
        console.log(`Updated player stats`);
    } catch (error: any) {
        console.error(`Failed to update player stats: ${error.message}`);
    }
}

export async function updateBattleLogs(playerIds: string[]) {
    // 更新するバトルログデータの配列
    const battleLogDataToInsert: typeof schema.tBattleLog.$inferInsert[] = [];

    for (const playerId of playerIds) {
        try {
            const battleLogs = await getBattleLogs(playerId);
            battleLogs.filter(log => log.type === 'pathOfLegend').forEach(log => {
                battleLogDataToInsert.push(battleLogToBattleLogInsert(log));
            });
        } catch (error: any) {
            console.error(`Failed to update battle logs for ${playerId}: ${error.message}`);
        }

        await setTimeout(1000); // 1秒待機
    }

    // 更新するデータがない場合は終了
    if (battleLogDataToInsert.length === 0) {
        console.log('No battle logs to update.');
        process.exit(0);
    }

    // 一括更新
    try {
        await insertBattleLogs(battleLogDataToInsert);
        console.log(`Updated battle logs`);
    } catch (error: any) {
        console.error(`Failed to update battle logs: ${error.message}`);
    }
}