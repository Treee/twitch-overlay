import { QwertyKeyboard, Key, KeySymbol } from './keyboard-layout';

export class KeyboardWidget {
    keys: any = [];

    toggle: boolean = true;

    constructor() {
        const htmlElement = document.getElementById('keyboard-container');
        if (htmlElement) {
            // htmlElement.addEventListener('click', this.onUserClick.bind(this));
            // htmlElement.addEventListener('keydown', this.onUserKeyPress.bind(this));
            // htmlElement.addEventListener('keyup', this.onUserKeyPress.bind(this));

            QwertyKeyboard.forEach((row: Key[]) => {
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
        document.getElementById('keyboard-container')?.dispatchEvent(event);

        setTimeout(() => {
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
            document.getElementById('keyboard-container')?.dispatchEvent(event);
        }, 100);
    }

    getRandomCharacter() {
        return String.fromCharCode(this.randomNumberBetween(97, 122));
    }

    randomNumberBetween(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // onUserKeyPress(event: any) {
    //     const key = `${event.code.toLowerCase()}-${event.key.toLowerCase()}`;
    //     const id = this.transformKeyIntoId(key);
    //     this.keys[id] = event.type; // keydown, keyup
    //     event.preventDefault();
    // }

    handleInput(keysMap: { key: string, isPressed: boolean }[]) {
        keysMap.forEach((keyMap: { key: string, isPressed: boolean }) => {
            const id = this.transformKeyIntoId(keyMap.key);
            if (keyMap.isPressed) {
                document.getElementById(id)?.classList.add('active-key');
            } else {
                document.getElementById(id)?.classList.remove('active-key');
            }
        });
    }

    transformKeyIntoId(key: string) {
        let id = `${key.toLowerCase()}`.trim();
        if (id === 'space-') {
            id = 'space-space';
        } else if (/\d/.test(id)) {
            id = `digit${id}-${id}`;
        } else if (/[a-z]/.test(id)) {
            id = `key${id}-${id}`;
        }
        return id;
    }

    createKeyboardKey(key: Key): HTMLElement {
        const keyParent = document.createElement('div');
        keyParent.id = key.getId();
        keyParent.classList.add('normal-key');

        key.symbols.forEach((keySymbol) => {
            keyParent.appendChild(this.createKeySymbol(keySymbol));
        });

        return keyParent;
    }

    createKeySymbol(keySymbol: KeySymbol): HTMLElement {
        const newKey = document.createElement('div');

        newKey.id = keySymbol.getId();
        newKey.classList.add('key-symbol');
        newKey.innerText = keySymbol.displayText;
        return newKey;
    }

    createRow(containerIdToAppend: string, listOfKeys: Key[]): void {
        listOfKeys.forEach((key: Key) => {
            document.getElementById(containerIdToAppend)?.appendChild(this.createKeyboardKey(key));
        });
        this.addNewLine(containerIdToAppend);
    }

    private addNewLine(containerIdToAppend: string): void {
        document.getElementById(containerIdToAppend)?.appendChild(document.createElement('br'));
    }

    // c++ keyboard listener without interrupting flow
    // https://stackoverflow.com/questions/7798242/keyboard-mouse-input-in-c

    // compile c++ to js package
    // https://nodejs.org/api/addons.html#addons_addon_examples
}