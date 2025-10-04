import { BattleLog, CardsResponse, PlayerInfo } from "./type";

// const BASE_URL = 'https://api.clashroyale.com/v1';
const BASE_URL = 'https://proxy.royaleapi.dev/v1';
const headers = {
    'Authorization': `Bearer ${process.env.CLASH_ROYALE_API_KEY}`,
    'Accept': 'application/json'
};

export async function getCards(): Promise<CardsResponse> {
    const URL = `${BASE_URL}/cards?lang=ja-JP`;
    const res = await fetch(URL, { headers });
    if (!res.ok) {
        throw new Error(`Failed to fetch cards: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
getCards().then(res => console.log(res));

export async function getPlayerInfo(id: string): Promise<PlayerInfo> {
    const URL = `${BASE_URL}/players/%23${id}`;

    const res = await fetch(URL, { headers });
    if (!res.ok) {
        throw new Error(`Failed to fetch player info: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export async function getBattleLog(id: string): Promise<BattleLog[]> {
    const URL = `${BASE_URL}/players/%23${id}/battlelog`;

    const res = await fetch(URL, { headers });
    if (!res.ok) {
        throw new Error(`Failed to fetch battle log: ${res.status} ${res.statusText}`);
    }
    return res.json();
}