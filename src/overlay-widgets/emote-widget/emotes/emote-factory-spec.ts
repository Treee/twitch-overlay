import { EmoteFactory } from "./emote-factory";
import { TwitchEmote } from "./emote";

describe('Emote Widget Spec', () => {

    let testEmoteFactory: EmoteFactory;

    beforeEach(() => {
        testEmoteFactory = new EmoteFactory();
    });

    it('gets the list of emote codes available', () => {
        let emote1 = new TwitchEmote('code1', 0, '0');
        let emote2 = new TwitchEmote('code2', 0, '0');
        let emote3 = new TwitchEmote('code3', 0, '0');
        testEmoteFactory.masterEmoteList = [emote1, emote2, emote3];
        const expectedReturnedCodes = [emote1.code, emote2.code, emote3.code];
        let actualReturnedCodes = testEmoteFactory.getEmoteCodes();
        expect(actualReturnedCodes).toEqual(expectedReturnedCodes);

        const newCode = 'someNewCode';
        testEmoteFactory.masterEmoteList.push(new TwitchEmote(newCode, 0, '0'));
        expectedReturnedCodes.push(newCode);
        actualReturnedCodes = testEmoteFactory.getEmoteCodes();
        expect(actualReturnedCodes).toEqual(expectedReturnedCodes);
    });

    it('throws an error when trying to select a random emote when no emotes are in the master list', () => {
        expect(() => { testEmoteFactory.getRandomEmote(); }).toThrow(new Error('No Emotes in the master list.'));
    });
});