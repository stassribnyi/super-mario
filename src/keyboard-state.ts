export enum KeyState {
  Pressed,
  Released
}

type KeydownEventHandler = (state: KeyState) => void;
type KeyboardCode =
  | 'Space'
  | 'ShiftLeft'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight';

export default class KeyboardState {
  /**
   * holds the current state of a given key
   */
  private readonly keyStates = new Map<KeyboardEvent['key'], KeyState>();

  /**
   * holds the callback function of a given key
   */
  private readonly keyMap = new Map<KeyboardEvent['key'], KeydownEventHandler>();

  constructor() { }

  addMapping(code: KeyboardCode, callback: KeydownEventHandler): void {
    this.keyMap.set(code, callback)
  }

  listenTo(element: EventTarget) {
    ['keyup', 'keydown']
      .forEach(eventName =>
        element.addEventListener(eventName, this.handleEvent));
  }

  repeatIfPressed(codes: string | Array<string>): void {
    if (!codes.length) {
      return;
    }

    const keysToRepeat = this.getKeysByState(KeyState.Pressed).filter(code => codes.includes(code));

    if (!keysToRepeat.length) {
      return;
    }

    keysToRepeat.forEach(code => {
      this.keyMap.get(code)(KeyState.Pressed);
    });
  }

  private handleEvent = (event: WindowEventMap['keydown']): void => {
    if (!this.keyMap.has(event.code)) {
      return;
    }

    event.preventDefault();


    const state = event.type === 'keydown' ? KeyState.Pressed : KeyState.Released;

    if (this.keyStates.get(event.code) === state) {
      return;
    }

    this.keyStates.set(event.code, state);
    this.keyMap.get(event.code)(state);
  }

  private getKeysByState(state: KeyState): Array<string> {
    return Array
      .from(this.keyStates.entries())
      .filter(([, currentState]) => currentState === state)
      .map(([key]) => key);
  }
}
