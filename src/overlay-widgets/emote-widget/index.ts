import { EmoteWidgetConfig } from './emote-widget-config';
import { EmoteWidget } from './emote-widget';
import { EmoteWidgetClient } from './emote-widget-client';
import { EmoteFactory } from './emotes/emote-factory';


const serverUrl = 'ws://localhost';
const serverPort = '8446'

const emoteWidgetConfig = new EmoteWidgetConfig();
emoteWidgetConfig.setConfigFrom(window.location.search.substring(1));

const emoteFactory = new EmoteFactory();
const emoteWidget = new EmoteWidget(emoteWidgetConfig, emoteFactory);


if (!emoteWidgetConfig.botMode) {
    emoteWidget.startSimulation();
    // this first interval makes it so emotes rain immediately instead of waiting for the second interval to start

    // this interval will continually start and stop the raining of emotes.
    setInterval(() => {
        emoteWidget.addEmoteToContainer(['']);

    }, 2500);
}
if (emoteWidgetConfig.botMode) {
    // new EmoteWidgetClient('wss://www.itsatreee.com/emotewidgettree', emoteWidget);
    new EmoteWidgetClient(`${serverUrl}:${serverPort}`, emoteWidget);
    // twitchApiV5.test(emoteWidgetConfig.clientId);
    emoteWidget.startSimulation();
}
