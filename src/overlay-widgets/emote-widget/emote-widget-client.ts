import { EmoteWidget } from './emote-widget';
import { calculateExponentialBackoffInMilliseconds, randomNumberBetween } from '../../helpers/math-helper';
import { EmoteWidgetConfig } from './emote-widget-config';

export enum SocketMessageEnum {
    ClientRegister,
    PING,
    PONG,
    TEST,
    FoundEmotes,
    CheckEmoteCache,
    EmoteCodes,
    HandleInput,
    HookInput,
    PressedKeys,
    EmoteOnlyModeActive,
    EmoteOnlyModeDisabled,
    ChatCleared,
    Bits,
    Banned,
    FirstTimeSubscription,
    MysteryGiftSubscription,
    GiftSubscription,
    ReSubscription,
    GiftSubscriptionUpgrade,
    MysteryGiftSubscriptionUpgrade,
    Raided,
    Hosted,
    Follow,
    Extra1,
    Extra2,
    Extra3,
    Extra4,
    Extra5,
    Extra6,
    Extra7,
    Extra8,
    Extra9,
    Extra10,
}

enum ComboType {
    None, Sequence, LeftRight
}

export class EmoteWidgetClient {

    socket: WebSocket | undefined;
    emoteWidget: EmoteWidget;
    emoteWidgetConfig: EmoteWidgetConfig;

    pingInterval: any;
    reconnectInterval: any;

    numTimesTriedToReconnect: number = 0;

    serverUrl: string;

    constructor(serverUrl: string, emoteWidget: EmoteWidget, emoteWidgetConfig: EmoteWidgetConfig) {
        this.serverUrl = serverUrl;
        this.emoteWidget = emoteWidget;
        this.emoteWidgetConfig = emoteWidgetConfig;
        this.startClient(serverUrl, emoteWidget);
    }

