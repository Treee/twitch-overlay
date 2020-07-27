import { EmoteWidgetConfig } from './emote-widget-config';
import { RenderableObject } from './emotes/emote-interfaces';
import { randomNumberBetween } from '../../helpers/math-helper';

import { EmoteFactory } from './emotes/emote-factory';

export class EmoteWidget {
    emoteFactory: EmoteFactory;
    emoteConfig: EmoteWidgetConfig;
    emotesToDraw: RenderableObject[] = [];

    constructor(emoteConfig: EmoteWidgetConfig, emoteFactory: EmoteFactory) {
        this.emoteConfig = emoteConfig;
        this.emoteFactory = emoteFactory;
    }

    private getDrawableEmoteByCode(emoteCodes: string[]): RenderableObject {
        let drawable: RenderableObject = this.emoteFactory.createFireworkEmote(emoteCodes, this.getViewWidth(), this.getViewHeight());
        const randomAnimationType = randomNumberBetween(1, 5);
        if (randomAnimationType === 2) {
            drawable = this.emoteFactory.createWavyEmote(emoteCodes, this.getViewWidth(), this.getViewHeight());
        } if (randomAnimationType === 3) {
            drawable = this.emoteFactory.createFireworkEmote(emoteCodes, this.getViewWidth(), this.getViewHeight());
        } if (randomAnimationType === 4) {
            drawable = this.emoteFactory.createParabolicEmote(emoteCodes, this.getViewWidth(), this.getViewHeight());
        } if (randomAnimationType === 5) {
            drawable = this.emoteFactory.createParabolicEmote(emoteCodes, this.getViewWidth(), this.getViewHeight(), true);
        }
        return drawable;
    }

    public addEmoteToContainer(emoteCodes: string[]) {
        let numEmotes = randomNumberBetween(1, 2);
        for (let index = 0; index < numEmotes; index++) {
            emoteCodes.forEach((emote) => {
                if (emote === '') {
                    emote = this.emoteFactory.getRandomEmote().code;
                }
                const drawableEmote = this.getDrawableEmoteByCode([emote]);
                this.addEmoteToCanvasAndDrawables(drawableEmote);
            });
        }
    }

    public addGroupedEmoteToContainer(emoteCodes: string[]) {
        let numEmotes = randomNumberBetween(1, 2);
        for (let index = 0; index < numEmotes; index++) {
            const drawableEmote = this.getDrawableEmoteByCode(emoteCodes);
            this.addEmoteToCanvasAndDrawables(drawableEmote);
        }
    }

    addEmoteToCanvasAndDrawables(drawable: RenderableObject) {
        if (drawable?.htmlElement) {
            setTimeout(() => {
                if (drawable.htmlElement) {
                    $(`.emote-container`).append(drawable.htmlElement);
                }
            }, randomNumberBetween(100, 500));
        }
        this.emotesToDraw.push(drawable);
    }

    private getViewHeight() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }

    private getViewWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    startSimulation() {
        let dt = 0.016;
        setInterval(() => {
            this.oneLoop(dt);
        }, 1000 / 60);
    }

    oneLoop(dt: number) {
        this.emotesToDraw.forEach((emote) => {
            emote.doUpdate(dt);
            emote.draw();
        });
        this.checkForExplodedEmotes();
        this.pruneRemainingEmotes();
    }

    pruneRemainingEmotes() {
        this.emotesToDraw = this.emotesToDraw.filter((emote: any) => {
            if (emote?.lifespan < 0) {
                emote.htmlElement.remove();
            }
            return emote?.lifespan > 0;
        });

    }

    checkForExplodedEmotes() {
        const explodedEmotes = this.emoteFactory.checkForExplodedEmotes(this.emotesToDraw);
        if (explodedEmotes.length > 0) {
            explodedEmotes.forEach((emote) => {
                this.addEmoteToCanvasAndDrawables(emote);
            });
        }
    }

}