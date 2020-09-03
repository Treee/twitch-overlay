"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keyboard_layout_1 = require("./keyboard-layout");
class KeyboardWidget {
    constructor() {
        this.keys = [];
        this.toggle = true;
        const htmlElement = document.getElementById('keyboard-container');
        if (htmlElement) {
            // htmlElement.addEventListener('click', this.onUserClick.bind(this));
            // htmlElement.addEventListener('keydown', this.onUserKeyPress.bind(this));
            // htmlElement.addEventListener('keyup', this.onUserKeyPress.bind(this));
            keyboard_layout_1.QwertyKeyboard.forEach((row) => {
                this.createRow('keyboard', row);
            });
            // setInterval(() => {
            //     this.handleInput(this.getActivelyPressedKeys());
            // }, 1000 / 60);
            setInterval(() => {
                // this.triggerRandomCharacterEvent();
            }, 1000 / 60);
        }
    }
    triggerRandomCharacterEvent() {
        var _a;
        const randomCharacter = this.getRandomCharacter();
        const randomChance = this.randomNumberBetween(1, 100);
        const ctrlChance = randomChance % 5 === 0;
        const altChance = randomChance % 4 === 0;
        const shiftChance = randomChance % 3 === 0;
        let event = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            ctrlKey: ctrlChance,
            altKey: altChance,
            shiftKey: shiftChance,
            metaKey: false,
            key: randomCharacter,
            code: `key${randomCharacter}`
        });
        (_a = document.getElementById('keyboard-container')) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
        setTimeout(() => {
            var _a;
            event = new KeyboardEvent('keyup', {
                bubbles: true,
                cancelable: true,
                ctrlKey: ctrlChance,
                altKey: altChance,
                shiftKey: shiftChance,
                metaKey: false,
                key: randomCharacter,
                code: `key${randomCharacter}`
            });
            (_a = document.getElementById('keyboard-container')) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
        }, 100);
    }
    getRandomCharacter() {
        return String.fromCharCode(this.randomNumberBetween(97, 122));
    }
    randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // onUserKeyPress(event: any) {
    //     const key = `${event.code.toLowerCase()}-${event.key.toLowerCase()}`;
    //     const id = this.transformKeyIntoId(key);
    //     this.keys[id] = event.type; // keydown, keyup
    //     event.preventDefault();
    // }
    handleInput(keysMap) {
        keysMap.forEach((keyMap) => {
            var _a, _b;
            const id = this.transformKeyIntoId(keyMap.key);
            if (keyMap.isPressed) {
                (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.classList.add('active-key');
            }
            else {
                (_b = document.getElementById(id)) === null || _b === void 0 ? void 0 : _b.classList.remove('active-key');
            }
        });
    }
    transformKeyIntoId(key) {
        let id = `${key.toLowerCase()}`.trim();
        if (id === 'space-') {
            id = 'space-space';
        }
        else if (/\d/.test(id)) {
            id = `digit${id}-${id}`;
        }
        else if (/[a-z]/.test(id)) {
            id = `key${id}-${id}`;
        }
        return id;
    }
    createKeyboardKey(key) {
        const keyParent = document.createElement('div');
        keyParent.id = key.getId();
        keyParent.classList.add('normal-key');
        key.symbols.forEach((keySymbol) => {
            keyParent.appendChild(this.createKeySymbol(keySymbol));
        });
        return keyParent;
    }
    createKeySymbol(keySymbol) {
        const newKey = document.createElement('div');
        newKey.id = keySymbol.getId();
        newKey.classList.add('key-symbol');
        newKey.innerText = keySymbol.displayText;
        return newKey;
    }
    createRow(containerIdToAppend, listOfKeys) {
        listOfKeys.forEach((key) => {
            var _a;
            (_a = document.getElementById(containerIdToAppend)) === null || _a === void 0 ? void 0 : _a.appendChild(this.createKeyboardKey(key));
        });
        this.addNewLine(containerIdToAppend);
    }
    addNewLine(containerIdToAppend) {
        var _a;
        (_a = document.getElementById(containerIdToAppend)) === null || _a === void 0 ? void 0 : _a.appendChild(document.createElement('br'));
    }
}
exports.KeyboardWidget = KeyboardWidget;