    onOpen(event: any) {
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
            channelName: this.emoteWidget?.emoteConfig.channel,
            emoteSetIds: setIds
        };
        console.log('Checking server for cached emotes');
        this.sendMessage(SocketMessageEnum.CheckEmoteCache, clientData);
    }

    onMessage(event: any) {
        // console.log(`[message] Data received from server: ${event.data}`);
        const eventData = JSON.parse(event.data);
        if (eventData.type === SocketMessageEnum.PING) { return; }
        else if (eventData.type === SocketMessageEnum.CheckEmoteCache) {
            this.emoteWidget?.emoteFactory.setMasterEmoteList(eventData.data);
        }
        else if (eventData.type === SocketMessageEnum.FoundEmotes) {
            const invokedEmotes = eventData.data;
            if (!!invokedEmotes && invokedEmotes.length > 0) {
                invokedEmotes.forEach((emoteCode: { type: ComboType, data: string[] }) => {
                    if (emoteCode.type === ComboType.None) {
                        this.emoteWidget?.addEmoteToContainer(emoteCode.data);
                    } else if (emoteCode.type === ComboType.Sequence || emoteCode.type === ComboType.LeftRight) { // these are combo emotes
                        this.emoteWidget?.addGroupedEmoteToContainer(emoteCode.data);
                    }
                });
            }
        }
        else if (eventData.type === SocketMessageEnum.EmoteOnlyModeActive) {
            for (let index = 0; index < randomNumberBetween(3, 9); index++) {
                const randomEmote = this.emoteWidget?.emoteFactory.getRandomEmote();
                this.emoteWidget?.addEmoteToContainer([randomEmote.code]);
            }
        }
        else if (eventData.type === SocketMessageEnum.EmoteOnlyModeDisabled) {
            for (let index = 0; index < randomNumberBetween(3, 9); index++) {
                const randomEmote = this.emoteWidget?.emoteFactory.getRandomEmote();
                this.emoteWidget?.addEmoteToContainer([randomEmote.code]);
            }
        }
        else if (eventData.type === SocketMessageEnum.ChatCleared) {
            for (let index = 0; index < randomNumberBetween(9, 11); index++) {
                this.emoteWidget?.addEmoteToContainer(['itsatreeWot']);
            }
        }
        else if (eventData.type === SocketMessageEnum.Bits) {
            for (let index = 0; index < randomNumberBetween(9, 11); index++) {
                const randomEmote = this.emoteWidget?.emoteFactory.getRandomEmote();
                this.emoteWidget?.addEmoteToContainer(['itsatrEeGrump', randomEmote.code]);
            }
        }
        else if (eventData.type === SocketMessageEnum.Banned) {
            for (let index = 0; index < randomNumberBetween(9, 11); index++) {
                this.emoteWidget?.addEmoteToContainer(['itsatrEeMad']);
            }
        }
        else if (eventData.type === SocketMessageEnum.FirstTimeSubscription) {
            for (let index = 0; index < randomNumberBetween(9, 11); index++) {
                this.emoteWidget?.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.MysteryGiftSubscription) {
            for (let index = 0; index < randomNumberBetween(9, 11); index++) {
                this.emoteWidget?.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.GiftSubscription) {
            for (let index = 0; index < randomNumberBetween(9, 11); index++) {
                this.emoteWidget?.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.ReSubscription) {
            for (let index = 0; index < randomNumberBetween(9, 11); index++) {
                this.emoteWidget?.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.GiftSubscriptionUpgrade) {
            for (let index = 0; index < randomNumberBetween(9, 11); index++) {
                this.emoteWidget?.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.MysteryGiftSubscriptionUpgrade) {
            for (let index = 0; index < randomNumberBetween(9, 11); index++) {
                this.emoteWidget?.addEmoteToContainer(['itsatrEee2', 'itsatrEeTeee', 'itsatrEeCool', 'itsatrEeToast']);
            }
        }
        else if (eventData.type === SocketMessageEnum.Hosted) {
            for (let index = 0; index < Math.max(eventData.data.viewers, 100); index++) {
                const randomEmote = this.emoteWidget?.emoteFactory.getRandomEmote();
                this.emoteWidget?.addEmoteToContainer(['TombRaid', randomEmote.code]);
            }
        }
        else if (eventData.type === SocketMessageEnum.Raided) {
            for (let index = 0; index < Math.max(eventData.data.viewers, 100); index++) {
                this.emoteWidget?.addEmoteToContainer(['TombRaid', 'TombRaid']);
            }
        }
    }

    // need to handle cwhen clients close their conenction
    onClose(event: any) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down event.code is usually 1006 in this case
            console.log('[close] Connection died');
            this.reconnectInterval = setInterval((reconnectTimes) => {
                console.log(`Attempting to reconnect to ${this.serverUrl} on ${new Date()}. Reconnect Attempts: ${reconnectTimes}`);
                this.startClient(this.serverUrl, this.emoteWidget);
                clearInterval(this.reconnectInterval);
            }, calculateExponentialBackoffInMilliseconds(this.numTimesTriedToReconnect), this.numTimesTriedToReconnect++); // try to restart every 5 seconds
        }
        clearInterval(this.pingInterval);
    }

    onError(event: any) {
        console.log(`[error] ${event.message}`);
    }

    startClient(serverUrl: string, emoteWidget: EmoteWidget) {
        console.log(`Attempting to connect to ${serverUrl}`);
        this.emoteWidget = emoteWidget;
        this.socket = new WebSocket(serverUrl);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
    }

    formatDataForWebsocket(dataType: SocketMessageEnum, rawData: any) {
        console.log(`Formatting Data for websocket.\nDataType: ${dataType} / ClientId: ${this.emoteWidgetConfig.clientId} / RawData:`, rawData);
        return JSON.stringify({ type: dataType, data: rawData, toClientId: this.emoteWidgetConfig.clientId });
    }

    sendMessage(dataType: SocketMessageEnum, rawData: any) {
        this.socket?.send(this.formatDataForWebsocket(dataType, rawData));
    }
}