
function toggleTheme() {
  let toggleThemeButton = document.querySelector(".toggle-theme")
  toggleThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")
  })
}
