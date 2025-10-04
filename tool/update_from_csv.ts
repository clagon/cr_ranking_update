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

getCards()
    .then(cards => {
        cards.forEach(card => {
            if (results.find((r: any) => r.EN === card.name)) {
                card.nameJp = results.find((r: any) => r.EN === card.name).JP;
            }
        })

        upsertCards(cards);
    }).catch(err => {
        console.error(err);
    });

getSupportCards()
    .then(cards => {
        cards.forEach(card => {
            if (results.find((r: any) => r.EN === card.name)) {
                card.nameJp = results.find((r: any) => r.EN === card.name).JP;
            }
        })

        upsertSupportCards(cards);
    }).catch(err => {
        console.error(err);
    });

process.exit(0);
