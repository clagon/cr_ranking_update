-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "t_battle_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" varchar(20) NOT NULL,
	"team_crown" integer NOT NULL,
	"team_card_1" integer NOT NULL,
	"team_card_2" integer NOT NULL,
	"team_card_3" integer NOT NULL,
	"team_card_4" integer NOT NULL,
	"team_card_5" integer NOT NULL,
	"team_card_6" integer NOT NULL,
	"team_card_7" integer NOT NULL,
	"team_card_8" integer NOT NULL,
	"team_support_card" integer NOT NULL,
	"team_rank" integer,
	"opponent_id" varchar(20) NOT NULL,
	"opponent_name" varchar(50) NOT NULL,
	"opponent_crown" integer NOT NULL,
	"opponent_card_1" integer NOT NULL,
	"opponent_card_2" integer NOT NULL,
	"opponent_card_3" integer NOT NULL,
	"opponent_card_4" integer NOT NULL,
	"opponent_card_5" integer NOT NULL,
	"opponent_card_6" integer NOT NULL,
	"opponent_card_7" integer NOT NULL,
	"opponent_card_8" integer NOT NULL,
	"opponent_support_card" integer NOT NULL,
	"opponent_rank" integer,
	"league" integer NOT NULL,
	"battle_time" timestamp NOT NULL,
	"opponent_clan_id" varchar(20),
	"opponent_clan_name" varchar(20),
	"team_clan_name" varchar(20),
	"team_clan_id" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "m_card" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"name_jp" varchar(50) NOT NULL,
	"rarity" varchar(15) NOT NULL,
	"elixir" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "m_support_card" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"name_jp" varchar(50) NOT NULL,
	"rarity" varchar(15) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "m_player_stats" (
	"player_id" varchar(20) PRIMARY KEY NOT NULL,
	"clan_id" varchar(20),
	"clan_name" varchar(100),
	"current_trophies" integer NOT NULL,
	"best_trophies" integer NOT NULL,
	"legacy_best_trophies" integer NOT NULL,
	"legacy_best_rank" integer,
	"legacy_highest_trophies" integer NOT NULL,
	"battle_count" integer NOT NULL,
	"win_count" integer NOT NULL,
	"loss_count" integer NOT NULL,
	"league_number" integer NOT NULL,
	"league_trophies" integer NOT NULL,
	"rank" integer
);
--> statement-breakpoint
CREATE TABLE "m_player" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"name_alt" varchar(50),
	"twitter" varchar(20),
	"active" boolean
);
--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."m_player"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_team_card_1_fkey" FOREIGN KEY ("team_card_1") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_team_card_2_fkey" FOREIGN KEY ("team_card_2") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_team_card_3_fkey" FOREIGN KEY ("team_card_3") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_team_card_4_fkey" FOREIGN KEY ("team_card_4") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_team_card_5_fkey" FOREIGN KEY ("team_card_5") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_team_card_6_fkey" FOREIGN KEY ("team_card_6") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_team_card_7_fkey" FOREIGN KEY ("team_card_7") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_team_card_8_fkey" FOREIGN KEY ("team_card_8") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_team_support_card_fkey" FOREIGN KEY ("team_support_card") REFERENCES "public"."m_support_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_enemy_card_1_fkey" FOREIGN KEY ("opponent_card_1") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_enemy_card_2_fkey" FOREIGN KEY ("opponent_card_2") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_enemy_card_3_fkey" FOREIGN KEY ("opponent_card_3") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_enemy_card_4_fkey" FOREIGN KEY ("opponent_card_4") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_enemy_card_5_fkey" FOREIGN KEY ("opponent_card_5") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_enemy_card_6_fkey" FOREIGN KEY ("opponent_card_6") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_enemy_card_7_fkey" FOREIGN KEY ("opponent_card_7") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_enemy_card_8_fkey" FOREIGN KEY ("opponent_card_8") REFERENCES "public"."m_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_battle_log" ADD CONSTRAINT "t_battle_log_enemy_support_card_fkey" FOREIGN KEY ("opponent_support_card") REFERENCES "public"."m_support_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "m_player_stats" ADD CONSTRAINT "m_player_stats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."m_player"("id") ON DELETE no action ON UPDATE no action;
*/