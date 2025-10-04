import csv from "csv-parser";
import * as fs from "fs";
import { getCards, getSupportCards, upsertCards, upsertSupportCards } from "../db";
import path from "path";

const results: any = [];
const filepath = path.resolve(__dirname);

fs.createReadStream(`${filepath}/texts.csv`)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results.map((r: any) => ({ [r.EN]: r.JP })));
    });

Promise.all(
    [
        getCards()
            .then(cards => {
                cards.forEach(card => {
                    if (results.find((r: any) => r.EN === card.name)) {
                        card.nameJp = results.find((r: any) => r.EN === card.name).JP;
                    }
                })

                return upsertCards(cards)
            })
            .then(() => {
                console.log('Done updating cards');
            }),
        getSupportCards()
            .then(cards => {
                cards.forEach(card => {
                    if (results.find((r: any) => r.EN === card.name)) {
                        card.nameJp = results.find((r: any) => r.EN === card.name).JP;
                    }
                })

                return upsertSupportCards(cards)
            })
            .then(() => {
                console.log('Done updating support cards');
            })
    ])
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        process.exit(0);
    });
