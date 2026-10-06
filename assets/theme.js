/* Light/dark toggle button, remembered per browser. Include on every page. */
(function () {
  const root = document.documentElement;
  try { const t = localStorage.getItem("mp-teach:theme"); if (t) root.dataset.theme = t; } catch {}
  document.addEventListener("DOMContentLoaded", () => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "secondary theme-toggle";
    const isDark = () => root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    const label = () => { b.textContent = isDark() ? "light" : "dark"; };
    b.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      try { localStorage.setItem("mp-teach:theme", root.dataset.theme); } catch {}
      label();
    });
    label();
    document.body.append(b);
  });
})();
