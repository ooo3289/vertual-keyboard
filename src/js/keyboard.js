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
        this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown)
        // 키보다 밖에서 마우스를 뗄 수도 있고 다양한 변수가 있기 때문에 document에 걸었음
        document.addEventListener("mouseup", this.#onMouseUp.bind(this))
    }

    #onMouseUp(event) {
        const keyEl = event.target.closest("div.key");
        // !! 느낌표 두개를 붙여줘서 확실하게 boolean 값이 출력될 수 있도록 처리
        const isActive = !!keyEl?.classList.contains("active")
        // data-set 속성 값을 가져와 저장
        const val = keyEl?.dataset.val;
        if (isActive && !!val && val !== "Space" && val !== "Backspace") {
            this.#inputEl.value += val;
        }
        if (isActive && val === "Space") {
            this.#inputEl.value += " ";
        }
        if (isActive && val === "Backspace") {
            this.#inputEl.value = this.#inputEl.value.slice(0, -1);
        }
        // 안에서 this를 썼다면 위 addeventlistener에서 bind(this) 필수
        this.#keyboardEl.querySelector(".active")?.classList.remove("active");
    }

    #onMouseDown(event) {
        event.target.closest("div.key")?.classList.add("active");
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
