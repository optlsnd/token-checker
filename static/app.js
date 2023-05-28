const checkBtn = document.getElementById("check");
const userIdInput = document.getElementById("user");
const result = document.getElementById("result");
const url = new URL(window.location.href);
const token = url.searchParams.get("token");

if (!token) {
  showResult("No token found 🤷🏽‍♂️");
  userIdInput.disabled = true;
  checkBtn.disabled = true;
}

function showResult(message) {
  result.innerText = "Result: " + message;
}

function checkToken() {
  const data = {
    user: userIdInput.value,
    token: token,
  };
  fetch("/check", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => {
      userIdInput.value = "";
      if (json.result) {
        showResult("Token valid ✅");
      } else {
        showResult("Token invalid ⛔️");
      }
    });
}

checkBtn.addEventListener("click", checkToken);
userIdInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13 && e.target.value.length) {
    checkToken();
  } else {
    if (e.target.value.length) {
      checkBtn.disabled = false;
    } else {
      checkBtn.disabled = true;
    }
  }
});
