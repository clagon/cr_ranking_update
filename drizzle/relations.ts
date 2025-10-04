import { relations } from "drizzle-orm/relations";
import { mPlayer, tBattleLog, mCard, mSupportCard, mPlayerStats } from "./schema";

export const tBattleLogRelations = relations(tBattleLog, ({one}) => ({
	mPlayer: one(mPlayer, {
		fields: [tBattleLog.teamId],
		references: [mPlayer.id]
	}),
	mCard_teamCard1: one(mCard, {
		fields: [tBattleLog.teamCard1],
		references: [mCard.id],
		relationName: "tBattleLog_teamCard1_mCard_id"
	}),
	mCard_teamCard2: one(mCard, {
		fields: [tBattleLog.teamCard2],
		references: [mCard.id],
		relationName: "tBattleLog_teamCard2_mCard_id"
	}),
	mCard_teamCard3: one(mCard, {
		fields: [tBattleLog.teamCard3],
		references: [mCard.id],
		relationName: "tBattleLog_teamCard3_mCard_id"
	}),
	mCard_teamCard4: one(mCard, {
		fields: [tBattleLog.teamCard4],
		references: [mCard.id],
		relationName: "tBattleLog_teamCard4_mCard_id"
	}),
	mCard_teamCard5: one(mCard, {
		fields: [tBattleLog.teamCard5],
		references: [mCard.id],
		relationName: "tBattleLog_teamCard5_mCard_id"
	}),
	mCard_teamCard6: one(mCard, {
		fields: [tBattleLog.teamCard6],
		references: [mCard.id],
		relationName: "tBattleLog_teamCard6_mCard_id"
	}),
	mCard_teamCard7: one(mCard, {
		fields: [tBattleLog.teamCard7],
		references: [mCard.id],
		relationName: "tBattleLog_teamCard7_mCard_id"
	}),
	mCard_teamCard8: one(mCard, {
		fields: [tBattleLog.teamCard8],
		references: [mCard.id],
		relationName: "tBattleLog_teamCard8_mCard_id"
	}),
	mSupportCard_teamSupportCard: one(mSupportCard, {
		fields: [tBattleLog.teamSupportCard],
		references: [mSupportCard.id],
		relationName: "tBattleLog_teamSupportCard_mSupportCard_id"
	}),
	mCard_opponentCard1: one(mCard, {
		fields: [tBattleLog.opponentCard1],
		references: [mCard.id],
		relationName: "tBattleLog_opponentCard1_mCard_id"
	}),
	mCard_opponentCard2: one(mCard, {
		fields: [tBattleLog.opponentCard2],
		references: [mCard.id],
		relationName: "tBattleLog_opponentCard2_mCard_id"
	}),
	mCard_opponentCard3: one(mCard, {
		fields: [tBattleLog.opponentCard3],
		references: [mCard.id],
		relationName: "tBattleLog_opponentCard3_mCard_id"
	}),
	mCard_opponentCard4: one(mCard, {
		fields: [tBattleLog.opponentCard4],
		references: [mCard.id],
		relationName: "tBattleLog_opponentCard4_mCard_id"
	}),
	mCard_opponentCard5: one(mCard, {
		fields: [tBattleLog.opponentCard5],
		references: [mCard.id],
		relationName: "tBattleLog_opponentCard5_mCard_id"
	}),
	mCard_opponentCard6: one(mCard, {
		fields: [tBattleLog.opponentCard6],
		references: [mCard.id],
		relationName: "tBattleLog_opponentCard6_mCard_id"
	}),
	mCard_opponentCard7: one(mCard, {
		fields: [tBattleLog.opponentCard7],
		references: [mCard.id],
		relationName: "tBattleLog_opponentCard7_mCard_id"
	}),
	mCard_opponentCard8: one(mCard, {
		fields: [tBattleLog.opponentCard8],
		references: [mCard.id],
		relationName: "tBattleLog_opponentCard8_mCard_id"
	}),
	mSupportCard_opponentSupportCard: one(mSupportCard, {
		fields: [tBattleLog.opponentSupportCard],
		references: [mSupportCard.id],
		relationName: "tBattleLog_opponentSupportCard_mSupportCard_id"
	}),
}));

export const mPlayerRelations = relations(mPlayer, ({many}) => ({
	tBattleLogs: many(tBattleLog),
	mPlayerStats: many(mPlayerStats),
}));

export const mCardRelations = relations(mCard, ({many}) => ({
	tBattleLogs_teamCard1: many(tBattleLog, {
		relationName: "tBattleLog_teamCard1_mCard_id"
	}),
	tBattleLogs_teamCard2: many(tBattleLog, {
		relationName: "tBattleLog_teamCard2_mCard_id"
	}),
	tBattleLogs_teamCard3: many(tBattleLog, {
		relationName: "tBattleLog_teamCard3_mCard_id"
	}),
	tBattleLogs_teamCard4: many(tBattleLog, {
		relationName: "tBattleLog_teamCard4_mCard_id"
	}),
	tBattleLogs_teamCard5: many(tBattleLog, {
		relationName: "tBattleLog_teamCard5_mCard_id"
	}),
	tBattleLogs_teamCard6: many(tBattleLog, {
		relationName: "tBattleLog_teamCard6_mCard_id"
	}),
	tBattleLogs_teamCard7: many(tBattleLog, {
		relationName: "tBattleLog_teamCard7_mCard_id"
	}),
	tBattleLogs_teamCard8: many(tBattleLog, {
		relationName: "tBattleLog_teamCard8_mCard_id"
	}),
	tBattleLogs_opponentCard1: many(tBattleLog, {
		relationName: "tBattleLog_opponentCard1_mCard_id"
	}),
	tBattleLogs_opponentCard2: many(tBattleLog, {
		relationName: "tBattleLog_opponentCard2_mCard_id"
	}),
	tBattleLogs_opponentCard3: many(tBattleLog, {
		relationName: "tBattleLog_opponentCard3_mCard_id"
	}),
	tBattleLogs_opponentCard4: many(tBattleLog, {
		relationName: "tBattleLog_opponentCard4_mCard_id"
	}),
	tBattleLogs_opponentCard5: many(tBattleLog, {
		relationName: "tBattleLog_opponentCard5_mCard_id"
	}),
	tBattleLogs_opponentCard6: many(tBattleLog, {
		relationName: "tBattleLog_opponentCard6_mCard_id"
	}),
	tBattleLogs_opponentCard7: many(tBattleLog, {
		relationName: "tBattleLog_opponentCard7_mCard_id"
	}),
	tBattleLogs_opponentCard8: many(tBattleLog, {
		relationName: "tBattleLog_opponentCard8_mCard_id"
	}),
}));

export const mSupportCardRelations = relations(mSupportCard, ({many}) => ({
	tBattleLogs_teamSupportCard: many(tBattleLog, {
		relationName: "tBattleLog_teamSupportCard_mSupportCard_id"
	}),
	tBattleLogs_opponentSupportCard: many(tBattleLog, {
		relationName: "tBattleLog_opponentSupportCard_mSupportCard_id"
	}),
}));

export const mPlayerStatsRelations = relations(mPlayerStats, ({one}) => ({
	mPlayer: one(mPlayer, {
		fields: [mPlayerStats.playerId],
		references: [mPlayer.id]
	}),
}));