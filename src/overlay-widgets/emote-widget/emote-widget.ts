import { EmoteWidgetConfig } from './emote-widget-config';
import { RenderableObject, Vector2 } from './emotes/emote-interfaces';
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

    private getDrawableEmoteByCode(emoteCodes: string[]): RenderableObject[] {
        let drawable: RenderableObject[] = [this.emoteFactory.createFireworkEmote(emoteCodes, this.getViewWidth(), this.getViewHeight())];
        const randomAnimationType = randomNumberBetween(1, 6);
        if (randomAnimationType === 2) {
            drawable = [this.emoteFactory.createRainingEmote(emoteCodes, this.getViewWidth())];
        } else if (randomAnimationType === 3) {
            drawable = [this.emoteFactory.createWavyEmote(emoteCodes, this.getViewWidth(), this.getViewHeight())];
        } else if (randomAnimationType === 4) {
            drawable = [this.emoteFactory.createParabolicEmote(emoteCodes, this.getViewWidth(), this.getViewHeight())];
        } else if (randomAnimationType === 5) {
            drawable = [this.emoteFactory.createParabolicEmote(emoteCodes, this.getViewWidth(), this.getViewHeight(), true)];
        } else if (randomAnimationType === 6) {
            drawable = this.emoteFactory.createStarburstEffect(emoteCodes, this.getViewWidth(), this.getViewHeight(), null, randomNumberBetween(5, 10));
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
                drawableEmote.forEach((emote) => {
                    this.addEmoteToCanvasAndDrawables(emote);
                });
            });
        }
    }

    public addGroupedEmoteToContainer(emoteCodes: string[]) {
        let numEmotes = randomNumberBetween(1, 2);
        for (let index = 0; index < numEmotes; index++) {
            const drawableEmote = this.getDrawableEmoteByCode(emoteCodes);
            drawableEmote.forEach((emote) => {
                this.addEmoteToCanvasAndDrawables(emote);
            });
        }
    }

    addEmoteToCanvasAndDrawables(drawable: RenderableObject) {
        setTimeout(() => {
            if (drawable.htmlElement) {
                $(`.emote-container`).append(drawable.htmlElement);
            }
            this.emotesToDraw.push(drawable);
        }, randomNumberBetween(100, 300));
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
        let explodedEmotes: any[] = [];
        this.emotesToDraw.forEach((emote) => {
            emote.doUpdate(dt);
            emote.draw();
            emote.cleanUp();

            if (emote.isFirework && emote.opacity < 1 && !emote.isExploded) {
                emote.isExploded = true;
                const newPosition = new Vector2(emote.position.x, emote.position.y);
                explodedEmotes = explodedEmotes.concat(this.emoteFactory.explodeIntoEmotes(emote.emoteCodes[0], newPosition));
            }
        });
        explodedEmotes.forEach((newEmote) => {
            this.addEmoteToCanvasAndDrawables(newEmote);
        });

        this.pruneRemainingEmotes();
    }

    pruneRemainingEmotes() {
        this.emotesToDraw = this.emotesToDraw.filter((emote: any) => {
            return emote?.lifespan > 0;
        });
    }

}
