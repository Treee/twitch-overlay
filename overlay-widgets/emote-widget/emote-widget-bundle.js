(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getViewHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
exports.getViewHeight = getViewHeight;
function getViewWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
exports.getViewWidth = getViewWidth;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TWO_PI = Math.PI * 2;
exports.RADIANS = exports.TWO_PI / 360;
function randomRadianAngle() {
    // returns a number between 0 and 2pi
    return randomNumberBetween(0, 360) * exports.RADIANS;
}
exports.randomRadianAngle = randomRadianAngle;
function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomNumberBetween = randomNumberBetween;
function randomNumberBetweenDecimals(min, max, decimalPlaces = 2) {
    // return Math.random() * (max - min + 1);
    var rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min); // could be min or max or anything in between
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
}
exports.randomNumberBetweenDecimals = randomNumberBetweenDecimals;
function calculateExponentialBackoffInMilliseconds(iteration, maxBackoff = 300000) {
    const powerOfTwo = Math.pow(2, iteration) * 1000;
    const randomMilliseconds = randomNumberBetween(1, 1000);
    // console.log(`iteration: ${iteration} power: ${powerOfTwo} seconds: ${powerOfTwo} randomMillis: ${randomMilliseconds}, maxBackoff: ${maxBackoff} backoff: ${Math.min(powerOfTwo + randomMilliseconds, maxBackoff)}`);
    return Math.min(powerOfTwo + randomMilliseconds, maxBackoff);
}
exports.calculateExponentialBackoffInMilliseconds = calculateExponentialBackoffInMilliseconds;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_helper_1 = require("../../helpers/math-helper");
var SocketMessageEnum;
(function (SocketMessageEnum) {
    SocketMessageEnum[SocketMessageEnum["ClientRegister"] = 0] = "ClientRegister";
    SocketMessageEnum[SocketMessageEnum["PING"] = 1] = "PING";
    SocketMessageEnum[SocketMessageEnum["PONG"] = 2] = "PONG";
    SocketMessageEnum[SocketMessageEnum["TEST"] = 3] = "TEST";
    SocketMessageEnum[SocketMessageEnum["FoundEmotes"] = 4] = "FoundEmotes";
    SocketMessageEnum[SocketMessageEnum["CheckEmoteCache"] = 5] = "CheckEmoteCache";
    SocketMessageEnum[SocketMessageEnum["EmoteCodes"] = 6] = "EmoteCodes";
    SocketMessageEnum[SocketMessageEnum["HandleInput"] = 7] = "HandleInput";
    SocketMessageEnum[SocketMessageEnum["HookInput"] = 8] = "HookInput";
    SocketMessageEnum[SocketMessageEnum["PressedKeys"] = 9] = "PressedKeys";
    SocketMessageEnum[SocketMessageEnum["EmoteOnlyModeActive"] = 10] = "EmoteOnlyModeActive";
    SocketMessageEnum[SocketMessageEnum["EmoteOnlyModeDisabled"] = 11] = "EmoteOnlyModeDisabled";
    SocketMessageEnum[SocketMessageEnum["ChatCleared"] = 12] = "ChatCleared";
    SocketMessageEnum[SocketMessageEnum["Bits"] = 13] = "Bits";
    SocketMessageEnum[SocketMessageEnum["Banned"] = 14] = "Banned";
    SocketMessageEnum[SocketMessageEnum["FirstTimeSubscription"] = 15] = "FirstTimeSubscription";
    SocketMessageEnum[SocketMessageEnum["MysteryGiftSubscription"] = 16] = "MysteryGiftSubscription";
    SocketMessageEnum[SocketMessageEnum["GiftSubscription"] = 17] = "GiftSubscription";
    SocketMessageEnum[SocketMessageEnum["ReSubscription"] = 18] = "ReSubscription";
    SocketMessageEnum[SocketMessageEnum["GiftSubscriptionUpgrade"] = 19] = "GiftSubscriptionUpgrade";
    SocketMessageEnum[SocketMessageEnum["MysteryGiftSubscriptionUpgrade"] = 20] = "MysteryGiftSubscriptionUpgrade";
    SocketMessageEnum[SocketMessageEnum["Raided"] = 21] = "Raided";
    SocketMessageEnum[SocketMessageEnum["Hosted"] = 22] = "Hosted";
    SocketMessageEnum[SocketMessageEnum["Follow"] = 23] = "Follow";
    SocketMessageEnum[SocketMessageEnum["Extra1"] = 24] = "Extra1";
    SocketMessageEnum[SocketMessageEnum["Extra2"] = 25] = "Extra2";
    SocketMessageEnum[SocketMessageEnum["Extra3"] = 26] = "Extra3";
    SocketMessageEnum[SocketMessageEnum["Extra4"] = 27] = "Extra4";
    SocketMessageEnum[SocketMessageEnum["Extra5"] = 28] = "Extra5";
    SocketMessageEnum[SocketMessageEnum["Extra6"] = 29] = "Extra6";
    SocketMessageEnum[SocketMessageEnum["Extra7"] = 30] = "Extra7";
    SocketMessageEnum[SocketMessageEnum["Extra8"] = 31] = "Extra8";
    SocketMessageEnum[SocketMessageEnum["Extra9"] = 32] = "Extra9";
    SocketMessageEnum[SocketMessageEnum["Extra10"] = 33] = "Extra10";
})(SocketMessageEnum = exports.SocketMessageEnum || (exports.SocketMessageEnum = {}));
var ComboType;
(function (ComboType) {
    ComboType[ComboType["None"] = 0] = "None";
    ComboType[ComboType["Sequence"] = 1] = "Sequence";
    ComboType[ComboType["LeftRight"] = 2] = "LeftRight";
})(ComboType || (ComboType = {}));
class EmoteWidgetClient {
    constructor(serverUrl, emoteWidget, emoteWidgetConfig) {
        this.numTimesTriedToReconnect = 0;
        this.serverUrl = serverUrl;
        this.emoteWidget = emoteWidget;
        this.emoteWidgetConfig = emoteWidgetConfig;
        this.startClient(serverUrl, emoteWidget);
    }
    onOpen(event) {
        var _a;
        this.numTimesTriedToReconnect = 0;
        clearInterval(this.reconnectInterval);
        console.log('[open] Connection established');
        this.sendMessage(SocketMessageEnum.ClientRegister, this.emoteWidgetConfig.clientId);
        this.pingInterval = setInterval(() => {
            this.sendMessage(SocketMessageEnum.PING, {});
        }, 45 * 1000); // ping the server on startup every 45 seconds to keep the connection alive
        const twitchDefault = 0;
        const textEmojiDefault = 42;
        const amazonPrimeDefault = 19194;
        const membTier1 = 6112;
        const membTier2 = 24314;
        const membTier3 = 24315;
        const nikeTier1 = 12661;
        const thunderTier1 = 135189;
        const elenaTier1 = 104951;
        const elenaTier2 = 104955;
        const elenaTier3 = 104956;
        const loonaTier1 = 715879;
        const loonaTier2 = 715880;
        const loonaTier3 = 715881;
        const setIds = [twitchDefault, textEmojiDefault, amazonPrimeDefault, membTier1, membTier2, membTier3, nikeTier1, thunderTier1, elenaTier1, elenaTier2, elenaTier3, loonaTier1, loonaTier2, loonaTier3];
        const clientData = {
            channelName: (_a = this.emoteWidget) === null || _a === void 0 ? void 0 : _a.emoteConfig.channel,
            emoteSetIds: setIds
        };
        console.log('Checking server for cached emotes');
        this.sendMessage(SocketMessageEnum.CheckEmoteCache, clientData);
    }
    onMessage(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        // console.log(`[message] Data received from server: ${event.data}`);
        const eventData = JSON.parse(event.data);
        if (eventData.type === SocketMessageEnum.PING) {
            return;
        }
        else if (eventData.type === SocketMessageEnum.CheckEmoteCache) {
            (_a = this.emoteWidget) === null || _a === void 0 ? void 0 : _a.emoteFactory.setMasterEmoteList(eventData.data);
        }
        else if (eventData.type === SocketMessageEnum.FoundEmotes) {
            const invokedEmotes = eventData.data;
            if (!!invokedEmotes && invokedEmotes.length > 0) {
                invokedEmotes.forEach((emoteCode) => {
                    var _a, _b;
                    if (emoteCode.type === ComboType.None) {
                        (_a = this.emoteWidget) === null || _a === void 0 ? void 0 : _a.addEmoteToContainer(emoteCode.data);
                    }
                    else if (emoteCode.type === ComboType.Sequence || emoteCode.type === ComboType.LeftRight) { // these are combo emotes
                        (_b = this.emoteWidget) === null || _b === void 0 ? void 0 : _b.addGroupedEmoteToContainer(emoteCode.data);
                    }
                });
            }
        }
        else if (eventData.type === SocketMessageEnum.EmoteOnlyModeActive) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(3, 9); index++) {
                const randomEmote = (_b = this.emoteWidget) === null || _b === void 0 ? void 0 : _b.emoteFactory.getRandomEmote();
                (_c = this.emoteWidget) === null || _c === void 0 ? void 0 : _c.addEmoteToContainer([randomEmote.code]);
            }
        }
        else if (eventData.type === SocketMessageEnum.EmoteOnlyModeDisabled) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(3, 9); index++) {
                const randomEmote = (_d = this.emoteWidget) === null || _d === void 0 ? void 0 : _d.emoteFactory.getRandomEmote();
                (_e = this.emoteWidget) === null || _e === void 0 ? void 0 : _e.addEmoteToContainer([randomEmote.code]);
            }
        }
        else if (eventData.type === SocketMessageEnum.ChatCleared) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(9, 11); index++) {
                (_f = this.emoteWidget) === null || _f === void 0 ? void 0 : _f.addEmoteToContainer(['itsatreeWot']);
            }
        }
        else if (eventData.type === SocketMessageEnum.Bits) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(9, 11); index++) {
                const randomEmote = (_g = this.emoteWidget) === null || _g === void 0 ? void 0 : _g.emoteFactory.getRandomEmote();
                (_h = this.emoteWidget) === null || _h === void 0 ? void 0 : _h.addEmoteToContainer(['itsatrEeGrump', randomEmote.code]);
            }
        }
        else if (eventData.type === SocketMessageEnum.Banned) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(9, 11); index++) {
                (_j = this.emoteWidget) === null || _j === void 0 ? void 0 : _j.addEmoteToContainer(['itsatrEeMad']);
            }
        }
        else if (eventData.type === SocketMessageEnum.FirstTimeSubscription) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(9, 11); index++) {
                (_k = this.emoteWidget) === null || _k === void 0 ? void 0 : _k.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.MysteryGiftSubscription) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(9, 11); index++) {
                (_l = this.emoteWidget) === null || _l === void 0 ? void 0 : _l.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.GiftSubscription) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(9, 11); index++) {
                (_m = this.emoteWidget) === null || _m === void 0 ? void 0 : _m.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.ReSubscription) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(9, 11); index++) {
                (_o = this.emoteWidget) === null || _o === void 0 ? void 0 : _o.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.GiftSubscriptionUpgrade) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(9, 11); index++) {
                (_p = this.emoteWidget) === null || _p === void 0 ? void 0 : _p.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.MysteryGiftSubscriptionUpgrade) {
            for (let index = 0; index < math_helper_1.randomNumberBetween(9, 11); index++) {
                (_q = this.emoteWidget) === null || _q === void 0 ? void 0 : _q.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.Hosted) {
            for (let index = 0; index < Math.max(eventData.data.viewers, 100); index++) {
                const randomEmote = (_r = this.emoteWidget) === null || _r === void 0 ? void 0 : _r.emoteFactory.getRandomEmote();
                (_s = this.emoteWidget) === null || _s === void 0 ? void 0 : _s.addEmoteToContainer(['TombRaid', randomEmote.code]);
            }
        }
        else if (eventData.type === SocketMessageEnum.Raided) {
            for (let index = 0; index < Math.max(eventData.data.viewers, 100); index++) {
                (_t = this.emoteWidget) === null || _t === void 0 ? void 0 : _t.addEmoteToContainer(['TombRaid', 'TombRaid']);
            }
        }
    }
    // need to handle cwhen clients close their conenction
    onClose(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        }
        else {
            // e.g. server process killed or network down event.code is usually 1006 in this case
            console.log('[close] Connection died');
            this.reconnectInterval = setInterval((reconnectTimes) => {
                console.log(`Attempting to reconnect to ${this.serverUrl} on ${new Date()}. Reconnect Attempts: ${reconnectTimes}`);
                this.startClient(this.serverUrl, this.emoteWidget);
                clearInterval(this.reconnectInterval);
            }, math_helper_1.calculateExponentialBackoffInMilliseconds(this.numTimesTriedToReconnect), this.numTimesTriedToReconnect++); // try to restart every 5 seconds
        }
        clearInterval(this.pingInterval);
    }
    onError(event) {
        console.log(`[error] ${event.message}`);
    }
    startClient(serverUrl, emoteWidget) {
        console.log(`Attempting to connect to ${serverUrl}`);
        this.emoteWidget = emoteWidget;
        this.socket = new WebSocket(serverUrl);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
    }
    formatDataForWebsocket(dataType, rawData) {
        console.log(`Formatting Data for websocket.\nDataType: ${dataType} / ClientId: ${this.emoteWidgetConfig.clientId} / RawData:`, rawData);
        return JSON.stringify({ type: dataType, data: rawData, toClientId: this.emoteWidgetConfig.clientId });
    }
    sendMessage(dataType, rawData) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(this.formatDataForWebsocket(dataType, rawData));
    }
}
exports.EmoteWidgetClient = EmoteWidgetClient;

},{"../../helpers/math-helper":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmoteWidgetConfig {
    constructor() {
        this.channel = 'itsatreee';
        this.defaultImageUrl = 'https://cdn.betterttv.net/emote/5d3c7708c77b14468fe92fc4/2x';
        this.showTwitch = true;
        this.showBttv = true;
        this.showGlobal = true;
        this.botMode = true;
        this.totalEmotes = 100;
        this.secondsToRain = 10;
        this.secondsToWaitForRain = 23;
        this.numTimesToRepeat = 1;
        this.local = false;
        this.clientId = "";
    }
    setConfigFrom(queryString) {
        queryString.split('&').forEach((param) => {
            const paramKey = param.split('=')[0];
            const paramValue = param.split('=')[1];
            if (!paramValue) {
                return;
            }
            else if (paramValue === 'true' || paramValue === 'false') {
                Object.defineProperty(this, paramKey, {
                    value: paramValue === 'true',
                    writable: true
                });
            }
            else {
                Object.defineProperty(this, paramKey, {
                    value: paramValue,
                    writable: true
                });
            }
        });
        return this;
    }
}
exports.EmoteWidgetConfig = EmoteWidgetConfig;

},{}],5:[function(require,module,exports){
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

},{"../../helpers/math-helper":2,"./emotes/emote-interfaces":7}],6:[function(require,module,exports){
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

},{"../../../helpers/html-document-helper":1,"../../../helpers/math-helper":2,"./emote-interfaces":7,"./firework-emote":8,"./parabolic-emote":9,"./raining-emote":10,"./wavy-emote":11}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x},${this.y})`;
    }
}
exports.Vector2 = Vector2;
class RenderableObject {
    constructor(imageSrcs, size) {
        this.emoteCodes = [];
        this.isMovable = false;
        this.position = new Vector2();
        this.velocity = new Vector2();
        this.isRotateable = false;
        this.degreesRotation = 0;
        this.angularVelocityDegrees = 0;
        this.isAcceleratable = false;
        this.acceleration = new Vector2();
        this.isHideable = true;
        this.opacity = 1;
        this.lifespan = 0;
        this.isBouncy = false;
        this.canvasHeight = 1080;
        this.canvasWidth = 1920;
        this.isFirework = false;
        this.isExploded = false;
        this.imageSrc = imageSrcs;
        this.htmlElement = this.createHtmlElements('emote', imageSrcs, size);
    }
    initializeRenderable(objectProperties) {
        this.emoteCodes = objectProperties.emoteCodes;
        this.isMovable = objectProperties.isMoveable;
        this.position = objectProperties.position;
        this.velocity = objectProperties.velocity;
        this.isRotateable = objectProperties.isRotateable;
        this.degreesRotation = objectProperties.degreesRotation;
        this.angularVelocityDegrees = objectProperties.angularVelocityDegrees;
        this.isAcceleratable = objectProperties.isAcceleratable;
        this.acceleration = objectProperties.acceleration;
        this.isHideable = objectProperties.isHideable;
        this.opacity = objectProperties.opacity;
        this.lifespan = objectProperties.lifespan;
        this.isBouncy = objectProperties.isBouncy;
        this.canvasHeight = objectProperties.canvasHeight;
        this.canvasWidth = objectProperties.canvasWidth;
        this.isFirework = objectProperties.isFirework;
        this.isExploded = objectProperties.isExploded;
        this.applyTransform();
    }
    createHtmlElements(cssClass, imageUrls, size) {
        if (imageUrls.length > 1) {
            const element = $('<div></div>').addClass('grouped-emote');
            element.height(`${size.y}px`);
            element.width(`${size.x * imageUrls.length}px`);
            imageUrls.forEach((imageUrl) => {
                element.append(this.createHtmlElement('grouped-emote-icon', imageUrl, size));
            });
            return element;
        }
        else {
            return this.createHtmlElement(cssClass, imageUrls[0], size);
        }
    }
    createHtmlElement(cssClass, imageSrc, size) {
        const element = $('<div></div>').addClass(cssClass);
        element.width(`${size.x}px`);
        element.height(`${size.y}px`);
        element.css('background', `url("${imageSrc}")`);
        return element;
    }
    translate(x, y) {
        return `translate(${x}px, ${y}px)`;
    }
    rotate(degrees) {
        return `rotate(${degrees}deg)`;
    }
    applyTransform() {
        if (this.htmlElement) {
            const translation = this.translate(this.position.x, this.position.y);
            const rotation = this.rotate(this.degreesRotation);
            this.htmlElement.css('transform', `${translation} ${rotation}`);
            this.htmlElement.css('opacity', `${this.opacity}`);
        }
    }
    // default behavior is to move linearly based on the velocity
    calculateNextMoveFrame(dt) {
        return new Vector2(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
    }
    // default behavior is to rotate around the center point
    calculateNextRotationFrame(dt) {
        let nextRotation = this.degreesRotation + this.angularVelocityDegrees;
        if (nextRotation > 360) {
            nextRotation = nextRotation - 360;
        }
        return nextRotation;
    }
    isHidden() {
        return this.lifespan < 0;
    }
    modifyOpacity(dt) {
        this.opacity -= dt;
    }
    doUpdate(dt) {
        throw new Error('doUpdate is not implemented in abstract class RenderableObject');
    }
    draw() {
        this.applyTransform();
    }
    cleanUp() {
        if (this.lifespan < 0) {
            this.htmlElement.remove();
        }
    }
}
exports.RenderableObject = RenderableObject;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_interfaces_1 = require("./emote-interfaces");
class FireworkEmote extends emote_interfaces_1.RenderableObject {
    accelerate(dt) {
        // move the emote up along the y axis
        this.acceleration.y += dt;
        // when the velocity changes we are at the epoch of the curve, set lifespan to close to 0 so emote explodes
        if (this.velocity.y > 0) {
            this.lifespan /= 2;
        }
        this.velocity = new emote_interfaces_1.Vector2(this.velocity.x + (this.acceleration.x * dt), this.velocity.y + (this.acceleration.y * dt));
        // console.log(`Accel: ${this.acceleration} Current: ${this.velocity}`);
    }
    calculateNextMoveFrame(dt) {
        this.accelerate(dt);
        return super.calculateNextMoveFrame(dt);
    }
    modifyOpacity(dt) {
        this.opacity -= dt * 2;
    }
    doUpdate(dt) {
        this.lifespan -= dt;
        if (!this.isHidden()) {
            this.position = this.calculateNextMoveFrame(dt);
            this.degreesRotation = this.calculateNextRotationFrame(dt);
        }
        if (this.lifespan < 1) {
            this.modifyOpacity(dt);
        }
    }
}
exports.FireworkEmote = FireworkEmote;

},{"./emote-interfaces":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_interfaces_1 = require("./emote-interfaces");
class ParabolicEmote extends emote_interfaces_1.RenderableObject {
    constructor() {
        super(...arguments);
        this.accelerationModifier = 1;
    }
    accelerate(dt) {
        if (this.isBouncy && this.position.y > this.canvasHeight) {
            this.velocity.y = this.velocity.y * -1;
            this.accelerationModifier *= 1.5;
        }
        if (this.isBouncy && (this.position.x > this.canvasWidth || this.position.x < 0)) {
            this.velocity.x = this.velocity.x * -1;
            this.accelerationModifier *= 1.5;
        }
        // this.acceleration.x -= dt;
        this.acceleration.y += dt * this.accelerationModifier;
        this.velocity = new emote_interfaces_1.Vector2(this.velocity.x + (this.acceleration.x * dt), this.velocity.y + (this.acceleration.y * dt));
        // console.log(`Accel: ${this.acceleration} Current: ${this.velocity}`);
    }
    calculateNextMoveFrame(dt) {
        this.accelerate(dt);
        return super.calculateNextMoveFrame(dt);
    }
    doUpdate(dt) {
        this.lifespan -= dt;
        if (!this.isHidden()) {
            this.position = this.calculateNextMoveFrame(dt);
            this.degreesRotation = this.calculateNextRotationFrame(dt);
        }
        if (this.lifespan < 1) {
            this.modifyOpacity(dt);
        }
    }
}
exports.ParabolicEmote = ParabolicEmote;

},{"./emote-interfaces":7}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_interfaces_1 = require("./emote-interfaces");
class RainingEmote extends emote_interfaces_1.RenderableObject {
    doUpdate(dt) {
        this.lifespan -= dt;
        if (!this.isHidden()) {
            this.position = this.calculateNextMoveFrame(dt);
            this.degreesRotation = this.calculateNextRotationFrame(dt);
        }
        if (this.lifespan < 1) {
            this.modifyOpacity(dt);
        }
    }
}
exports.RainingEmote = RainingEmote;

},{"./emote-interfaces":7}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_interfaces_1 = require("./emote-interfaces");
const math_helper_1 = require("../../../helpers/math-helper");
class WavyEmote extends emote_interfaces_1.RenderableObject {
    constructor() {
        super(...arguments);
        this.movementTheta = 0;
        this.randomAmplitude = math_helper_1.randomNumberBetween(2, 5);
    }
    calculateNextMoveFrame(dt) {
        this.movementTheta += dt;
        this.velocity.y = this.randomAmplitude * Math.sin(this.movementTheta);
        return super.calculateNextMoveFrame(dt);
    }
    doUpdate(dt) {
        this.lifespan -= dt;
        if (!this.isHidden()) {
            this.position = this.calculateNextMoveFrame(dt);
            this.degreesRotation = this.calculateNextRotationFrame(dt);
        }
        if (this.lifespan < 1) {
            this.modifyOpacity(dt);
        }
    }
}
exports.WavyEmote = WavyEmote;

},{"../../../helpers/math-helper":2,"./emote-interfaces":7}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_widget_config_1 = require("./emote-widget-config");
const emote_widget_1 = require("./emote-widget");
const emote_widget_client_1 = require("./emote-widget-client");
const emote_factory_1 = require("./emotes/emote-factory");
const emoteWidgetConfig = new emote_widget_config_1.EmoteWidgetConfig();
emoteWidgetConfig.setConfigFrom(window.location.search.substring(1));
const emoteFactory = new emote_factory_1.EmoteFactory();
const emoteWidget = new emote_widget_1.EmoteWidget(emoteWidgetConfig, emoteFactory);
let websocketRoute = 'wss://itsatreee.com/';
if (emoteWidgetConfig.channel === 'itsatreee') {
    websocketRoute = websocketRoute.concat('treeemotes/');
}
else if (emoteWidgetConfig.channel === "membtv") {
    websocketRoute = websocketRoute.concat('membtvemotes/');
}
if (emoteWidgetConfig.local) {
    websocketRoute = 'ws://localhost:8446';
}
if (!emoteWidgetConfig.botMode) {
    emoteWidget.startSimulation();
    setInterval(() => {
        emoteWidget.addEmoteToContainer(['']);
    }, 2500);
}
if (emoteWidgetConfig.botMode) {
    new emote_widget_client_1.EmoteWidgetClient(websocketRoute, emoteWidget, emoteWidgetConfig);
    emoteWidget.startSimulation();
    // setTimeout(() => {
    //     for (let i = 0; i < 500; i++) {
    //         emoteWidget.addEmoteToContainer(['itsatreeHi']);
    //     }
    // }, 3000);
    // setInterval(() => {
    //     emoteWidget.addEmoteToContainer(['itsatreeHi']);
    // }, 1000);
}

},{"./emote-widget":5,"./emote-widget-client":3,"./emote-widget-config":4,"./emotes/emote-factory":6}]},{},[12]);
