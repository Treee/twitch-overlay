import { Emote, TwitchEmote } from "./emote";
import { FireworkEmote } from "./firework-emote";
import { RainingEmote } from "./raining-emote";
import { WavyEmote } from "./wavy-emote";
import { ParabolicEmote } from "./parabolic-emote";

import { Vector2, RenderableObject } from "./emote-interfaces";
import { randomNumberBetween, randomNumberBetweenDecimals, RADIANS, randomRadianAngle } from '../../../helpers/math-helper';

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

    private setUrl(emoteType: string, id: string, scale: number, channelPointModifier: string = ''): string {
        let url = '';
        if (emoteType === 'bttv') {
            url = `https://cdn.betterttv.net/emote/${id}/${scale}x`;
        } else if (emoteType === 'twitch') {
            url = `https://static-cdn.jtvnw.net/emoticons/v1/${id}${channelPointModifier}/${scale}.0`;
        }
        return url;
    }

    private setUrlsandSize(emoteCodes: string[]): { urls: string[], size: Vector2 } {
        const scalar = randomNumberBetween(1, 3);
        let size = new Vector2(28, 28); //default values
        const urls: string[] = [];
        emoteCodes.forEach((emoteCode) => {
            const emote = this.getEmoteByCode(emoteCode);
            emote.scale = scalar;
            emote.url = this.setUrl(emote.type, emote.id, emote.scale, emote.channelPointModifier);
            urls.push(emote.url);
            size = this.convertScaleToPixels(emote.scale);
        });
        return { urls, size };
    }

    public getRandomEmote(): Emote {
        const randomIndex = randomNumberBetween(0, this.masterEmoteList.length - 1);
        if (this.masterEmoteList.length < 1) {
            throw new Error('No Emotes in the master list.');
        }
        return this.getEmoteByCode(this.masterEmoteList[randomIndex].code);
    }

    private convertScaleToPixels(emoteScale: number): Vector2 {
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

    createRainingEmote(emoteCodes: string[], canvasWidth: number): RenderableObject {
        const urlsAndSize = this.setUrlsandSize(emoteCodes);
        const newRenderable = new RainingEmote(urlsAndSize.urls, urlsAndSize.size);
        const renderableProperties = {
            emoteCodes,
            isMovable: true,
            position: new Vector2(randomNumberBetween(0, canvasWidth), 0),
            velocity: new Vector2(0, randomNumberBetween(1, 5)),
            isRotateable: true,
            degreesRotation: 0,
            angularVelocityDegrees: randomNumberBetween(1, 4),
            isAcceleratable: false,
            acceleration: new Vector2(),
            isHideable: true,
            opacity: 1,
            lifespan: randomNumberBetween(1, 6),
            isBouncy: false,
            isFirework: false,
        };
        newRenderable.initializeRenderable(renderableProperties);
        return newRenderable;
    }

    createWavyEmote(emoteCodes: string[], canvasWidth: number, canvasHeight: number): RenderableObject {
        const urlsAndSize = this.setUrlsandSize(emoteCodes);
        const randomVelocity = new Vector2(randomNumberBetween(1, 5), randomNumberBetween(1, 5));
        const randomPosition = new Vector2(0, randomNumberBetween(0, canvasHeight - urlsAndSize.size.y));

        const max = 2;
        const toggle = randomNumberBetween(1, max); //left
        if (toggle % max === 1) { // right
            randomPosition.x = canvasWidth;
            randomVelocity.x *= -1;
        }

        const newRenderable = new WavyEmote(urlsAndSize.urls, urlsAndSize.size);
        const renderableProperties = {
            emoteCodes,
            isMovable: true,
            position: randomPosition,
            velocity: randomVelocity,
            isRotateable: true,
            degreesRotation: 0,
            angularVelocityDegrees: randomNumberBetween(1, 4),
            isAcceleratable: false,
            acceleration: new Vector2(),
            isHideable: true,
            opacity: 1,
            lifespan: randomNumberBetween(3, 9),
            isBouncy: false,
            isFirework: false,
        };
        newRenderable.initializeRenderable(renderableProperties);
        return newRenderable;
    }

    createParabolicEmote(emoteCodes: string[], canvasWidth: number, canvasHeight: number, isBouncy: boolean = false): RenderableObject {
        const urlsAndSize = this.setUrlsandSize(emoteCodes);
        const xVelocityDirection = randomNumberBetween(1, 10) % 2 === 0 ? 1 : -1;

        const randomVelocity = new Vector2(randomNumberBetweenDecimals(0.3, 6.6) * xVelocityDirection, randomNumberBetweenDecimals(4.6, 8.2) * -1);
        let randomLifespan = randomNumberBetween(6, 7);
        if (isBouncy) {
            randomLifespan = randomLifespan * 2;
        }

        const newRenderable = new ParabolicEmote(urlsAndSize.urls, urlsAndSize.size);
        const renderableProperties = {
            emoteCodes,
            isMovable: true,
            position: new Vector2(canvasWidth / 2, canvasHeight),
            velocity: randomVelocity,
            isRotateable: true,
            degreesRotation: 0,
            angularVelocityDegrees: randomNumberBetween(1, 2),
            isAcceleratable: true,
            acceleration: new Vector2(),
            isHideable: true,
            opacity: 1,
            lifespan: randomLifespan,
            canvasHeight,
            canvasWidth,
            isBouncy,
            isFirework: false,
        };
        newRenderable.initializeRenderable(renderableProperties);
        return newRenderable;
    }

    createFireworkEmote(emoteCodes: string[], canvasWidth: number, canvasHeight: number): RenderableObject {
        const urlsAndSize = this.setUrlsandSize(emoteCodes);
        const randomPosition = new Vector2(randomNumberBetween(0, canvasWidth), canvasHeight);

        const xVelocityDirection = randomPosition.x < canvasWidth / 2 ? 1 : -1;

        const randomVelocity = new Vector2(randomNumberBetweenDecimals(0.3, 2.7) * xVelocityDirection, randomNumberBetweenDecimals(4.6, 8.2) * -1);

        const newRenderable = new FireworkEmote(urlsAndSize.urls, urlsAndSize.size);
        const renderableProperties = {
            emoteCodes,
            isMovable: true,
            position: randomPosition,
            velocity: randomVelocity,
            isRotateable: true,
            degreesRotation: 0,
            angularVelocityDegrees: randomNumberBetween(1, 2),
            isAcceleratable: true,
            acceleration: new Vector2(),
            isHideable: true,
            opacity: 1,
            lifespan: 500,
            canvasHeight,
            isFirework: true,
        };
        newRenderable.initializeRenderable(renderableProperties);
        return newRenderable;
    }

    createStarburstChildEmote(emoteCodes: string[], position: Vector2, velocity: Vector2): RenderableObject {
        const urlsAndSize = this.setUrlsandSize(emoteCodes);
        const newRenderable = new RainingEmote(urlsAndSize.urls, urlsAndSize.size);
        const renderableProperties = {
            emoteCodes,
            isMovable: true,
            position: position,
            velocity: velocity,
            isRotateable: true,
            degreesRotation: 0,
            angularVelocityDegrees: randomNumberBetween(1, 4),
            isAcceleratable: false,
            acceleration: new Vector2(),
            isHideable: true,
            opacity: 1,
            lifespan: randomNumberBetween(1, 6),
            isBouncy: false,
            isFirework: false,
        };
        newRenderable.initializeRenderable(renderableProperties);
        return newRenderable;
    }

    checkForExplodedEmotes(activeEmotes: RenderableObject[], canvasWidth: number) {
        let explodedEmotes: RainingEmote[] = [];
        activeEmotes.forEach((emote: any) => {
            if (emote instanceof FireworkEmote && emote.opacity < 1 && !emote.isExploded) {
                explodedEmotes = explodedEmotes.concat(this.explodeIntoEmotes(emote.emoteCodes[0], emote.position, canvasWidth));
                emote.isExploded = true;
            }
        });
        return explodedEmotes;
    }

    explodeIntoEmotes(emoteCode: string, position: Vector2, canvasWidth: number) {
        const randomNumberOfEmoteParticles = randomNumberBetween(5, 12);
        const emotesToReturn = [];
        for (let numEmotes = 0; numEmotes < randomNumberOfEmoteParticles; numEmotes++) {
            const theta = randomRadianAngle(); // some random number between 0 and 2pi
            const fireworkEmote = this.createStarburstChildEmote([emoteCode], position, new Vector2(Math.cos(theta), Math.sin(theta)));
            emotesToReturn.push(fireworkEmote);
        }
        return emotesToReturn;
    }

}