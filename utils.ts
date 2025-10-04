import * as schema from './drizzle/schema';
import { BattleLog, CardsResponse, PlayerInfo } from './type';


/**
 * タグから '#' を削除します。
 * @param tag プレイヤーまたはクランのタグ。
 * @returns '#' が削除されたタグ。
 */
function cleanTag(tag: string): string {
    return tag.replace('#', '');
}

/**
 * PlayerInfoオブジェクトをmPlayerStatsテーブルの挿入形式に変換します。
 * @param playerInfo プレイヤー情報。
 * @returns 挿入形式のプレイヤー統計情報。
 */
export function playerInfoToPlayerStats(playerInfo: PlayerInfo): typeof schema.mPlayerStats.$inferInsert {
    return {
        playerId: cleanTag(playerInfo.tag),
        name: playerInfo.name,
        clanId: playerInfo.clan ? cleanTag(playerInfo.clan.tag) : null,
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

/**
 * BattleLogオブジェクトをtBattleLogテーブルの挿入形式に変換します。
 * @param battleLog 対戦ログ情報。
 * @returns 挿入形式の対戦ログ情報。
 */
export function battleLogToBattleLogInsert(battleLog: BattleLog): typeof schema.tBattleLog.$inferInsert {

    const teamPlayer = battleLog.team[0];
    const opponentPlayer = battleLog.opponent[0];

    const teamCards = teamPlayer.cards.map(c => c.id);
    const opponentCards = opponentPlayer.cards.map(c => c.id);

    if (teamCards.length < 8 || opponentCards.length < 8 || teamPlayer.supportCards.length === 0 || opponentPlayer.supportCards.length === 0) {
        throw new Error('Battle log data does not meet schema requirements (cards/support cards).');
    }

    return {
        teamId: cleanTag(teamPlayer.tag),
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
        teamRank: teamPlayer.globalRank || null,
        opponentId: cleanTag(opponentPlayer.tag),
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
        opponentRank: opponentPlayer.globalRank || null,
        league: battleLog.leagueNumber,
        battleTime: battleLog.battleTime,
        opponentClanId: opponentPlayer.clan ? cleanTag(opponentPlayer.clan.tag) : null,
        opponentClanName: opponentPlayer.clan ? opponentPlayer.clan.name : null,
        teamClanId: teamPlayer.clan ? cleanTag(teamPlayer.clan.tag) : null,
        teamClanName: teamPlayer.clan ? teamPlayer.clan.name : null,
    };
}

/**
 * CardsResponseオブジェクトをmCardテーブルの挿入形式の配列に変換します。
 * @param cardsResponse カード情報のレスポンス。
 * @returns 挿入形式のカード情報の配列。
 */
export function cardsToCardInserts(cardsResponse: CardsResponse): typeof schema.mCard.$inferInsert[] {
    return cardsResponse.items.map(card => ({
        id: card.id,
        name: card.name,
        rarity: card.rarity,
        elixir: card.elixirCost || null,
    }));
}

/**
 * CardsResponseオブジェクトをmSupportCardテーブルの挿入形式の配列に変換します。
 * @param cardsResponse カード情報のレスポンス。
 * @returns 挿入形式のサポートカード情報の配列。
 */
export function supportCardsToSupportCardInserts(cardsResponse: CardsResponse): typeof schema.mSupportCard.$inferInsert[] {
    return cardsResponse.supportItems.map(card => ({
        id: card.id,
        name: card.name,
        rarity: card.rarity,
    }));
}

export function toIso(dateString: string): string {
    return dateString.replace(
        /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
        '$1-$2-$3T$4:$5:$6'
    )
}