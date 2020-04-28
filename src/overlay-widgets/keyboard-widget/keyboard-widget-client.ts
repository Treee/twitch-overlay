import { KeyboardWidget } from "./keyboard-widget";
enum SocketMessageEnum {
    FoundEmotes, CheckEmoteCache, EmoteCodes, HandleInput, HookInput, PressedKeys
}
export class KeyboardWidgetClient {
    serverUrl = 'ws://localhost:8081';
    socket: WebSocket;
    keyboardWidget: KeyboardWidget;

    constructor(serverUrl: string, keyboardWidget: KeyboardWidget) {
        this.serverUrl = serverUrl;
        this.keyboardWidget = keyboardWidget;
        this.socket = new WebSocket(serverUrl);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    }

    onOpen(event: any) {
        console.log('[open] Connection established');
        this.socket.send(JSON.stringify({ type: SocketMessageEnum.HookInput, data: '' }));
    }

    onMessage(event: any) {
        // console.log(`[message] Data received from server: ${event.data}`);
        const eventData = JSON.parse(event.data);
        if (eventData.type === SocketMessageEnum.HandleInput) {
            // console.log('keys', JSON.parse(eventData.data));
            this.keyboardWidget.handleInput(JSON.parse(eventData.data));
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
    }

    onError(event: any) {
        console.log(`[error] ${event.message}`);
    }

}