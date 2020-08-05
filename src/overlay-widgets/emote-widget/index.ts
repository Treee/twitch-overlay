import { EmoteWidgetConfig } from './emote-widget-config';
import { EmoteWidget } from './emote-widget';
import { EmoteWidgetClient } from './emote-widget-client';
import { EmoteFactory } from './emotes/emote-factory';

const emoteWidgetConfig = new EmoteWidgetConfig();
emoteWidgetConfig.setConfigFrom(window.location.search.substring(1));

const emoteFactory = new EmoteFactory();
const emoteWidget = new EmoteWidget(emoteWidgetConfig, emoteFactory);

let websocketRoute = 'wss://itsatreee.com/';
if (emoteWidgetConfig.channel === 'itsatreee') {
    websocketRoute = websocketRoute.concat('treeemotes/');
} else if (emoteWidgetConfig.channel === "membtv") {
    websocketRoute = websocketRoute.concat('membtvemotes/');
} if (emoteWidgetConfig.local) {
    websocketRoute = 'ws://localhost:8446';
}

const serverUrl = websocketRoute;

if (!emoteWidgetConfig.botMode) {
    emoteWidget.startSimulation();
    setInterval(() => {
        emoteWidget.addEmoteToContainer(['']);
    }, 2500);
}
if (emoteWidgetConfig.botMode) {
    new EmoteWidgetClient(websocketRoute, emoteWidget);
    emoteWidget.startSimulation();
    // setTimeout(() => {
    //     for (let i = 0; i < 500; i++) {
    //         emoteWidget.addEmoteToContainer(['itsatreeHi']);
    //     }
    // }, 3000);
    // setInterval(() => {
    //     emoteWidget.addEmoteToContainer(['itsatreeHi']);
    // }, 500);

}
