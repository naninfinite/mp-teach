/*
 * Quiz: turns plain markup into a multiple-choice question with instant feedback.
 *
 *   <div class="panel quiz">
 *     <p>Question?</p>
 *     <ol><li>wrong</li><li data-correct>right</li></ol>
 *     <p class="explain">Shown after the right answer is picked.</p>
 *   </div>
 *
 * Every .quiz on the page is enhanced automatically.
 */
(function () {
  function enhance(quiz) {
    const explain = quiz.querySelector(".explain");
    if (explain) explain.hidden = true;
    const items = quiz.querySelectorAll("ol > li");
    let firstTry = true;
    items.forEach((li) => {
      li.setAttribute("role", "button");
      li.tabIndex = 0;
      const choose = () => {
        if (quiz.dataset.done) return;
        if (li.hasAttribute("data-correct")) {
          li.classList.add("right");
          quiz.dataset.done = firstTry ? "first-try" : "yes";
          if (explain) {
            explain.hidden = false;
            explain.insertAdjacentHTML("afterbegin", firstTry ? "<strong>Right.</strong> " : "<strong>Got there.</strong> ");
          }
        } else {
          li.classList.add("wrong");
          firstTry = false;
        }
      };
      li.addEventListener("click", choose);
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); }
      });
    });
  }
  document.addEventListener("DOMContentLoaded", () => document.querySelectorAll(".quiz").forEach(enhance));
})();
