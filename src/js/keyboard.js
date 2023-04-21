export class Keyboard {
    #switchEl;
    #fontSelectEl;

    constructor() {
        this.#assignElement();
        this.#addEvent();
    }

    #assignElement() {
        this.#switchEl = document.getElementById("switch");
        this.#fontSelectEl = document.getElementById("font");
    }

    #addEvent() {
        this.#switchEl.addEventListener("change", (event) => {
            // 스위치 누르면 true, 아니면 false 나오는지 확인
            // console.log(event.target.checked);
            document.documentElement.setAttribute(
                "theme",
                event.target.checked ? "dark-mode" : ""
            );
        });
        this.#fontSelectEl.addEventListener("change", (event) => {
            // 선택한 밸류 값들이 잘 찍히고 있는지 확인
            // console.log(event.target.value);
            document.body.style.fontFamily = event.target.value;
        });
    }
}
