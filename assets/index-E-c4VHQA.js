const STORAGE_KEY = "orange-marquee-message";
const DEFAULT_MESSAGE = "歡迎使用橘色背景跑馬燈";

const app = document.querySelector("#app");

if (app) {
  const savedMessage = window.localStorage.getItem(STORAGE_KEY);
  const initialMessage = (savedMessage && savedMessage.trim()) || DEFAULT_MESSAGE;

  app.innerHTML = `
    <main class="page">
      <section class="panel">
        <p class="eyebrow">Orange Marquee</p>
        <h1>橘色背景跑馬燈</h1>
        <p class="description">輸入時會同步預覽，按 Enter 後就會隱藏輸入框並全螢幕播放。</p>
        <label class="input-label" for="marquee-input">跑馬燈文字</label>
        <input id="marquee-input" class="text-input" type="text" maxlength="120" placeholder="請輸入跑馬燈文字" />
        <p class="hint">最多 120 個字，內容會保存在目前瀏覽器。按 Esc 可返回編輯。</p>
      </section>

      <section class="marquee-shell" aria-label="跑馬燈預覽">
        <div class="marquee-track">
          <span class="marquee-text"></span>
          <span class="marquee-text" aria-hidden="true"></span>
        </div>
      </section>
    </main>
  `;

  const input = document.querySelector("#marquee-input");
  const page = document.querySelector(".page");
  const panel = document.querySelector(".panel");
  const marqueeShell = document.querySelector(".marquee-shell");
  const marqueeTexts = document.querySelectorAll(".marquee-text");
  let isDisplayMode = false;

  const updateMessage = (value) => {
    const nextMessage = value.trim() || DEFAULT_MESSAGE;
    marqueeTexts.forEach((node) => {
      node.textContent = nextMessage;
    });
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMessage);
    } catch (error) {
      console.warn("Unable to save marquee message.", error);
    }
  };

  const focusInput = () => {
    input.focus();
    input.select();
  };

  const handleEscape = (event) => {
    if (event.key !== "Escape") {
      return;
    }
    event.preventDefault();
    exitDisplayMode();
  };

  const setDisplayMode = (nextState) => {
    if (isDisplayMode === nextState) {
      return;
    }
    isDisplayMode = nextState;
    document.body.classList.toggle("is-display-mode", nextState);
    page.classList.toggle("is-display-mode", nextState);
    panel.hidden = nextState;
    if (nextState) {
      document.addEventListener("keydown", handleEscape);
      return;
    }
    document.removeEventListener("keydown", handleEscape);
  };

  const enterDisplayMode = async () => {
    updateMessage(input.value);
    setDisplayMode(true);
    input.blur();
    if (document.fullscreenElement) {
      return;
    }
    try {
      await document.documentElement.requestFullscreen();
    } catch (error) {
      console.warn("Unable to enter fullscreen mode.", error);
    }
  };

  const exitDisplayMode = async () => {
    setDisplayMode(false);
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.warn("Unable to exit fullscreen mode.", error);
      }
    }
    focusInput();
  };

  input.value = initialMessage;
  updateMessage(initialMessage);
  input.addEventListener("input", (event) => {
    updateMessage(event.target.value);
  });
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    enterDisplayMode();
  });
  marqueeShell.addEventListener("dblclick", () => {
    if (isDisplayMode) {
      exitDisplayMode();
    }
  });
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && isDisplayMode) {
      setDisplayMode(false);
      focusInput();
    }
  });
}
