import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './drizzle/schema';
import { eq, sql } from 'drizzle-orm';
import { BattleLog, PlayerInfo } from './type';
import { setTimeout } from 'timers/promises';


if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(process.env.DATABASE_URL);

export const db = drizzle(client, { schema });

async function getPlayerIds() {
    return (await db.select({ id: schema.mPlayer.id })
        .from(schema.mPlayer)
        .where(eq(schema.mPlayer.active, true)))
        .map((row: { id: string }) => row.id);
}

async function getPlayerInfo(id: string): Promise<PlayerInfo> {
    const API_URL = `https://api.clashroyale.com/v1/players/%23${encodeURIComponent(id)}`;

    const headers = {
        'Authorization': `Bearer ${process.env.CLASH_ROYALE_API_KEY}`,
        'Accept': 'application/json'
    };
    const res = await fetch(API_URL, { headers });
    if (!res.ok) {
        throw new Error(`Failed to fetch player info: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

async function getBattleLog(id: string): Promise<BattleLog[]> {
    const API_URL = `https://api.clashroyale.com/v1/players/%23${encodeURIComponent(id)}/battlelog`;

    const headers = {
        'Authorization': `Bearer ${process.env.CLASH_ROYALE_API_KEY}`,
        'Accept': 'application/json'
    };
    const res = await fetch(API_URL, { headers });
    if (!res.ok) {
        throw new Error(`Failed to fetch battle log: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

function playerInfoToPlayerStats(playerInfo: PlayerInfo) {
    return {
        playerId: playerInfo.tag,
        name: playerInfo.name,
        clanId: playerInfo.clan?.tag || null,
        clanName: playerInfo.clan?.name || null,
        currentTrophies: playerInfo.trophies,
        bestTrophies: playerInfo.bestTrophies,
        legacyBestTrophies: playerInfo.leagueStatistics?.bestSeason?.bestTrophies || 0,
        legacyBestRank: playerInfo.leagueStatistics?.bestSeason?.rank || null,
        legacyHighestTrophies: playerInfo.legacyTrophyRoadHighScore || 0,
        battleCount: playerInfo.battleCount,
        winCount: playerInfo.wins,
        lossCount: playerInfo.losses,
        leagueNumber: playerInfo.currentPathOfLegendSeasonResult?.leagueNumber || 0,
        leagueTrophies: playerInfo.currentPathOfLegendSeasonResult?.trophies || 0,
        rank: playerInfo.currentPathOfLegendSeasonResult?.rank || 0,
    }
}


async function main() {

    const playerIds = await getPlayerIds();

    const playerDataToUpdate: typeof schema.mPlayerStats.$inferInsert[] = [];

    for (const playerId of playerIds) {
        try {
            const playerInfo = await getPlayerInfo(playerId);
            playerDataToUpdate.push(playerInfoToPlayerStats(playerInfo))
        } catch (error: any) {
            console.error(`Failed to update player stats for ${playerId}: ${error.message}`);
        }

        await setTimeout(1000); // 1秒待機
    }

    // 一括更新
    try {
        if (playerDataToUpdate.length === 0) {
            console.log('No player stats to update.');
            return;
        }
        await db.insert(schema.mPlayerStats)
            .values(playerDataToUpdate)
            .onConflictDoUpdate({
                target: schema.mPlayerStats.playerId,
                set: {
                    name: sql`excluded.name`,
                    clanId: sql`excluded.clan_id`,
                    clanName: sql`excluded.clan_name`,
                    currentTrophies: sql`excluded.current_trophies`,
                    bestTrophies: sql`excluded.best_trophies`,
                    legacyBestTrophies: sql`excluded.legacy_best_trophies`,
                    legacyBestRank: sql`excluded.legacy_best_rank`,
                    legacyHighestTrophies: sql`excluded.legacy_highest_trophies`,
                    battleCount: sql`excluded.battle_count`,
                    winCount: sql`excluded.win_count`,
                    lossCount: sql`excluded.loss_count`,
                    leagueNumber: sql`excluded.league_number`,
                    leagueTrophies: sql`excluded.league_trophies`,
                    rank: sql`excluded.rank`,
                }
            });
        console.log(`Updated player stats`);
    } catch (error: any) {
        console.error(`Failed to update player stats: ${error.message}`);
    }
}

main().catch((error) => {
    console.error('Error in main:', error);
    process.exit(1);
});