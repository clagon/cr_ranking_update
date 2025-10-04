import { getPlayerIds } from './db';
import { updateBattleLogs, updateCardMaster, updatePlayerStats } from './model';

async function main() {

    // カードマスターを更新
    await updateCardMaster();

    // プレイヤーIDリストを取得
    const playerIds = await getPlayerIds();
    await updatePlayerStats(playerIds);

    // バトルログ更新が必要なプレイヤーIDリストを取得
    const playerIdsForBattleLog = await getPlayerIds({ forBattleLog: true });
    await updateBattleLogs(playerIdsForBattleLog);
}

main().then(() => {
    console.log('Done');
    process.exit(0);
}).catch((error) => {
    console.error('Error in main:', error);
    process.exit(1);
});