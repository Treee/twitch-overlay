[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
# Emote Widget

[Example](https://treee.github.io/emote-widget-simple/?channel=itsatreee&showBttv=false&numTimesToRepeat=1)

## How to Use

### For starters...

Clone or [download](https://github.com/Treee/emote-widget-simple/archive/master.zip) this repository. If you downlaod the zip, unzip the contents wherever you want.

File Name | Description
--- | ---
index.hmtl  | HTML page that will render the raining emotes. Open this file locally with your browser to add as a browser source in OBS.
index.js  |  Javascript file that performs the majority of functionality. This is the place to modify stuff if you know what you are doing.
stylezz.css  | This is our css file that defines the style of our basic html components and the animations.
README.md  | Helpful file that contains information about this widget. (What you are reading right now.)
LICENSE.txt  | Read this if you are looking to take the code and resell.

This widget is driven by two pieces of information: `clientId` and `channel name`. When you have set both values (see below) you can open the `index.html` file in your browser and copy the url for a **Browser Source** in OBS. Use the defined query string parameters below to configure different results or edit the source.

#### Client ID
[Twitch Docs](https://dev.twitch.tv/docs/v5#getting-a-client-id)  
This is used for twitch api authentication. Creating one is simple and is used for non-authenticating requests when not accompanied with an OAuth token. It will look something like this `gn4m6kqja6gkcgt24z0pbt823rurvq`.

To obtain your own client id, log into the [twitch developers webpage](https://dev.twitch.tv/login). This is Twitch's developer page and uses your Twitch username and password to authenticate.

Once logged in, navigate to the [Application Dashboard](https://dev.twitch.tv/console/apps)

- Register a new application. Use the below values:
    - Name: This name can be whatever you want as long as Twitch is not included **AND** is unique.
    - OAuth Redirect URLs: **localhost**
    - Category: **Browser Extension**
    - **Confirm you are not a robot.**
- Click Create

Click into the newly created application. Find the **Client ID** near the bottom. This is not a secret value but is a unique identifier for the application.

Copy the **Client ID** and replace the value on line 2 in **index.js**. (Make sure the client id is between the tick marks; 'clientId')
- `const clientId = 'gn4m6kqja6gkcgt24z0pbt823rurvq'`

#### Channel Name

The name of the channel you want to pull emotes from. In this example, https://www.twitch.tv/itsatreee `itsatreee` is the channel name.

### Configuration

#### URL Parameters

Param | Default Value | Description
--- | --- | ---
channel (Required) | itsatreee | The channel whose emtoes to display
single |  | This will override emotes and only display a single emote base on its emote chatcode. Kappa
showTwitch | true | Determines if Twitch emotes are added to the random pool of visible emotes.
showBttv | true | Determines if Bttv emotes are added to the random pool of visible emotes.
totalEmotes | 100 | Determines the total emotes to create in one iteration.
secondsToRain | 10 | Determines for how long emotes will be created.
secondsToWaitForRain | 23 | How long to wait to start raining emotes again after they are stopped.
numTimesToRepeat | 1 | The number of times to repeat. Use -1 for continuous raining emotes!!  

`Defaults are rough values I found good enough during development. If you feel yours are better let me know so I can compare.`

`Examples:`
- https://treee.github.io/emote-widget-simple/index.html?channel=itsatreee&numTimesToRepeat=1
  - Show Twitch and Bttv emotes from ItsATreee's channel
  - Only rain emotes once

- https://treee.github.io/emote-widget-simple/index.html?channel=itsatreee&numTimesToRepeat=-1&showBttv=true&showTwitch=false
  - Show Bttv and hide Twitch emotes from ItsATreee's channel
  - Emotes will rain continuously

- https://treee.github.io/emote-widget-simple/?channel=itsatreee&single=itsatrEeCool
  - Show the single emote itsatrEeCool
  - Only rain emotes once
