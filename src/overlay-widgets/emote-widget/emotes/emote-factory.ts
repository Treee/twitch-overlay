import { Emote, TwitchEmote } from "./emote";
import { FireworkEmote } from "./firework-emote";
import { RainingEmote } from "./raining-emote";
import { WavyEmote } from "./wavy-emote";
import { ParabolicEmote } from "./parabolic-emote";

import { Vector2, RenderableObject } from "./emote-interfaces";
import { randomNumberBetween, randomNumberBetweenDecimals } from '../../../helpers/math-helper';

export class EmoteFactory {

    masterEmoteList: Emote[] = [];

    constructor() { }

    public setMasterEmoteList(newEmotes: Emote[]) {
        this.masterEmoteList = newEmotes;
    }

    public getEmoteCodes(): string[] {
        return this.masterEmoteList.map((emote) => {
            return emote.code;
        });
    }

    public getEmoteByCode(emoteCode: string): Emote {
        let splitCode = emoteCode.split('_');
        // special case for the below emoji
        if (emoteCode === `[oO](_|\\.)[oO]`) {
            splitCode = [];
        }
        if (splitCode.length === 2) {
            emoteCode = splitCode[0];
        }

        const foundEmote = this.masterEmoteList.find((emote) => {
            return emote.code.toLowerCase() === emoteCode.toLowerCase();
        });

        if (foundEmote) {
            if (splitCode.length === 2) {
                (foundEmote as TwitchEmote).channelPointModifier = `_${splitCode[1]}`;
            } else {
                (foundEmote as TwitchEmote).channelPointModifier = '';
            }
        }

        if (!foundEmote) {
            throw new Error(`No emote found for code: ${emoteCode}.`);
        }
        foundEmote.scale = randomNumberBetween(1, 3);
        foundEmote.url = this.setUrl(foundEmote.type, foundEmote.id, foundEmote.scale, foundEmote.channelPointModifier);
        return foundEmote;
    }

    setUrl(emoteType: string, id: string, scale: number, channelPointModifier: string = ''): string {
        let url = '';
        if (emoteType === 'bttv') {
            url = `https://cdn.betterttv.net/emote/${id}/${scale}x`;
        } else if (emoteType === 'twitch') {
            url = `https://static-cdn.jtvnw.net/emoticons/v1/${id}${channelPointModifier}/${scale}.0`;
        }
        return url;
    }
    convertScaleToPixels(emoteScale: number): Vector2 {
        let emoteWidth = 0, emoteHeight = 0;
        if (emoteScale === 1) {
            emoteWidth = 28;
            emoteHeight = 28;
        }
        else if (emoteScale === 2) {
            emoteWidth = 56;
            emoteHeight = 56;
        }
        else if (emoteScale === 3) {
            emoteWidth = 112;
            emoteHeight = 112;
        }
        return new Vector2(emoteWidth, emoteHeight);
    }

    public getRandomEmote(): Emote {
        const randomIndex = randomNumberBetween(0, this.masterEmoteList.length - 1);
        if (this.masterEmoteList.length < 1) {
            throw new Error('No Emotes in the master list.');
        }
        return this.getEmoteByCode(this.masterEmoteList[randomIndex].code);
    }

    createParabolicEmote(emoteCodes: string[], canvasWidth: number, canvaseHeight: number, isBouncy: boolean = false): ParabolicEmote {
        const scalar = randomNumberBetween(1, 3);
        const emoteUrls: string[] = [];
        let emoteSize = new Vector2(28, 28); //default values
        emoteCodes.forEach((emoteCode) => {
            const emote = this.getEmoteByCode(emoteCode);
            emote.scale = scalar;
            emote.url = this.setUrl(emote.type, emote.id, emote.scale, emote.channelPointModifier);
            emoteUrls.push(emote.url);
            emoteSize = this.convertScaleToPixels(emote.scale);
        });

        const randomPosition = new Vector2(canvasWidth / 2, canvaseHeight);

        const xVelocityDirection = randomNumberBetween(1, 10) % 2 === 0 ? 1 : -1;

        const randomVelocity = new Vector2(randomNumberBetweenDecimals(0.3, 1.7) * xVelocityDirection, randomNumberBetweenDecimals(2.2, 6.5) * -1);
        let randomLifespan = randomNumberBetween(6, 7);
        if (isBouncy) {
            randomLifespan = randomLifespan * 2;
        }
        const randomAngularVelocity = randomNumberBetween(1, 2);

        const parabolicEmote = new ParabolicEmote(randomPosition, randomVelocity, randomLifespan, emoteSize, emoteUrls, randomAngularVelocity);
        parabolicEmote.isBouncy = isBouncy;
        parabolicEmote.canvasHeight = canvaseHeight;
        parabolicEmote.code = emoteCodes[0];
        return parabolicEmote;
    }

