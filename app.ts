import { getPlayerIds, getPlayerIdsForBattleLog } from './db';
import { updateBattleLogs, updateCardMaster, updatePlayerStats } from './model';

async function main() {

    // カードマスター更新
    await updateCardMaster();

    // プレイヤーID一覧を取得
    const playerIds = await getPlayerIds();
    await updatePlayerStats(playerIds);

    // バトルログ更新が必要なプレイヤーID一覧を取得
    const playerIdsForBattleLog = await getPlayerIdsForBattleLog();
    await updateBattleLogs(playerIdsForBattleLog);
}

main().then(() => {
    console.log('Done');
    process.exit(0);
}).catch((error) => {
    console.error('Error in main:', error);
    process.exit(1);
});