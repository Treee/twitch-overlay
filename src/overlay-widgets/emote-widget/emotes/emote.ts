import { Vector2 } from "./emote-interfaces";

export abstract class Emote {

    id: string;
    code: string;
    url: string;
    scale: number;
    type: string;
    channelPointModifier: string = '';

    constructor(scale: number, url: string, code: string, id: string, type: string) {
        this.url = url;
        this.scale = scale;
        this.code = code;
        this.id = id;
        this.type = type;
    }

    setScale(size: number) {
        this.scale = size;
    }

    convertScaleToPixels(): Vector2 {
        let emoteWidth = 0, emoteHeight = 0;
        if (this.scale === 1) {
            emoteWidth = 28;
            emoteHeight = 28;
        }
        else if (this.scale === 2) {
            emoteWidth = 56;
            emoteHeight = 56;
        }
        else if (this.scale === 3) {
            emoteWidth = 112;
            emoteHeight = 112;
        }
        return new Vector2(emoteWidth, emoteHeight);
    }

    setUrl() {
        throw new Error('Set Url Not Implemented In Abstract Class');
    }
}

export class BttvEmoteResponse {
    urlTemplate: string;
    emotes: BttvEmote[];

    constructor(urlTemplate: string, emotes: BttvEmote[]) {
        this.urlTemplate = urlTemplate;
        this.emotes = emotes;
    }
}


export class BttvEmote extends Emote {
    channel: string;
    imageType: string;

    constructor(channel: string, code: string, id: string, imageType: string) {
        super(1, '', code, id, 'bttv');
        this.channel = channel;
        this.imageType = imageType;
        this.setUrl();
    }

    setUrl() {
        this.url = `https://cdn.betterttv.net/emote/${this.id}/${this.scale}x`;
    }
}

export class TwitchEmoteResponse {
    channelId: string;
    channelName: string;
    channelDisplayName: string;
    emotes: TwitchEmote[];
    subBadges: SubBadge[];

    constructor(channelId: string, channeName: string, channelDisplayName: string, emotes: TwitchEmote[], subBadges: SubBadge[]) {
        this.channelId = channelId;
        this.channelName = channeName;
        this.channelDisplayName = channelDisplayName;
        this.emotes = emotes;
        this.subBadges = subBadges;
    }
}

export class SubBadge {
    tier: number;
    displayName: string;
    imageSizes: string[]

    constructor(tier: number, displayName: string, imageSizes: string[]) {
        this.tier = tier;
        this.displayName = displayName;
        this.imageSizes = imageSizes;
    }
}

export class TwitchEmote extends Emote {
    emoticon_set: number;
    channelPointModifier: string = '';

    constructor(code: string = 'FrankerZ', emoticon_set: number, id: string, scale: number = 1, url: string = '') {
        super(scale, url, code, id, 'twitch');
        this.emoticon_set = emoticon_set;
        this.setUrl();
    }

    convertScaleToPixels(): Vector2 {
        if (this.emoticon_set === 42) {
            return new Vector2(20 * this.scale, 18 * this.scale);
        } else {
            return super.convertScaleToPixels();
        }
    }

    setUrl() {
        this.url = `https://static-cdn.jtvnw.net/emoticons/v1/${this.id}${this.channelPointModifier}/${this.scale}.0`;
    }
}