export class KeySymbol {
    key: string;
    code: string;
    displayText: string;
    constructor(code: string, key?: string, displayText?: string) {
        this.code = code;
        this.key = key || code;
        this.displayText = displayText || key || code;
    }

    getId(): string {
        return `${this.code}-${this.key}`.toLowerCase();
    }
}

export class Key {

    symbols: KeySymbol[] = [];

    constructor(symbol1?: KeySymbol, symbol2?: KeySymbol) {
        if (symbol1) {
            this.symbols.push(symbol1);
        }
        if (symbol2) {
            this.symbols.push(symbol2);
        }
    }

    isPressed(code: string, eventType: string) {
        let pressed = false;
        this.symbols.forEach((symbol: KeySymbol) => {
            if (symbol.code === code) {
                pressed = eventType === 'keydown';
            }
        });
        return pressed;
    }

    getId(): string {
        let id = '';
        this.symbols.forEach((symbol) => {
            id = id.concat(symbol.getId()).concat('-');
        });
        id = id.slice(0, -1);
        return id.toLowerCase();
    }
}

const esc: Key[] = [
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

const backQuote: Key[] = [
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

const tab: Key[] = [
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

const capsLock: Key[] = [
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

const shift: Key[] = [
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

const control: Key[] = [
    new Key(new KeySymbol('ControlLeft', 'Control', 'Left Ctrl')),
    new Key(new KeySymbol('MetaLeft', 'Meta', 'Windows')),
    new Key(new KeySymbol('AltLeft', 'Alt', 'Left Alt')),
    new Key(new KeySymbol('Space', 'Space')),
    new Key(new KeySymbol('AltRight', 'Alt', 'Right Alt')),
    new Key(new KeySymbol('MetaRight', 'Meta', 'Windows')),
    new Key(new KeySymbol('ContextMenu', 'ContextMenu', 'Context')),
    new Key(new KeySymbol('ControlRight', 'Control', 'Right Ctrl')),
];

export const QwertyKeyboard: Key[][] = [
    esc,
    backQuote,
    tab,
    capsLock,
    shift,
    control
];