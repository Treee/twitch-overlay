import { EmoteWidgetConfig } from './emote-widget-config';
import { EmoteWidget } from './emote-widget';
import { EmoteWidgetClient } from './emote-widget-client';
import { EmoteFactory } from './emotes/emote-factory';

const emoteWidgetConfig = new EmoteWidgetConfig();
emoteWidgetConfig.setConfigFrom(window.location.search.substring(1));

const emoteFactory = new EmoteFactory();
const emoteWidget = new EmoteWidget(emoteWidgetConfig, emoteFactory);

const serverUrl = 'wss://www.itsatreee.com/emotewidgettree';

if (!emoteWidgetConfig.botMode) {
    emoteWidget.startSimulation();
    setInterval(() => {
        emoteWidget.addEmoteToContainer(['']);
    }, 2500);
}
if (emoteWidgetConfig.botMode) {
    new EmoteWidgetClient(serverUrl, emoteWidget);
    // twitchApiV5.test(emoteWidgetConfig.clientId);
    emoteWidget.startSimulation();
}
