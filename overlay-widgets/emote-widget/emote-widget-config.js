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
