(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keyboard_widget_1 = require("./keyboard-widget");
const keyboardWidget = new keyboard_widget_1.KeyboardWidget();
// new KeyboardWidgetClient('ws://localhost:8081', keyboardWidget);

},{"./keyboard-widget":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeySymbol {
    constructor(code, key, displayText) {
        this.code = code;
        this.key = key || code;
        this.displayText = displayText || key || code;
    }
    getId() {
        return `${this.code}-${this.key}`.toLowerCase();
    }
}
exports.KeySymbol = KeySymbol;
class Key {
    constructor(symbol1, symbol2) {
        this.symbols = [];
        if (symbol1) {
            this.symbols.push(symbol1);
        }
        if (symbol2) {
            this.symbols.push(symbol2);
        }
    }
    isPressed(code, eventType) {
        let pressed = false;
        this.symbols.forEach((symbol) => {
            if (symbol.code === code) {
                pressed = eventType === 'keydown';
            }
        });
        return pressed;
    }
    getId() {
        let id = '';
        this.symbols.forEach((symbol) => {
            id = id.concat(symbol.getId()).concat('-');
        });
        id = id.slice(0, -1);
        return id.toLowerCase();
    }
}
exports.Key = Key;
const esc = [
    new Key(new KeySymbol('Escape', 'Escape', 'Esc')),
    new Key(new KeySymbol('F1')),
    new Key(new KeySymbol('F2')),
    new Key(new KeySymbol('F3')),
    new Key(new KeySymbol('F4')),
    new Key(new KeySymbol('F5')),
    new Key(new KeySymbol('F6')),
    new Key(new KeySymbol('F7')),
    new Key(new KeySymbol('F8')),
    new Key(new KeySymbol('F9')),
    new Key(new KeySymbol('F10')),
    new Key(new KeySymbol('F11')),
    new Key(new KeySymbol('F12'))
];
const backQuote = [
    new Key(new KeySymbol('Backquote', '~'), new KeySymbol('Backquote', '`')),
    new Key(new KeySymbol('Digit1', '!'), new KeySymbol('Digit1', '1')),
    new Key(new KeySymbol('Digit2', '@'), new KeySymbol('Digit2', '2')),
    new Key(new KeySymbol('Digit3', '#'), new KeySymbol('Digit3', '3')),
    new Key(new KeySymbol('Digit4', '$'), new KeySymbol('Digit4', '4')),
    new Key(new KeySymbol('Digit5', '%'), new KeySymbol('Digit5', '5')),
    new Key(new KeySymbol('Digit6', '^'), new KeySymbol('Digit6', '6')),
    new Key(new KeySymbol('Digit7', '&'), new KeySymbol('Digit7', '7')),
    new Key(new KeySymbol('Digit8', '*'), new KeySymbol('Digit8', '8')),
    new Key(new KeySymbol('Digit9', '('), new KeySymbol('Digit9', '9')),
    new Key(new KeySymbol('Digit0', ')'), new KeySymbol('Digit0', '0')),
    new Key(new KeySymbol('Minus', '_'), new KeySymbol('Minus', '-')),
    new Key(new KeySymbol('Equal', '+'), new KeySymbol('Equal', '=')),
    new Key(new KeySymbol('Backspace', 'Backspace', 'Back Space'))
];
const tab = [
    new Key(new KeySymbol('Tab')),
    new Key(new KeySymbol('KeyQ', 'Q')),
    new Key(new KeySymbol('KeyW', 'W')),
    new Key(new KeySymbol('KeyE', 'E')),
    new Key(new KeySymbol('KeyR', 'R')),
    new Key(new KeySymbol('KeyT', 'T')),
    new Key(new KeySymbol('KeyY', 'Y')),
    new Key(new KeySymbol('KeyU', 'U')),
    new Key(new KeySymbol('KeyI', 'I')),
    new Key(new KeySymbol('KeyO', 'O')),
    new Key(new KeySymbol('KeyP', 'P')),
    new Key(new KeySymbol('BracketLeft', '{'), new KeySymbol('BracketLeft', '[')),
    new Key(new KeySymbol('BracketRight', '}'), new KeySymbol('BracketRight', ']')),
    new Key(new KeySymbol('Backslash', '|'), new KeySymbol('Backslash', '\\'))
];
const capsLock = [
    new Key(new KeySymbol('CapsLock', 'CapsLock', 'Caps Lock')),
    new Key(new KeySymbol('KeyA', 'A')),
    new Key(new KeySymbol('KeyS', 'S')),
    new Key(new KeySymbol('KeyD', 'D')),
    new Key(new KeySymbol('KeyF', 'F')),
    new Key(new KeySymbol('KeyG', 'G')),
    new Key(new KeySymbol('KeyH', 'H')),
    new Key(new KeySymbol('KeyJ', 'J')),
    new Key(new KeySymbol('KeyK', 'K')),
    new Key(new KeySymbol('KeyL', 'L')),
    new Key(new KeySymbol('Semicolon', ':'), new KeySymbol('Semicolon', ';')),
    new Key(new KeySymbol('Quote', '"'), new KeySymbol('Quote', '\'')),
    new Key(new KeySymbol('Enter', 'Enter'))
];
const shift = [
    new Key(new KeySymbol('ShiftLeft', 'Shift', 'Left Shift')),
    new Key(new KeySymbol('KeyZ', 'Z')),
    new Key(new KeySymbol('KeyX', 'X')),
    new Key(new KeySymbol('KeyC', 'C')),
    new Key(new KeySymbol('KeyV', 'V')),
    new Key(new KeySymbol('KeyB', 'B')),
    new Key(new KeySymbol('KeyN', 'N')),
    new Key(new KeySymbol('KeyM', 'M')),
    new Key(new KeySymbol('Comma', '<'), new KeySymbol('Comma', ',')),
    new Key(new KeySymbol('Period', '>'), new KeySymbol('Period', '.')),
    new Key(new KeySymbol('Slash', '?'), new KeySymbol('Slash', '/')),
    new Key(new KeySymbol('ShiftRight', 'Shift', 'Right Shift'))
];
const control = [
    new Key(new KeySymbol('ControlLeft', 'Control', 'Left Ctrl')),
    new Key(new KeySymbol('MetaLeft', 'Meta', 'Windows')),
    new Key(new KeySymbol('AltLeft', 'Alt', 'Left Alt')),
    new Key(new KeySymbol('Space', 'Space')),
    new Key(new KeySymbol('AltRight', 'Alt', 'Right Alt')),
    new Key(new KeySymbol('MetaRight', 'Meta', 'Windows')),
    new Key(new KeySymbol('ContextMenu', 'ContextMenu', 'Context')),
    new Key(new KeySymbol('ControlRight', 'Control', 'Right Ctrl')),
];
exports.QwertyKeyboard = [
    esc,
    backQuote,
    tab,
    capsLock,
    shift,
    control
];

},{}],3:[function(require,module,exports){
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

},{"./keyboard-layout":2}]},{},[1]);
