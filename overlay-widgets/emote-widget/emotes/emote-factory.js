"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firework_emote_1 = require("./firework-emote");
const raining_emote_1 = require("./raining-emote");
const wavy_emote_1 = require("./wavy-emote");
const parabolic_emote_1 = require("./parabolic-emote");
const emote_interfaces_1 = require("./emote-interfaces");
const math_helper_1 = require("../../../helpers/math-helper");
const html_document_helper_1 = require("../../../helpers/html-document-helper");
class EmoteFactory {
    constructor() {
        this.masterEmoteList = [];
    }
    setMasterEmoteList(newEmotes) {
        this.masterEmoteList = newEmotes;
    }
    getEmoteCodes() {
        return this.masterEmoteList.map((emote) => {
            return emote.code;
        });
    }
    getEmoteByCode(emoteCode) {
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
                foundEmote.channelPointModifier = `_${splitCode[1]}`;
            }
            else {
                foundEmote.channelPointModifier = '';
            }
        }
        if (!foundEmote) {
            throw new Error(`No emote found for code: ${emoteCode}.`);
        }
        foundEmote.scale = math_helper_1.randomNumberBetween(1, 3);
        foundEmote.url = this.setUrl(foundEmote.type, foundEmote.id, foundEmote.scale, foundEmote.channelPointModifier);
        return foundEmote;
    }
    setUrl(emoteType, id, scale, channelPointModifier = '') {
        let url = '';
        if (emoteType === 'bttv') {
            url = `https://cdn.betterttv.net/emote/${id}/${scale}x`;
        }
        else if (emoteType === 'twitch') {
            url = `https://static-cdn.jtvnw.net/emoticons/v1/${id}${channelPointModifier}/${scale}.0`;
        }
        return url;
    }
    setUrlsandSize(emoteCodes, maxScale = 3) {
        const scalar = math_helper_1.randomNumberBetween(1, maxScale);
        let size = new emote_interfaces_1.Vector2(28, 28); //default values
        const urls = [];
        emoteCodes.forEach((emoteCode) => {
            const emote = this.getEmoteByCode(emoteCode);
            emote.scale = scalar;
            emote.url = this.setUrl(emote.type, emote.id, emote.scale, emote.channelPointModifier);
            urls.push(emote.url);
            size = this.convertScaleToPixels(emote.scale);
        });
        return { urls, size };
    }
    getRandomEmote() {
        const randomIndex = math_helper_1.randomNumberBetween(0, this.masterEmoteList.length - 1);
        if (this.masterEmoteList.length < 1) {
            throw new Error('No Emotes in the master list.');
        }
        return this.getEmoteByCode(this.masterEmoteList[randomIndex].code);
    }
    convertScaleToPixels(emoteScale) {
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
        return new emote_interfaces_1.Vector2(emoteWidth, emoteHeight);
    }
    createRainingEmote(emoteCodes) {
        const urlsAndSize = this.setUrlsandSize(emoteCodes);
        const newRenderable = new raining_emote_1.RainingEmote(urlsAndSize.urls, urlsAndSize.size);
        const renderableProperties = {
            emoteCodes,
            isMovable: true,
            position: new emote_interfaces_1.Vector2(math_helper_1.randomNumberBetween(0, html_document_helper_1.getViewWidth()), 0),
            velocity: new emote_interfaces_1.Vector2(0, math_helper_1.randomNumberBetween(1, 5)),
            isRotateable: true,
            degreesRotation: 0,
            angularVelocityDegrees: math_helper_1.randomNumberBetween(1, 4),
            isAcceleratable: false,
            acceleration: new emote_interfaces_1.Vector2(),
            isHideable: true,
            opacity: 1,
            lifespan: math_helper_1.randomNumberBetween(1, 6),
            isBouncy: false,
            isFirework: false,
        };
        newRenderable.initializeRenderable(renderableProperties);
        return newRenderable;
    }
    createWavyEmote(emoteCodes) {
        const urlsAndSize = this.setUrlsandSize(emoteCodes);
        const randomVelocity = new emote_interfaces_1.Vector2(math_helper_1.randomNumberBetween(3, 5), math_helper_1.randomNumberBetween(3, 5));
        const randomPosition = new emote_interfaces_1.Vector2(0, math_helper_1.randomNumberBetween(0, html_document_helper_1.getViewHeight() / 2 + html_document_helper_1.getViewHeight() / 4));
        const max = 2;
        const toggle = math_helper_1.randomNumberBetween(1, max); //left
        if (toggle % max === 1) { // right
            randomPosition.x = html_document_helper_1.getViewWidth();
            randomVelocity.x *= -1;
        }
        const newRenderable = new wavy_emote_1.WavyEmote(urlsAndSize.urls, urlsAndSize.size);
        const renderableProperties = {
            emoteCodes,
            isMovable: true,
            position: randomPosition,
            velocity: randomVelocity,
            isRotateable: true,
            degreesRotation: 0,
            angularVelocityDegrees: math_helper_1.randomNumberBetween(1, 4),
            isAcceleratable: false,
            acceleration: new emote_interfaces_1.Vector2(),
            isHideable: true,
            opacity: 1,
            lifespan: math_helper_1.randomNumberBetween(3, 9),
            isBouncy: false,
            isFirework: false,
        };
        newRenderable.initializeRenderable(renderableProperties);
        return newRenderable;
    }
    createParabolicEmote(emoteCodes, isBouncy = false) {
        const urlsAndSize = this.setUrlsandSize(emoteCodes);
        const xVelocityDirection = math_helper_1.randomNumberBetween(1, 10) % 2 === 0 ? 1 : -1;
        const randomVelocity = new emote_interfaces_1.Vector2(math_helper_1.randomNumberBetweenDecimals(0.3, 6.6) * xVelocityDirection, math_helper_1.randomNumberBetweenDecimals(4.6, 8.2) * -1);
        let randomLifespan = math_helper_1.randomNumberBetween(6, 7);
        if (isBouncy) {
            randomLifespan = randomLifespan * 2;
        }
        const newRenderable = new parabolic_emote_1.ParabolicEmote(urlsAndSize.urls, urlsAndSize.size);
        const renderableProperties = {
            emoteCodes,
            isMovable: true,
            position: new emote_interfaces_1.Vector2(html_document_helper_1.getViewWidth() / 2, html_document_helper_1.getViewHeight()),
            velocity: randomVelocity,
            isRotateable: true,
            degreesRotation: 0,
            angularVelocityDegrees: math_helper_1.randomNumberBetween(1, 2),
            isAcceleratable: true,
            acceleration: new emote_interfaces_1.Vector2(),
            isHideable: true,
            opacity: 1,
            lifespan: randomLifespan,
            canvasHeight: html_document_helper_1.getViewHeight(),
            canvasWidth: html_document_helper_1.getViewWidth(),
            isBouncy,
            isFirework: false,
        };
        newRenderable.initializeRenderable(renderableProperties);
        return newRenderable;
    }
    createFireworkEmote(emoteCodes) {
        const urlsAndSize = this.setUrlsandSize(emoteCodes);
        const randomPosition = new emote_interfaces_1.Vector2(math_helper_1.randomNumberBetween(0, html_document_helper_1.getViewWidth()), html_document_helper_1.getViewHeight());
        const xVelocityDirection = randomPosition.x < html_document_helper_1.getViewWidth() / 2 ? 1 : -1;
        const randomVelocity = new emote_interfaces_1.Vector2(math_helper_1.randomNumberBetweenDecimals(0.3, 2.7) * xVelocityDirection, math_helper_1.randomNumberBetweenDecimals(4.6, 8.2) * -1);
        const newRenderable = new firework_emote_1.FireworkEmote(urlsAndSize.urls, urlsAndSize.size);
        const renderableProperties = {
            emoteCodes,
            isMovable: true,
            position: randomPosition,
            velocity: randomVelocity,
            isRotateable: true,
            degreesRotation: 0,
            angularVelocityDegrees: math_helper_1.randomNumberBetween(1, 2),
            isAcceleratable: true,
            acceleration: new emote_interfaces_1.Vector2(),
            isHideable: true,
            opacity: 1,
            lifespan: 500,
            canvasHeight: html_document_helper_1.getViewHeight(),
            isFirework: true,
        };
        newRenderable.initializeRenderable(renderableProperties);
        return newRenderable;
    }
    createStarburstEffect(emoteCodes, position = null, numStarburstChildren = 10) {
        const starburst = [];
        for (let numEmotes = 0; numEmotes < numStarburstChildren; numEmotes++) {
            if (!position) {
                position = new emote_interfaces_1.Vector2(math_helper_1.randomNumberBetween(0, html_document_helper_1.getViewWidth()), math_helper_1.randomNumberBetween(0, html_document_helper_1.getViewHeight()));
            }
            starburst.push(this.createStarburstChildEmote(emoteCodes, position));
        }
        return starburst;
    }
    createStarburstChildEmote(emoteCodes, position) {
        const urlsAndSize = this.setUrlsandSize(emoteCodes, 2);
        const newRenderable = new raining_emote_1.RainingEmote(urlsAndSize.urls, urlsAndSize.size);
        const theta = math_helper_1.randomRadianAngle(); // some random number between 0 and 2pi
        const renderableProperties = {
            emoteCodes,
            isMovable: true,
            position: new emote_interfaces_1.Vector2(position.x, position.y),
            velocity: new emote_interfaces_1.Vector2(Math.cos(theta) * math_helper_1.randomNumberBetweenDecimals(0.7, 2.5), Math.sin(theta) * math_helper_1.randomNumberBetweenDecimals(0.7, 2.5)),
            isRotateable: true,
            degreesRotation: 0,
            angularVelocityDegrees: math_helper_1.randomNumberBetween(1, 4),
            isAcceleratable: false,
            acceleration: new emote_interfaces_1.Vector2(),
            isHideable: true,
            opacity: 1,
            lifespan: math_helper_1.randomNumberBetweenDecimals(1.1, 2.2),
            isBouncy: false,
            isFirework: false,
        };
        newRenderable.initializeRenderable(renderableProperties);
        return newRenderable;
    }
    explodeIntoEmotes(emoteCode, position) {
        const randomNumberOfEmoteParticles = math_helper_1.randomNumberBetween(3, 5);
        const emotesToReturn = this.createStarburstEffect([emoteCode], position, randomNumberOfEmoteParticles);
        return emotesToReturn;
    }
}
exports.EmoteFactory = EmoteFactory;
