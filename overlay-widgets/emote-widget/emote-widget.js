"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_interfaces_1 = require("./emotes/emote-interfaces");
const math_helper_1 = require("../../helpers/math-helper");
class EmoteWidget {
    constructor(emoteConfig, emoteFactory) {
        this.emotesToDraw = [];
        this.emoteConfig = emoteConfig;
        this.emoteFactory = emoteFactory;
    }
    getDrawableEmoteByCode(emoteCodes) {
        let drawable = [this.emoteFactory.createFireworkEmote(emoteCodes)];
        const randomAnimationType = math_helper_1.randomNumberBetween(1, 6);
        if (randomAnimationType === 2) {
            drawable = [this.emoteFactory.createRainingEmote(emoteCodes)];
        }
        else if (randomAnimationType === 3) {
            drawable = [this.emoteFactory.createWavyEmote(emoteCodes)];
        }
        else if (randomAnimationType === 4) {
            drawable = [this.emoteFactory.createParabolicEmote(emoteCodes)];
        }
        else if (randomAnimationType === 5) {
            drawable = [this.emoteFactory.createParabolicEmote(emoteCodes, true)];
        }
        else if (randomAnimationType === 6) {
            drawable = this.emoteFactory.createStarburstEffect(emoteCodes, null, math_helper_1.randomNumberBetween(5, 10));
        }
        return drawable;
    }
    addEmoteToContainer(emoteCodes) {
        let numEmotes = math_helper_1.randomNumberBetween(1, 2);
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
    addGroupedEmoteToContainer(emoteCodes) {
        let numEmotes = math_helper_1.randomNumberBetween(1, 2);
        for (let index = 0; index < numEmotes; index++) {
            const drawableEmote = this.getDrawableEmoteByCode(emoteCodes);
            drawableEmote.forEach((emote) => {
                this.addEmoteToCanvasAndDrawables(emote);
            });
        }
    }
    addEmoteToCanvasAndDrawables(drawable) {
        setTimeout(() => {
            if (drawable.htmlElement) {
                $(`.emote-container`).append(drawable.htmlElement);
            }
            this.emotesToDraw.push(drawable);
        }, math_helper_1.randomNumberBetween(100, 300));
    }
    startSimulation() {
        let dt = 0.016;
        setInterval(() => {
            this.oneLoop(dt);
        }, 1000 / 60);
    }
    oneLoop(dt) {
        let explodedEmotes = [];
        this.emotesToDraw.forEach((emote) => {
            emote.doUpdate(dt);
            emote.draw();
            emote.cleanUp();
            if (emote.isFirework && emote.opacity < 1 && !emote.isExploded) {
                emote.isExploded = true;
                const newPosition = new emote_interfaces_1.Vector2(emote.position.x, emote.position.y);
                explodedEmotes = explodedEmotes.concat(this.emoteFactory.explodeIntoEmotes(emote.emoteCodes[0], newPosition));
            }
        });
        explodedEmotes.forEach((newEmote) => {
            this.addEmoteToCanvasAndDrawables(newEmote);
        });
        this.pruneRemainingEmotes();
    }
    pruneRemainingEmotes() {
        this.emotesToDraw = this.emotesToDraw.filter((emote) => {
            return (emote === null || emote === void 0 ? void 0 : emote.lifespan) > 0;
        });
    }
}
exports.EmoteWidget = EmoteWidget;
