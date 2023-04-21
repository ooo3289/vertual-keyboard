export class Keyboard {
    #switchEl;
    #fontSelectEl;
    #containerEl;

    constructor() {
        this.#assignElement();
        this.#addEvent();
    }

    #assignElement() {
        this.#containerEl = document.getElementById("container");
        this.#switchEl = this.#containerEl.querySelector("#switch");
        this.#fontSelectEl = this.#containerEl.querySelector("#font");
    }

    #addEvent() {
        this.#switchEl.addEventListener("change", this.#onChangeTheme);
        this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    }

    #onChangeTheme(event) {
        document.documentElement.setAttribute(
            "theme",
            event.target.checked ? "dark-mode" : ""
        );
    }

    #onChangeFont(event) {
        document.body.style.fontFamily = event.target.value;
    }
}
