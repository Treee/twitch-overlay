"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_interfaces_1 = require("./emote-interfaces");
class Emote {
    constructor(scale, url, code, id, type) {
        this.channelPointModifier = '';
        this.url = url;
        this.scale = scale;
        this.code = code;
        this.id = id;
        this.type = type;
    }
    setScale(size) {
        this.scale = size;
    }
    convertScaleToPixels() {
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
        return new emote_interfaces_1.Vector2(emoteWidth, emoteHeight);
    }
    setUrl() {
        throw new Error('Set Url Not Implemented In Abstract Class');
    }
}
exports.Emote = Emote;
class BttvEmoteResponse {
    constructor(urlTemplate, emotes) {
        this.urlTemplate = urlTemplate;
        this.emotes = emotes;
    }
}
exports.BttvEmoteResponse = BttvEmoteResponse;
class BttvEmote extends Emote {
    constructor(channel, code, id, imageType) {
        super(1, '', code, id, 'bttv');
        this.channel = channel;
        this.imageType = imageType;
        this.setUrl();
    }
    setUrl() {
        this.url = `https://cdn.betterttv.net/emote/${this.id}/${this.scale}x`;
    }
}
exports.BttvEmote = BttvEmote;
class TwitchEmoteResponse {
    constructor(channelId, channeName, channelDisplayName, emotes, subBadges) {
        this.channelId = channelId;
        this.channelName = channeName;
        this.channelDisplayName = channelDisplayName;
        this.emotes = emotes;
        this.subBadges = subBadges;
    }
}
exports.TwitchEmoteResponse = TwitchEmoteResponse;
class SubBadge {
    constructor(tier, displayName, imageSizes) {
        this.tier = tier;
        this.displayName = displayName;
        this.imageSizes = imageSizes;
    }
}
exports.SubBadge = SubBadge;
class TwitchEmote extends Emote {
    constructor(code = 'FrankerZ', emoticon_set, id, scale = 1, url = '') {
        super(scale, url, code, id, 'twitch');
        this.channelPointModifier = '';
        this.emoticon_set = emoticon_set;
        this.setUrl();
    }
    convertScaleToPixels() {
        if (this.emoticon_set === 42) {
            return new emote_interfaces_1.Vector2(20 * this.scale, 18 * this.scale);
        }
        else {
            return super.convertScaleToPixels();
        }
    }
    setUrl() {
        this.url = `https://static-cdn.jtvnw.net/emoticons/v1/${this.id}${this.channelPointModifier}/${this.scale}.0`;
    }
}
exports.TwitchEmote = TwitchEmote;
