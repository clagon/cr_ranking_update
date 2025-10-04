import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './drizzle/schema';
import { and, eq, sql } from 'drizzle-orm';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(process.env.DATABASE_URL);

export const db = drizzle(client, { schema });

export async function getPlayerIds() {
    return (await db.select({ id: schema.mPlayer.id })
        .from(schema.mPlayer)
        .where(eq(schema.mPlayer.active, true)))
        .map((row: { id: string }) => row.id);
}

export async function getPlayerIdsForBattleLog() {
    return (await db.select({ id: schema.mPlayer.id })
        .from(schema.mPlayer)
        .where(
            and(
                eq(schema.mPlayer.active, true),
                eq(schema.mPlayer.needBattlelog, true)
            )
        ))
        .map((row: { id: string }) => row.id);
}


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

export function insertBattleLogs(battleLogs: typeof schema.tBattleLog.$inferInsert[]) {
    return db.insert(schema.tBattleLog)
        .values(battleLogs)
        .onConflictDoNothing({
            target: [
                schema.tBattleLog.teamId,
                schema.tBattleLog.battleTime,
            ]
        });
}

export async function upsertCards(cards: typeof schema.mCard.$inferInsert[]) {
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

export async function upsertSupportCards(supportCards: typeof schema.mSupportCard.$inferInsert[]) {
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

export async function getCards() {
    return db.select().from(schema.mCard)
}

export async function getSupportCards() {
    return db.select().from(schema.mSupportCard)
}