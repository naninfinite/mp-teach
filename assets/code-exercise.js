/*
 * CodeExercise: an in-page JS editor that runs the learner's function against tests.
 *
 *   CodeExercise.mount("#ex-id", {
 *     fn: "countMarks",                       // name of the function the learner writes
 *     starter: "function countMarks(board, mark) {\n  \n}",
 *     tests: [
 *       { label: "...", args: [board, "X"], expect: 3 },
 *       { label: "...", args: [board], check: (result, args) => true, expectText: "..." },
 *     ],
 *     hint: "HTML string",                    // optional, revealed on request
 *     solution: "function countMarks(...) {...}",  // revealed after the first run
 *   });
 *
 * Args are deep-copied for every test, so a function that mutates its input can't
 * break later tests. console.log output is captured and shown under the results.
 * The learner's code is saved in localStorage (when available) under the element id.
 */
(function () {
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
    del(k) { try { localStorage.removeItem(k); } catch {} },
  };

  function show(v) {
    if (Array.isArray(v) && v.length && v.every(Array.isArray)) {
      return "[\n" + v.map((row) => "  " + JSON.stringify(row)).join(",\n") + "\n]";
    }
    if (v === undefined) return "undefined";
    if (typeof v === "function") return "a function";
    return JSON.stringify(v);
  }
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const copy = (v) => (typeof structuredClone === "function" ? structuredClone(v) : JSON.parse(JSON.stringify(v)));
  const esc = (s) => String(s).replace(/[&<>]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[ch]);

  const mounted = [];

  function mount(selector, cfg) {
    const el = typeof selector === "string" ? document.querySelector(selector) : selector;
    const key = "mp-teach:" + location.pathname.split("/").pop() + ":" + el.id;
    mounted.push({ fn: cfg.fn, code: () => ta.value });
    el.classList.add("exercise");

    const ta = document.createElement("textarea");
    ta.spellcheck = false;
    ta.setAttribute("aria-label", "Code editor");
    ta.value = store.get(key) ?? cfg.starter;

    const row = document.createElement("div");
    row.className = "btn-row";
    const run = button("Run tests");
    const reset = button("Reset", true);
    const hintBtn = cfg.hint ? button("Hint", true) : null;
    const solBtn = button("Show solution", true);
    solBtn.hidden = true;
    row.append(run, ...(hintBtn ? [hintBtn] : []), solBtn, reset);

    const hint = document.createElement("div");
    hint.className = "aside";
    hint.hidden = true;
    if (cfg.hint) hint.innerHTML = cfg.hint;

    const out = document.createElement("div");
    out.className = "ex-output";
    out.setAttribute("aria-live", "polite");

    const sol = document.createElement("div");
    sol.className = "ex-solution";
    sol.hidden = true;
    sol.innerHTML = "<pre><code>" + esc(cfg.solution || "") + "</code></pre>";

    el.append(ta, row, hint, out, sol);

    ta.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        const s = ta.selectionStart;
        ta.setRangeText("  ", s, ta.selectionEnd, "end");
      } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        runTests();
      }
    });
    ta.addEventListener("input", () => store.set(key, ta.value));
    run.addEventListener("click", runTests);
    reset.addEventListener("click", () => {
      ta.value = cfg.starter; store.del(key); out.innerHTML = "";
    });
    if (hintBtn) hintBtn.addEventListener("click", () => { hint.hidden = !hint.hidden; });
    solBtn.addEventListener("click", () => {
      sol.hidden = !sol.hidden;
      solBtn.textContent = sol.hidden ? "Show solution" : "Hide solution";
    });

    function runTests() {
      out.innerHTML = "";
      if (cfg.solution) solBtn.hidden = false;
      const logs = [];
      const fakeConsole = { log: (...a) => logs.push(a.map((x) => (typeof x === "string" ? x : show(x))).join(" ")) };
      let fn;
      try {
        fn = new Function("console", `"use strict";\n${ta.value}\n;return typeof ${cfg.fn} === "function" ? ${cfg.fn} : undefined;`)(fakeConsole);
      } catch (err) {
        line("fail", `Your code didn't run: ${err.name}: ${err.message}`);
        return;
      }
      if (!fn) {
        line("fail", `I couldn't find a function called ${cfg.fn}. Did the name change?`);
        return;
      }
      let passed = 0;
      for (const t of cfg.tests) {
        const args = copy(t.args);
        let result, ok, msg;
        try {
          result = fn(...args);
          ok = t.check ? t.check(result, args) === true : same(result, t.expect);
          const want = t.expectText ?? show(t.expect);
          msg = ok ? `✓ ${t.label}` : `✗ ${t.label}\n  expected: ${want}\n  got:      ${show(result)}`;
        } catch (err) {
          ok = false;
          msg = `✗ ${t.label}\n  threw ${err.name}: ${err.message}`;
        }
        if (ok) passed++;
        line(ok ? "pass" : "fail", msg);
      }
      const summary = document.createElement("p");
      summary.className = "ex-summary";
      summary.textContent = passed === cfg.tests.length
        ? `All ${passed} tests pass.`
        : `${passed} of ${cfg.tests.length} tests pass. Read the first ✗ and try again.`;
      out.prepend(summary);
      if (logs.length) {
        const log = document.createElement("div");
        log.className = "ex-log";
        log.textContent = "console.log:\n" + logs.join("\n");
        out.append(log);
      }
    }

    function line(cls, text) {
      const d = document.createElement("div");
      d.className = "ex-result " + cls;
      d.textContent = text;
      out.append(d);
    }
  }

  function button(text, secondary) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = text;
    if (secondary) b.className = "secondary";
    return b;
  }

  /* "Download my answers" button: saves every exercise on the page as one .js file
   * (e.g. lesson-0001-your-first-grid.js) to drop into the repo's answers/ folder. */
  function downloadButton(el) {
    const b = button("Download my answers");
    b.addEventListener("click", () => {
      const page = location.pathname.split("/").pop().replace(/\.html$/, "");
      const body = mounted.map((m) => `// ${m.fn}\n${m.code().trim()}\n`).join("\n");
      const text = `// Answers for ${page}, saved ${new Date().toISOString().slice(0, 10)}\n\n${body}`;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([text], { type: "text/javascript" }));
      a.download = `lesson-${page}.js`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
    (typeof el === "string" ? document.querySelector(el) : el).append(b);
  }

  window.CodeExercise = { mount, downloadButton };
})();
