function handleSubmit() {
  const input_text = document.querySelector(".input-form").value;
  const selected_lan = document.querySelector(
    'input[name="language"]:checked'
  ).value;
  return { input_text, selected_lan };
}

async function goToPage() {
  const { input_text, selected_lan } = handleSubmit();
  const text = await transleted(input_text, selected_lan);
  localStorage.setItem("originalText", input_text);
  localStorage.setItem("text", text);
  window.location.href = "Results_view.html";
}

window.addEventListener("DOMContentLoaded", () => {
  const originalBox = document.querySelector(".input-form");
  const outputBox = document.getElementById("input-form-2");

  if (originalBox && outputBox) {
    originalBox.value = localStorage.getItem("originalText") || "";
    outputBox.value = localStorage.getItem("text") || "";
  }
});

async function transleted(input_text, selected_lan) {
  const messages = [
    {
      role: "system",
      content:
        "You are an expert multilingual translator specializing in French, Spanish, and Japanese. When the user provides text and specifies a target language",
    },
    {
      role: "user",
      content: `${input_text} -> ${selected_lan}`,
    },
  ];

  return response.choices[0].message.content;
}

window.goToPage = goToPage;
