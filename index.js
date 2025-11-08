function handleSubmit() {
  const input_text = document.querySelector(".input-form").value;
  const selected_lan = document.querySelector(
    'input[name="language"]:checked'
  ).value;
  return { input_text, selected_lan };
}

const loadingArea = document.querySelector(".loading-panel");

window.addEventListener("DOMContentLoaded", () => {
  const originalBox = document.querySelector(".input-form");
  const outputBox = document.getElementById("input-form-2");

  if (originalBox && outputBox) {
    originalBox.value = localStorage.getItem("originalText") || "";
    outputBox.value = localStorage.getItem("text") || "";
  }
});

document.querySelector(".btn").addEventListener("click", function () {
  const { input_text, selected_lan } = handleSubmit();
  transleted(input_text, selected_lan)
    .then((text) => {
      localStorage.setItem("originalText", input_text);
      localStorage.setItem("text", text);
      window.location.href = "Results_view.html";
    })
    .catch((err) => {
      console.error("Translation error:", err);
    });
});

async function transleted(input_text, selected_lan) {
  let resultText = "Translation failed";
  try {
    const url = "https://openai-worker.openai-ibro.workers.dev/";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        content: `${input_text} -> ${selected_lan}`,
      }),
    });
    const result = await response.json();
    console.log("API result:", result);

    if (!response.ok) {
      throw new Error(`Worker Error: ${data.error}`);
    }
    resultText = result;
  } catch (e) {
    console.error("Translation error:", e.message);
  }

  return resultText;
}
