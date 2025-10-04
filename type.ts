export interface PlayerInfo {
    tag: string;
    name: string;
    expLevel: number;
    trophies: number;
    bestTrophies: number;
    wins: number;
    losses: number;
    battleCount: number;
    threeCrownWins: number;
    challengeCardsWon: number;
    challengeMaxWins: number;
    tournamentCardsWon: number;
    tournamentBattleCount: number;
    role: string;
    donations: number;
    donationsReceived: number;
    totalDonations: number;
    warDayWins: number;
    clanCardsCollected: number;
    clan?: Clan;
    arena: Arena;
    leagueStatistics: LeagueStatistics;
    badges: Badge[];
    achievements: Achievement[];
    cards: Card[];
    supportCards: SupportCard[];
    currentDeck: Card[];
    currentDeckSupportCards: SupportCard[];
    currentFavouriteCard: FavouriteCard;
    starPoints: number;
    expPoints: number;
    legacyTrophyRoadHighScore?: number;
    currentPathOfLegendSeasonResult?: PathOfLegendSeasonResult;
    lastPathOfLegendSeasonResult?: PathOfLegendSeasonResult;
    bestPathOfLegendSeasonResult?: PathOfLegendSeasonResult;
    progress: Progress;
    totalExpPoints: number;
}

export interface Clan {
    tag: string;
    name: string;
    badgeId: number;
}

export interface Arena {
    id: number;
    name: string;
}

export interface LeagueStatistics {
    currentSeason: CurrentSeason;
    previousSeason: PastSeason;
    bestSeason: PastSeason;
}

export interface CurrentSeason {
    trophies: number;
    bestTrophies: number;
}

export interface PastSeason {
    id: string;
    rank: number;
    trophies: number;
    bestTrophies: number;
}

export interface Badge {
    name: string;
    level?: number;
    maxLevel?: number;
    progress: number;
    target?: number;
    iconUrls: IconUrls;
}

export interface IconUrls {
    large?: string;
    medium?: string;
    evolutionMedium?: string;
}

export interface Achievement {
    name: string;
    stars: number;
    value: number;
    target: number;
    info: string;
    completionInfo: null;
}

export interface Card {
    name: string;
    id: number;
    level: number;
    maxLevel: number;
    rarity: string;
    count: number;
    elixirCost?: number;
    iconUrls: IconUrls;
    starLevel?: number;
    evolutionLevel?: number;
    maxEvolutionLevel?: number;
}

export interface SupportCard {
    name: string;
    id: number;
    level: number;
    maxLevel: number;
    rarity: string;
    count: number;
    iconUrls: IconUrls;
}

export interface FavouriteCard {
    name: string;
    id: number;
    maxLevel: number;
    maxEvolutionLevel?: number;
    elixirCost: number;
    iconUrls: IconUrls;
    rarity: string;
}

export interface PathOfLegendSeasonResult {
    leagueNumber: number;
    trophies: number;
    rank: number | null;
}

export interface Progress {
    [key: string]: ProgressItem;
}

export interface ProgressItem {
    arena: Arena;
    trophies: number;
    bestTrophies: number;
}

export interface BattleLog {
    type: string;
    battleTime: string;
    isLadderTournament: boolean;
    arena: Arena;
    gameMode: GameMode;
    deckSelection: string;
    team: Player[];
    opponent: Player[];
    isHostedMatch: boolean;
    leagueNumber: number;
}

export interface GameMode {
    id: number;
    name: string;
}

export interface Player {
    tag: string;
    name: string;
    trophyChange?: number; // opponentには存在しないためオプショナル
    crowns: number;
    kingTowerHitPoints: number;
    princessTowersHitPoints: null;
    cards: BattleCard[];
    supportCards: SupportCard[];
    globalRank: null;
    elixirLeaked: number;
    clan?: Clan; // teamには存在しないためオプショナル
}


export interface BattleCard {
    name: string;
    id: number;
    level: number;
    maxLevel: number;
    rarity: string;
    elixirCost?: number; // Mirrorなど一部のカードには存在しない
    iconUrls: IconUrls;
    evolutionLevel?: number;
    maxEvolutionLevel?: number;
    starLevel?: number;
}

export interface CardsResponse {
    items: CardInfo[];
    supportItems: SupportItemInfo[];
}

export interface CardInfo {
    name: string;
    id: number;
    maxLevel: number;
    maxEvolutionLevel?: number;
    elixirCost?: number;
    iconUrls: IconUrls;
    rarity: string;
}

export interface SupportItemInfo {
    name: string;
    id: number;
    maxLevel: number;
    iconUrls: IconUrls;
    rarity: string;
}
