import * as schema from './drizzle/schema';
import { BattleLog, CardsResponse, PlayerInfo } from './type';

export function playerInfoToPlayerStats(playerInfo: PlayerInfo): typeof schema.mPlayerStats.$inferInsert {
    return {
        playerId: playerInfo.tag.replace('#', ''),
        name: playerInfo.name,
        clanId: playerInfo.clan ? playerInfo.clan.tag : null,
        clanName: playerInfo.clan ? playerInfo.clan.name : null,
        currentTrophies: playerInfo.trophies,
        bestTrophies: playerInfo.bestTrophies,
        legacyBestTrophies: playerInfo.leagueStatistics?.bestSeason?.trophies || null,
        legacyBestRank: playerInfo.leagueStatistics?.bestSeason?.rank || null,
        legacyHighestTrophies: playerInfo.legacyTrophyRoadHighScore || null,
        battleCount: playerInfo.battleCount,
        winCount: playerInfo.wins,
        lossCount: playerInfo.losses,
        leagueNumber: playerInfo.currentPathOfLegendSeasonResult?.leagueNumber || null,
        leagueTrophies: playerInfo.currentPathOfLegendSeasonResult?.trophies || null,
        rank: playerInfo.currentPathOfLegendSeasonResult?.rank || null,
    }
}

export function battleLogToBattleLogInsert(battleLog: BattleLog): typeof schema.tBattleLog.$inferInsert {

    const teamPlayer = battleLog.team[0];
    const opponentPlayer = battleLog.opponent[0];

    const teamCards = teamPlayer.cards.map(c => c.id);
    const opponentCards = opponentPlayer.cards.map(c => c.id);

    if (teamCards.length < 8 || opponentCards.length < 8 || teamPlayer.supportCards.length === 0 || opponentPlayer.supportCards.length === 0) {
        throw new Error('Battle log data does not meet schema requirements (cards/support cards).');
    }

    return {
        teamId: teamPlayer.tag.replace('#', ''),
        teamCrown: teamPlayer.crowns,
        teamCard1: teamCards[0],
        teamCard2: teamCards[1],
        teamCard3: teamCards[2],
        teamCard4: teamCards[3],
        teamCard5: teamCards[4],
        teamCard6: teamCards[5],
        teamCard7: teamCards[6],
        teamCard8: teamCards[7],
        teamSupportCard: teamPlayer.supportCards[0].id,
        teamRank: teamPlayer.globalRank || null, // globalRank is 'null' in the type definition
        opponentId: opponentPlayer.tag.replace('#', ''),
        opponentName: opponentPlayer.name,
        opponentCrown: opponentPlayer.crowns,
        opponentCard1: opponentCards[0],
        opponentCard2: opponentCards[1],
        opponentCard3: opponentCards[2],
        opponentCard4: opponentCards[3],
        opponentCard5: opponentCards[4],
        opponentCard6: opponentCards[5],
        opponentCard7: opponentCards[6],
        opponentCard8: opponentCards[7],
        opponentSupportCard: opponentPlayer.supportCards[0].id,
        opponentRank: opponentPlayer.globalRank || null, // globalRank is 'null' in the type definition
        league: battleLog.leagueNumber,
        battleTime: battleLog.battleTime,
        opponentClanId: opponentPlayer.clan?.tag.replace('#', '') || null,
        opponentClanName: opponentPlayer.clan?.name || null,
        teamClanId: teamPlayer.clan?.tag.replace('#', '') || null,
        teamClanName: teamPlayer.clan?.name || null,
    };
}

export function cardsToCardInserts(cardsResponse: CardsResponse): typeof schema.mCard.$inferInsert[] {
    return cardsResponse.items.map(card => ({
        id: card.id,
        name: card.name,
        rarity: card.rarity,
        elixir: card.elixirCost || null,
    }));
}
export function supportCardsToSupportCardInserts(cardsResponse: CardsResponse): typeof schema.mSupportCard.$inferInsert[] {
    return cardsResponse.supportItems.map(card => ({
        id: card.id,
        name: card.name,
        rarity: card.rarity,
    }));
}