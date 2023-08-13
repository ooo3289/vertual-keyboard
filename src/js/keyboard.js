export class Keyboard {
    #switchEl;
    #fontSelectEl;
    #containerEl;
    #keyboardEl;
    #inputGroupEl;
    #inputEl;

    constructor() {
        this.#assignElement();
        this.#addEvent();
    }

    #assignElement() {
        this.#containerEl = document.getElementById("container");
        this.#switchEl = this.#containerEl.querySelector("#switch");
        this.#fontSelectEl = this.#containerEl.querySelector("#font");
        this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
        this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
        this.#inputEl = this.#inputGroupEl.querySelector("#input");
    }

    #addEvent() {
        this.#switchEl.addEventListener("change", this.#onChangeTheme);
        this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
        document.addEventListener("keydown", this.#onKeyDown.bind(this))
        document.addEventListener("keyup", this.#onKeyUp.bind(this))
        this.#inputEl.addEventListener("input", this.#onInput)
    }

    #onInput(event) {
        event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
    }

    #onKeyDown(event) {
        this.#inputGroupEl.classList.toggle("error", /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key));
        this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.add("active");
    }

    #onKeyUp(event) {
        this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.remove("active");
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
