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
