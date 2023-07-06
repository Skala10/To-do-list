export function setColorScheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    document.body.classList.add(savedTheme)
    themeToggleButton.classList.add(savedTheme)
  } else {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isLightMode = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches
    const isNotSpecified = window.matchMedia(
      "(prefers-color-scheme: no-preference)"
    ).matches
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified

    if (isDarkMode) {
      document.body.classList.add("dark-theme")
      themeToggleButton.classList.add("dark-theme")
      localStorage.setItem("theme", "dark-theme")
    } else if (isLightMode) {
      document.body.classList.add("light-theme")
      themeToggleButton.classList.add("light-theme")
      localStorage.setItem("theme", "light-theme")
    } else if (isNotSpecified || hasNoSupport) {
      console.log(
        "The user has not specified a preferred color scheme or the browser does not support the `prefers-color-scheme` media query."
      )
    }
  }
}

function toggleColorScheme() {
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme")
    document.body.classList.add("light-theme")
    themeToggleButton.classList.remove("dark-theme")
    themeToggleButton.classList.add("light-theme")
    localStorage.setItem("theme", "light-theme")
  } else {
    document.body.classList.remove("light-theme")
    document.body.classList.add("dark-theme")
    themeToggleButton.classList.remove("light-theme")
    themeToggleButton.classList.add("dark-theme")
    localStorage.setItem("theme", "dark-theme")
  }
}

const themeToggleButton = document.querySelector(".toggle-theme-button")
setColorScheme()
themeToggleButton.addEventListener("click", toggleColorScheme)
