import csv from 'csv-parser';
import * as fs from 'fs';
import { getCards, getSupportCards, upsertCardsWithJP, upsertSupportCardsWithJP } from '../db';
import path from 'path';

// CSVデータの型安全のためのインターフェースを定義
interface CardTranslation {
    EN: string;
    JP: string;
}

// nameとnameJpプロパティを持つカードのジェネリック型
type TranslatableCard = {
    name: string;
    nameJp: string | null;
};

/**
 * CSVファイルを読み込み、オブジェクトの配列にパースします。
 * @param filePath CSVファイルへのパス。
 * @returns パースされたオブジェクトの配列で解決されるPromise。
 */
function parseCsv<T>(filePath: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const results: T[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

/**
 * 翻訳マップに基づいて、カードのnameJpプロパティを更新します。
 * @param cards カードまたはサポートカードの配列。
 * @param translationMap 英語名を日本語名にマッピングするマップ。
 */
function updateCardNames<T extends TranslatableCard>(cards: T[], translationMap: Map<string, string>) {
    for (const card of cards) {
        const translatedName = translationMap.get(card.name);
        if (translatedName) {
            card.nameJp = translatedName;
        }
    }
}

async function main() {
    try {
        console.log('カード翻訳の更新を開始します...');

        // 1. CSVを読み込み、翻訳マップを作成
        const filepath = path.resolve(__dirname, 'texts.csv');
        const translations = await parseCsv<CardTranslation>(filepath);
        const translationMap = new Map(translations.map(t => [t.EN, t.JP]));

        console.log(`CSVから${translationMap.size}件の翻訳を正常にパースしました。`);

        // 2. カードとサポートカードを並行して取得
        const [cards, supportCards] = await Promise.all([
            getCards(),
            getSupportCards()
        ]);

        console.log(`カード${cards.length}枚とサポートカード${supportCards.length}枚を取得しました。`);

        // 3. 日本語名を更新
        updateCardNames(cards, translationMap);
        updateCardNames(supportCards, translationMap);

        console.log('カードとサポートカードの日本語名を更新しました。');

        // 4. 更新されたカードをデータベースに並行してUpsert
        await Promise.all([
            upsertCardsWithJP(cards),
            upsertSupportCardsWithJP(supportCards)
        ]);

        console.log('データベースのカードとサポートカードの更新に成功しました。');

    } catch (error) {
        console.error('更新処理中にエラーが発生しました:', error);
        process.exit(1); // エラーコードで終了
    } finally {
        console.log('カード翻訳の更新処理が完了しました。');
        process.exit(0);
    }
}

main();