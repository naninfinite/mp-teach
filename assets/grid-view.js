/*
 * GridView: draws a 2D array as a table with row/column index labels.
 *
 *   const view = GridView.render(el, grid, { onCellClick(row, col, td) {}, small: false });
 *   view.mark(row, col, "hl" | "ok" | "no");   view.clear();
 *
 * GridDrill: "click board[r][c]" practice loop on top of a GridView.
 *
 *   GridDrill.mount(el, grid, { rounds: 6 });
 */
(function () {
  function render(el, grid, opts = {}) {
    el.innerHTML = "";
    const table = document.createElement("table");
    table.className = "gridview" + (opts.small ? " small" : "") + (opts.onCellClick ? " clickable" : "");
    const head = table.insertRow();
    head.appendChild(document.createElement("th"));
    for (let c = 0; c < grid[0].length; c++) {
      const th = document.createElement("th");
      th.textContent = "col " + c;
      head.appendChild(th);
    }
    const cells = [];
    for (let r = 0; r < grid.length; r++) {
      const tr = table.insertRow();
      const th = document.createElement("th");
      th.textContent = "row " + r;
      tr.appendChild(th);
      cells.push([]);
      for (let c = 0; c < grid[r].length; c++) {
        const td = tr.insertCell();
        td.textContent = grid[r][c];
        td.setAttribute("aria-label", `row ${r}, column ${c}: ${grid[r][c] || "empty"}`);
        if (opts.onCellClick) {
          td.tabIndex = 0;
          td.addEventListener("click", () => opts.onCellClick(r, c, td));
          td.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); opts.onCellClick(r, c, td); }
          });
        }
        cells[r].push(td);
      }
    }
    el.appendChild(table);
    return {
      table,
      mark(r, c, cls) { cells[r][c].classList.add(cls); },
      clear() { cells.flat().forEach((td) => td.classList.remove("hl", "ok", "no")); },
    };
  }

  function mount(el, grid, opts = {}) {
    const rounds = opts.rounds || 6;
    el.innerHTML = "";
    const prompt = document.createElement("p");
    const holder = document.createElement("div");
    const caption = document.createElement("p");
    caption.className = "grid-caption";
    const again = document.createElement("button");
    again.textContent = "Go again";
    again.hidden = true;
    el.append(prompt, holder, caption, again);

    let target, round, score, locked;
    const view = render(holder, grid, { onCellClick: answer, small: opts.small });

    function next() {
      view.clear();
      locked = false;
      if (round === rounds) {
        prompt.innerHTML = `Done: <strong>${score} / ${rounds}</strong> first-try correct.`;
        caption.textContent = score === rounds ? "Clean sweep." : "Go again until it's automatic.";
        again.hidden = false;
        return;
      }
      let r, c;
      do {
        r = Math.floor(Math.random() * grid.length);
        c = Math.floor(Math.random() * grid[0].length);
      } while (target && target[0] === r && target[1] === c);
      target = [r, c];
      round++;
      prompt.innerHTML = `Round ${round} of ${rounds}: click <code>board[${r}][${c}]</code>`;
      caption.textContent = "";
    }

    let missed = false;
    function answer(r, c) {
      if (locked || !target) return;
      if (r === target[0] && c === target[1]) {
        view.mark(r, c, "ok");
        if (!missed) score++;
        missed = false;
        locked = true;
        caption.textContent = `Yes: row ${r}, then column ${c}.`;
        setTimeout(next, 700);
      } else {
        view.mark(r, c, "no");
        missed = true;
        caption.textContent = `That's board[${r}][${c}]: row ${r}, column ${c}. Try again.`;
      }
    }

    function start() { round = 0; score = 0; target = null; missed = false; again.hidden = true; next(); }
    again.addEventListener("click", start);
    start();
  }

  window.GridView = { render };
  window.GridDrill = { mount };
})();
