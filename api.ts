import { BattleLog, CardsResponse, PlayerInfo } from "./type";

// const BASE_URL = 'https://api.clashroyale.com/v1';
const BASE_URL = 'https://proxy.royaleapi.dev/v1';
const headers = {
    'Authorization': `Bearer ${process.env.CLASH_ROYALE_API_KEY}`,
    'Accept': 'application/json'
};

/**
 * Clash Royale APIへの汎用的なリクエストを送信します。
 * @param endpoint APIのエンドポイント。
 * @returns APIからのレスポンス。
 */
async function fetchApi<T>(endpoint: string): Promise<T> {
    const url = `${BASE_URL}/${endpoint}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
        throw new Error(`API call to ${endpoint} failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

/**
 * Clash Royale APIからカード情報を取得します。
 * @returns カード情報のレスポンス。
 */
export async function getCards(): Promise<CardsResponse> {
    return fetchApi<CardsResponse>('cards');
}

/**
 * 指定されたプレイヤーIDのプレイヤー情報を取得します。
 * @param id プレイヤーID。
 * @returns プレイヤー情報。
 */
export async function getPlayerInfo(id: string): Promise<PlayerInfo> {
    return fetchApi<PlayerInfo>(`players/%23${id}`);
}

/**
 * 指定されたプレイヤーIDの対戦ログを取得します。
 * @param id プレイヤーID。
 * @returns 対戦ログの配列。
 */
export async function getBattleLog(id: string): Promise<BattleLog[]> {
    return fetchApi<BattleLog[]>(`players/%23${id}/battlelog`);
}