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
