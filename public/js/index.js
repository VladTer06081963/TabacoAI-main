function submitForm(e) {
  e.preventDefault();
  getData();
}
async function getData() {
  let userData = document.getElementById("input").value.trim();
  if (userData === "") return false;

  document.getElementById("messages").innerHTML =
    `<div class="mess-user">
      <h3>Ваш запрос принят...</h3> 
      <div class="loader"></div>
      <p>${userData}</p>
    </div>` + document.getElementById("messages").innerHTML;

  document.getElementById("input").value = "";
  const loader = document.querySelector(".mess-user .loader");
  loader.style.display = "block";

  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: userData }),
    });
    if (!response.ok) {
      throw new Error("Произошла ошибка при получении данных с сервера");
    }
    const data = await response.json();

    loader.style.display = "none";
    document.getElementById("messages").innerHTML =
      `<div class="mess-chat">
        <p>${data}</p>
      </div>` + document.getElementById("messages").innerHTML;
  } catch (error) {
    console.error("Error:", error);
    loader.style.display = "none";
    document.getElementById("messages").innerHTML =
      `<div class="mess-chat error">
        <p>Ошибка: Не удалось получить ответ. Пожалуйста, попробуйте позже.</p>
      </div>` + document.getElementById("messages").innerHTML;
  }
}
// Возможно, вам также понадобится обработчик событий для формы, если он не объявлен в HTML:
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", submitForm);
});
