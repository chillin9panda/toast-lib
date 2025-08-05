const toggleBtn = document.getElementById("theme-toggle");

let isDark = false;

function toggleTheme() {
  isDark = !isDark;
  if (isDark) {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#f0f0f0";
  } else {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
  }
}

toggleBtn.addEventListener("click", toggleTheme);
