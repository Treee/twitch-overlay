export class EmoteWidgetConfig {

    channel: string = 'itsatreee';
    defaultImageUrl: string = 'https://cdn.betterttv.net/emote/5d3c7708c77b14468fe92fc4/2x';
    showTwitch: boolean = true;
    showBttv: boolean = true;
    showGlobal: boolean = true;
    botMode: boolean = true;
    totalEmotes: number = 100;
    secondsToRain: number = 10;
    secondsToWaitForRain: number = 23;
    numTimesToRepeat: number = 1;
    local: boolean = false;
    clientId: string = "";

    constructor() {

    }

    setConfigFrom(queryString: string): EmoteWidgetConfig {
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
            } else {
                Object.defineProperty(this, paramKey, {
                    value: paramValue,
                    writable: true
                });
            }
        });
        return this;
    }
}