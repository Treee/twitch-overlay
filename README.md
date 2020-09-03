# twitch-overlay

## How To Use

1. Open a console in a folder/directory of your choice.
2. `git clone https://github.com/Treee/twitch-overlay` - Clone the repository **Requires [Git](https://git-scm.com/downloads)**
3. `npm install` - Install dependencies. **Requires [NodeJS](https://nodejs.org/en/)**
4. `npm run build` - Build the code.
5. Locate `./build/overlay-widgets/emote-widget/index.html` file. This is the browser source for the emote widget overlay. Open it in the browser to test.

* Note - The above file assumes there is a server listening on the port defined in `./src/overlay-widgets/emote-widget/index.ts` on line 8

## Settings

Thie file `./src/overlay-widgets/emote-widget/emote-widget-config.ts` contains all the configurations for the overlay. These are controlled by query string parameters.

`Example - ./build/overlay-widgets/emote-widget/index.html?channel=myTwitchChannel&botMode=true`

In the above example `channel` and `botMode` are configuration keys and `myTwitchChannel` and `true` are values.

### Default Settings

**Query String Example**

`./build/overlay-widgets/emote-widget/index.html?botMode=true&showGlobal=true&showBttv=true&channel=myTwitchChannel`

**Hard Coded Example**
```ts
export class EmoteWidgetConfig {
    channel: string = 'itsatreee';
    defaultImageUrl: string = 'https://cdn.betterttv.net/emote/5d3c7708c77b14468fe92fc4/2x';
    showTwitch: boolean = true;
    showBttv: boolean = true;
    showGlobal: boolean = false;
    botMode: boolean = false;
    totalEmotes: number = 100;
    secondsToRain: number = 10;
    secondsToWaitForRain: number = 23;
    numTimesToRepeat: number = 1;
}
```

## Setting Up The Server

Follow the steps [here](https://github.com/Treee/twitch-bot).

## Configuration Property Reference

`./src/overlay-widgets/emote-widget/emote-widget-config.ts`

#### Channel (Required)
The name of the twitch channel whose emotes to use.

#### Bot Mode (Required) Default: false
A boolean `true`/`false` to determine if the overlay connects to the [emote server](https://github.com/Treee/twitch-bot).

#### Default Image Url
The url of an image to use in the event emotes are not available.

#### Show Twitch
A boolean `true`/`false` to include Twitch emotes in the list of drawable emotes.

#### Show BTTV
A boolean `true`/`false` to include BTTV Channel emotes in the list of drawable emotes.

#### Show Global
A boolean `true`/`false` to include BTTV Global emotes in the list of drawable emotes.

#### Seconds To Rain
When `botMode` is `false`, how long do emotes rain on the screen.

#### Seconds To Rain
When `botMode` is `false`, how long do emotes wait before raining again on the screen.

#### Num Times To Repeat
When `botMode` is `false`, how many times should the overlay repeat its loop.
