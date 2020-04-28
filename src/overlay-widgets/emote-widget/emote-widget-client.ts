import { EmoteWidget } from './emote-widget';

enum SocketMessageEnum {
    FoundEmotes, CheckEmoteCache, EmoteCodes, HandleInput, HookInput, PressedKeys
}
enum ComboType {
    None, Sequence, LeftRight
}

export class EmoteWidgetClient {

    socket: WebSocket;
    emoteWidget: EmoteWidget;

    pingInterval: any;

    constructor(serverUrl: string, emoteWidget: EmoteWidget) {
        this.emoteWidget = emoteWidget;
        this.socket = new WebSocket(serverUrl);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    }

    onOpen(event: any) {
        console.log('[open] Connection established');
        console.log('Checking server for cached emotes');
        this.socket.send(JSON.stringify({ type: SocketMessageEnum.CheckEmoteCache, data: '' }));
        this.pingInterval = setInterval(() => {
            this.socket.send('PING');
        }, 45 * 1000); // ping the server on startup every 45 seconds to keep the connection alive
    }

    onMessage(event: any) {
        // console.log(`[message] Data received from server: ${event.data}`);
        if (event.data === 'PONG') { return; }
        const eventData = JSON.parse(event.data);
        if (eventData.type === SocketMessageEnum.CheckEmoteCache) {
            if (eventData.data.length < 1) {
                const emoteCodes = this.emoteWidget.emoteFactory.getEmoteCodes();
                console.log('Sending list of emotes to look for', emoteCodes);
                this.socket.send(JSON.stringify({ type: SocketMessageEnum.EmoteCodes, data: emoteCodes }));
            }
        }
        else if (eventData.type === SocketMessageEnum.FoundEmotes) {
            const invokedEmotes = eventData.data;
            if (!!invokedEmotes && invokedEmotes.length > 0) {
                invokedEmotes.forEach((emoteCode: { type: ComboType, data: string[] }) => {
                    if (emoteCode.type === ComboType.None) {
                        this.emoteWidget.addEmoteToContainer(emoteCode.data);
                    } else if (emoteCode.type === ComboType.Sequence || emoteCode.type === ComboType.LeftRight) { // these are combo emotes
                        this.emoteWidget.addGroupedEmoteToContainer(emoteCode.data);
                    }
                });
            }
        }
    }

    // need to handle cwhen clients close their conenction
    onClose(event: any) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
        }
        clearInterval(this.pingInterval);
    }

    onError(event: any) {
        console.log(`[error] ${event.message}`);
    }
}