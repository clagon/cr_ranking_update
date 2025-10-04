import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './drizzle/schema';
import { and, eq, sql } from 'drizzle-orm';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(process.env.DATABASE_URL);

export const db = drizzle(client, { schema });

/**
 * プレイヤーIDを取得します。
 * @param options オプション。forBattleLogがtrueの場合、バトルログが必要なプレイヤーのみを対象とします。
 * @returns プレイヤーIDの配列。
 */
export async function getPlayerIds(options: { forBattleLog?: boolean } = {}) {
    const conditions = [eq(schema.mPlayer.active, true)];
    if (options.forBattleLog) {
        conditions.push(eq(schema.mPlayer.needBattlelog, true));
    }

    const query = db.select({ id: schema.mPlayer.id })
        .from(schema.mPlayer)
        .where(and(...conditions));

    return (await query).map((row: { id: string }) => row.id);
}

/**
 * プレイヤーの統計情報をデータベースに挿入または更新（Upsert）します。
 * @param playerStats 挿入または更新するプレイヤー統計情報の配列。
 */
export function upsertPlayerStats(playerStats: typeof schema.mPlayerStats.$inferInsert[]) {
    return db.insert(schema.mPlayerStats)
        .values(playerStats)
        .onConflictDoUpdate({
            target: schema.mPlayerStats.playerId,
            set: {
                name: sql.raw(`excluded.${schema.mPlayerStats.name.name}`),
                clanId: sql.raw(`excluded.${schema.mPlayerStats.clanId.name}`),
                clanName: sql.raw(`excluded.${schema.mPlayerStats.clanName.name}`),
                currentTrophies: sql.raw(`excluded.${schema.mPlayerStats.currentTrophies.name}`),
                bestTrophies: sql.raw(`excluded.${schema.mPlayerStats.bestTrophies.name}`),
                legacyBestTrophies: sql.raw(`excluded.${schema.mPlayerStats.legacyBestTrophies.name}`),
                legacyBestRank: sql.raw(`excluded.${schema.mPlayerStats.legacyBestRank.name}`),
                legacyHighestTrophies: sql.raw(`excluded.${schema.mPlayerStats.legacyHighestTrophies.name}`),
                battleCount: sql.raw(`excluded.${schema.mPlayerStats.battleCount.name}`),
                winCount: sql.raw(`excluded.${schema.mPlayerStats.winCount.name}`),
                lossCount: sql.raw(`excluded.${schema.mPlayerStats.lossCount.name}`),
                leagueNumber: sql.raw(`excluded.${schema.mPlayerStats.leagueNumber.name}`),
                leagueTrophies: sql.raw(`excluded.${schema.mPlayerStats.leagueTrophies.name}`),
                rank: sql.raw(`excluded.${schema.mPlayerStats.rank.name}`),
            }
        });
}

/**
 * 対戦ログをデータベースに挿入します。競合した場合は何もしません。
 * @param battleLogs 挿入する対戦ログの配列。
 */
export function insertBattleLogs(battleLogs: typeof schema.tBattleLog.$inferInsert[]) {
    return db.insert(schema.tBattleLog)
        .values(battleLogs)
        .onConflictDoNothing({
            target: [
                schema.tBattleLog.teamId,
                schema.tBattleLog.battleTime,
            ]
        })
        .returning({ id: schema.tBattleLog.id });
}

/**
 * カード情報をデータベースに挿入または更新（Upsert）します。
 * @param cards 挿入または更新するカード情報の配列。
 */
export async function upsertCards(cards: typeof schema.mCard.$inferInsert[]) {
    return db.insert(schema.mCard)
        .values(cards)
        .onConflictDoUpdate({
            target: schema.mCard.id,
            set: {
                name: sql.raw(`excluded.${schema.mCard.name.name}`),
                // nameJp: sql.raw(`excluded.${schema.mCard.nameJp.name}`),
                rarity: sql.raw(`excluded.${schema.mCard.rarity.name}`),
                elixir: sql.raw(`excluded.${schema.mCard.elixir.name}`),
            }
        });
}

/**
 * 日本語名を含むカード情報をデータベースに挿入または更新（Upsert）します。
 * @param cards 挿入または更新するカード情報の配列。
 */
export async function upsertCardsWithJP(cards: typeof schema.mCard.$inferInsert[]) {
    return db.insert(schema.mCard)
        .values(cards)
        .onConflictDoUpdate({
            target: schema.mCard.id,
            set: {
                name: sql.raw(`excluded.${schema.mCard.name.name}`),
                nameJp: sql.raw(`excluded.${schema.mCard.nameJp.name}`),
                rarity: sql.raw(`excluded.${schema.mCard.rarity.name}`),
                elixir: sql.raw(`excluded.${schema.mCard.elixir.name}`),
            }
        });
}

/**
 * サポートカード情報をデータベースに挿入または更新（Upsert）します。
 * @param supportCards 挿入または更新するサポートカード情報の配列。
 */
export async function upsertSupportCards(supportCards: typeof schema.mSupportCard.$inferInsert[]) {
    return db.insert(schema.mSupportCard)
        .values(supportCards)
        .onConflictDoUpdate({
            target: schema.mSupportCard.id,
            set: {
                name: sql.raw(`excluded.${schema.mSupportCard.name.name}`),
                // nameJp: sql.raw(`excluded.${schema.mSupportCard.nameJp.name}`),
                rarity: sql.raw(`excluded.${schema.mSupportCard.rarity.name}`),
            }
        });
}

/**
 * 日本語名を含むサポートカード情報をデータベースに挿入または更新（Upsert）します。
 * @param supportCards 挿入または更新するサポートカード情報の配列。
 */
export async function upsertSupportCardsWithJP(supportCards: typeof schema.mSupportCard.$inferInsert[]) {
    return db.insert(schema.mSupportCard)
        .values(supportCards)
        .onConflictDoUpdate({
            target: schema.mSupportCard.id,
            set: {
                name: sql.raw(`excluded.${schema.mSupportCard.name.name}`),
                nameJp: sql.raw(`excluded.${schema.mSupportCard.nameJp.name}`),
                rarity: sql.raw(`excluded.${schema.mSupportCard.rarity.name}`),
            }
        });
}

/**
 * データベースからすべてのカード情報を取得します。
 * @returns カード情報の配列。
 */
export async function getCards() {
    return db.select().from(schema.mCard)
}

/**
 * データベースからすべてのサポートカード情報を取得します。
 * @returns サポートカード情報の配列。
 */
export async function getSupportCards() {
    return db.select().from(schema.mSupportCard)
}