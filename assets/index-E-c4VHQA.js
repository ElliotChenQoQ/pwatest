const STORAGE_KEY = "orange-marquee-message";
const DEFAULT_MESSAGE = "歡迎使用橘色背景跑馬燈";

const app = document.querySelector("#app");

if (app) {
  const savedMessage = window.localStorage.getItem(STORAGE_KEY)?.trim();
  const initialMessage = savedMessage || DEFAULT_MESSAGE;

  app.innerHTML = `
    <main class="page">
      <section class="panel">
        <p class="eyebrow">Orange Marquee</p>
        <h1>橘色背景跑馬燈</h1>
        <p class="description">輸入你想顯示的文字，跑馬燈會立即更新。</p>
        <label class="input-label" for="marquee-input">跑馬燈文字</label>
        <input id="marquee-input" class="text-input" type="text" maxlength="120" placeholder="請輸入跑馬燈文字" />
        <p class="hint">最多 120 個字，內容會保存在目前瀏覽器。</p>
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
  const marqueeTexts = Array.from(document.querySelectorAll(".marquee-text"));

  const updateMessage = (value) => {
    const nextMessage = value.trim() || DEFAULT_MESSAGE;
    marqueeTexts.forEach((node) => {
      node.textContent = nextMessage;
    });
    window.localStorage.setItem(STORAGE_KEY, nextMessage);
  };

  input.value = initialMessage;
  updateMessage(initialMessage);
  input.addEventListener("input", (event) => {
    updateMessage(event.target.value);
  });
}