    createFireworkEmote(emoteCodes: string[], canvasWidth: number, canvaseHeight: number): FireworkEmote {
        const scalar = randomNumberBetween(1, 3);
        const emoteUrls: string[] = [];
        let emoteSize = new Vector2(28, 28); //default values
        emoteCodes.forEach((emoteCode) => {
            const emote = this.getEmoteByCode(emoteCode);
            emote.scale = scalar;
            emote.url = this.setUrl(emote.type, emote.id, emote.scale, emote.channelPointModifier);
            emoteUrls.push(emote.url);
            emoteSize = this.convertScaleToPixels(emote.scale);
        });

        const randomPosition = new Vector2(randomNumberBetween(0, canvasWidth), canvaseHeight);

        const xVelocityDirection = randomPosition.x < canvasWidth / 2 ? 1 : -1;

        const randomVelocity = new Vector2(randomNumberBetween(1, 2) * xVelocityDirection, randomNumberBetween(2, 4.5) * -1);
        const randomLifespan = randomNumberBetween(3, 4.2);
        const randomAngularVelocity = randomNumberBetween(1, 2);

        const fireworkEmote = new FireworkEmote(randomPosition, randomVelocity, randomLifespan, emoteSize, emoteUrls, randomAngularVelocity);
        fireworkEmote.code = emoteCodes[0];
        return fireworkEmote;
    }

    createRainingEmote(emoteCodes: string[], canvasWidth: number): RainingEmote {
        const scalar = randomNumberBetween(1, 3)
        const emoteUrls: string[] = [];
        let emoteSize = new Vector2(28, 28); //default values
        emoteCodes.forEach((emoteCode) => {
            const emote = this.getEmoteByCode(emoteCode);
            emote.scale = scalar;
            emote.url = this.setUrl(emote.type, emote.id, emote.scale, emote.channelPointModifier);
            emoteUrls.push(emote.url);
            emoteSize = this.convertScaleToPixels(emote.scale);
        });

        const randomPosition = new Vector2(randomNumberBetween(0, canvasWidth), 0);
        const randomVelocity = new Vector2(0, randomNumberBetween(1, 5));
        const randomLifespan = randomNumberBetween(1, 6);
        const randomAngularVelocity = randomNumberBetween(1, 4);

        return new RainingEmote(randomPosition, randomVelocity, randomLifespan, emoteSize, emoteUrls, randomAngularVelocity);
    }

    createWavyEmote(emoteCodes: string[], canvasWidth: number, canvasHeight: number): RainingEmote {
        const scalar = randomNumberBetween(1, 3)
        const emoteUrls: string[] = [];
        let emoteSize = new Vector2(28, 28); //default values
        emoteCodes.forEach((emoteCode) => {
            const emote = this.getEmoteByCode(emoteCode);
            emote.scale = scalar;
            emote.url = this.setUrl(emote.type, emote.id, emote.scale, emote.channelPointModifier);
            emoteUrls.push(emote.url);
            emoteSize = this.convertScaleToPixels(emote.scale);
        });

        const randomVelocity = new Vector2(randomNumberBetween(1, 5), randomNumberBetween(1, 5));
        const randomLifespan = randomNumberBetween(3, 9);
        const randomAngularVelocity = randomNumberBetween(1, 4);

        const randomPosition = new Vector2(0, randomNumberBetween(0, canvasHeight - emoteSize.y));

        const max = 2;
        const toggle = randomNumberBetween(1, max); //left
        if (toggle % max === 1) { // right
            randomPosition.x = canvasWidth;
            randomVelocity.x *= -1;
        }
        // else if (toggle % max === 2) { // top
        //     randomPosition.x = randomNumberBetween(0, this.getViewWidth());
        //     randomPosition.y = 0;
        // } else if (toggle % max === 3) {// bot
        //     randomPosition.x = randomNumberBetween(0, this.getViewWidth());
        //     randomPosition.y = this.getViewHeight();
        //     randomVelocity.y *= -1;
        // }

        return new WavyEmote(randomPosition, randomVelocity, randomLifespan, emoteSize, emoteUrls, randomAngularVelocity);
    }

    checkForExplodedEmotes(activeEmotes: RenderableObject[]) {
        let explodedEmotes: RainingEmote[] = [];
        activeEmotes.forEach((emote: any) => {
            if (emote instanceof FireworkEmote && emote.opacity < 1 && !emote.isExploded) {
                explodedEmotes = explodedEmotes.concat(this.explodeIntoEmotes(emote.code, emote.position));
                emote.isExploded = true;
            }
        });
        return explodedEmotes;
    }

    explodeIntoEmotes(emoteCode: string, position: Vector2) {
        const twoPi = Math.PI * 2;
        const radians = twoPi / 360;
        const emote = this.getEmoteByCode(emoteCode);

        const randomNumberOfEmoteParticles = randomNumberBetween(5, 12);
        const emotesToReturn = [];
        for (let numEmotes = 0; numEmotes < randomNumberOfEmoteParticles; numEmotes++) {
            const randomLifespan = randomNumberBetween(1, 2);
            const randomAngularVelocity = randomNumberBetween(-4, 4);
            emote.scale = randomNumberBetween(1, 2);
            emote.url = this.setUrl(emote.type, emote.id, emote.scale, emote.channelPointModifier);
            const emoteSize = this.convertScaleToPixels(emote.scale);
            const randomDegrees = randomNumberBetween(0, 360);
            const theta = randomDegrees * radians; // some random number between 0 and 2pi
            const randomVelocity = new Vector2(Math.cos(theta), Math.sin(theta));

            const fireworkEmote = new RainingEmote(position, randomVelocity, randomLifespan, emoteSize, [emote.url], randomAngularVelocity);
            emotesToReturn.push(fireworkEmote);
        }
        return emotesToReturn;
    }

}