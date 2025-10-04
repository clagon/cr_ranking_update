import { pgTable, foreignKey, serial, varchar, integer, timestamp, boolean, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const tBattleLog = pgTable("t_battle_log", {
	id: serial().primaryKey().notNull(),
	teamId: varchar("team_id", { length: 20 }).notNull(),
	teamCrown: integer("team_crown").notNull(),
	teamCard1: integer("team_card_1").notNull(),
	teamCard2: integer("team_card_2").notNull(),
	teamCard3: integer("team_card_3").notNull(),
	teamCard4: integer("team_card_4").notNull(),
	teamCard5: integer("team_card_5").notNull(),
	teamCard6: integer("team_card_6").notNull(),
	teamCard7: integer("team_card_7").notNull(),
	teamCard8: integer("team_card_8").notNull(),
	teamSupportCard: integer("team_support_card").notNull(),
	teamRank: integer("team_rank"),
	opponentId: varchar("opponent_id", { length: 20 }).notNull(),
	opponentName: varchar("opponent_name", { length: 50 }).notNull(),
	opponentCrown: integer("opponent_crown").notNull(),
	opponentCard1: integer("opponent_card_1").notNull(),
	opponentCard2: integer("opponent_card_2").notNull(),
	opponentCard3: integer("opponent_card_3").notNull(),
	opponentCard4: integer("opponent_card_4").notNull(),
	opponentCard5: integer("opponent_card_5").notNull(),
	opponentCard6: integer("opponent_card_6").notNull(),
	opponentCard7: integer("opponent_card_7").notNull(),
	opponentCard8: integer("opponent_card_8").notNull(),
	opponentSupportCard: integer("opponent_support_card").notNull(),
	opponentRank: integer("opponent_rank"),
	league: integer().notNull(),
	battleTime: timestamp("battle_time", { mode: 'string' }).notNull(),
	opponentClanId: varchar("opponent_clan_id", { length: 20 }),
	opponentClanName: varchar("opponent_clan_name", { length: 20 }),
	teamClanName: varchar("team_clan_name", { length: 20 }),
	teamClanId: varchar("team_clan_id", { length: 20 }),
}, (table) => [
	foreignKey({
			columns: [table.teamId],
			foreignColumns: [mPlayer.id],
			name: "t_battle_log_team_id_fkey"
		}),
	foreignKey({
			columns: [table.teamCard1],
			foreignColumns: [mCard.id],
			name: "t_battle_log_team_card_1_fkey"
		}),
	foreignKey({
			columns: [table.teamCard2],
			foreignColumns: [mCard.id],
			name: "t_battle_log_team_card_2_fkey"
		}),
	foreignKey({
			columns: [table.teamCard3],
			foreignColumns: [mCard.id],
			name: "t_battle_log_team_card_3_fkey"
		}),
	foreignKey({
			columns: [table.teamCard4],
			foreignColumns: [mCard.id],
			name: "t_battle_log_team_card_4_fkey"
		}),
	foreignKey({
			columns: [table.teamCard5],
			foreignColumns: [mCard.id],
			name: "t_battle_log_team_card_5_fkey"
		}),
	foreignKey({
			columns: [table.teamCard6],
			foreignColumns: [mCard.id],
			name: "t_battle_log_team_card_6_fkey"
		}),
	foreignKey({
			columns: [table.teamCard7],
			foreignColumns: [mCard.id],
			name: "t_battle_log_team_card_7_fkey"
		}),
	foreignKey({
			columns: [table.teamCard8],
			foreignColumns: [mCard.id],
			name: "t_battle_log_team_card_8_fkey"
		}),
	foreignKey({
			columns: [table.teamSupportCard],
			foreignColumns: [mSupportCard.id],
			name: "t_battle_log_team_support_card_fkey"
		}),
	foreignKey({
			columns: [table.opponentCard1],
			foreignColumns: [mCard.id],
			name: "t_battle_log_enemy_card_1_fkey"
		}),
	foreignKey({
			columns: [table.opponentCard2],
			foreignColumns: [mCard.id],
			name: "t_battle_log_enemy_card_2_fkey"
		}),
	foreignKey({
			columns: [table.opponentCard3],
			foreignColumns: [mCard.id],
			name: "t_battle_log_enemy_card_3_fkey"
		}),
	foreignKey({
			columns: [table.opponentCard4],
			foreignColumns: [mCard.id],
			name: "t_battle_log_enemy_card_4_fkey"
		}),
	foreignKey({
			columns: [table.opponentCard5],
			foreignColumns: [mCard.id],
			name: "t_battle_log_enemy_card_5_fkey"
		}),
	foreignKey({
			columns: [table.opponentCard6],
			foreignColumns: [mCard.id],
			name: "t_battle_log_enemy_card_6_fkey"
		}),
	foreignKey({
			columns: [table.opponentCard7],
			foreignColumns: [mCard.id],
			name: "t_battle_log_enemy_card_7_fkey"
		}),
	foreignKey({
			columns: [table.opponentCard8],
			foreignColumns: [mCard.id],
			name: "t_battle_log_enemy_card_8_fkey"
		}),
	foreignKey({
			columns: [table.opponentSupportCard],
			foreignColumns: [mSupportCard.id],
			name: "t_battle_log_enemy_support_card_fkey"
		}),
]);

export const mCard = pgTable("m_card", {
	id: integer().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	nameJp: varchar("name_jp", { length: 50 }),
	rarity: varchar({ length: 15 }).notNull(),
	elixir: integer(),
});

export const mSupportCard = pgTable("m_support_card", {
	id: integer().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	nameJp: varchar("name_jp", { length: 50 }),
	rarity: varchar({ length: 15 }).notNull(),
});

export const mPlayer = pgTable("m_player", {
	id: varchar({ length: 20 }).primaryKey().notNull(),
	nameAlt: varchar("name_alt", { length: 50 }),
	twitter: varchar({ length: 20 }),
	active: boolean().default(false).notNull(),
	needBattlelog: boolean("need_battlelog").default(false).notNull(),
});

export const mPlayerStats = pgTable("m_player_stats", {
	playerId: varchar("player_id", { length: 20 }).primaryKey().notNull(),
	name: text().notNull(),
	clanId: varchar("clan_id", { length: 20 }),
	clanName: text("clan_name"),
	currentTrophies: integer("current_trophies").notNull(),
	bestTrophies: integer("best_trophies").notNull(),
	legacyBestTrophies: integer("legacy_best_trophies"),
	legacyBestRank: integer("legacy_best_rank"),
	legacyHighestTrophies: integer("legacy_highest_trophies"),
	battleCount: integer("battle_count").notNull(),
	winCount: integer("win_count").notNull(),
	lossCount: integer("loss_count").notNull(),
	leagueNumber: integer("league_number"),
	leagueTrophies: integer("league_trophies"),
	rank: integer(),
}, (table) => [
	foreignKey({
			columns: [table.playerId],
			foreignColumns: [mPlayer.id],
			name: "m_player_stats_player_id_fkey"
		}),
]);
