export enum KeyState {
  Pressed,
  Released
}

type KeydownEventHandler = (state: KeyState) => void;
type KeyboardCode =
  | 'Space'
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

  private handleEvent = (event: WindowEventMap['keydown']): void => {
    if (!this.keyMap.has(event.code)) {
      return
    }

    event.preventDefault();

    const state = event.type === 'keydown' ? KeyState.Pressed : KeyState.Released;

    if (this.keyStates.get(event.code) === state) {
      return;
    }

    this.keyStates.set(event.code, state);
    this.keyMap.get(event.code)(state);
  }
}
