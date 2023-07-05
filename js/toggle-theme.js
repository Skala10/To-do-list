export function toggleTheme() {
  let toggleThemeButton = document.querySelector(".toggle-theme-button")
  let body = document.body
  let button = document.querySelector(".toggle-theme-button")
  toggleThemeButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme")
    button.classList.toggle("dark-theme")
  })
}
