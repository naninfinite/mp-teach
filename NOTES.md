# Notes

- Learner background: C# (rusty), JS rusty/beginner. Point out JS-vs-C# differences explicitly.
- Format: 10–30 min daily lessons. Reading + hands-on; avoid video unless it's clearly the best source.
- Exercises run in-browser with instant automatic feedback (assets/code-exercise.js).
- Planned arc: tic-tac-toe → Connect Four → Minesweeper → Game of Life → Snake → maze gen/solve → images → rotation matrices.
- Machine: Raspberry Pi. Open lessons with `brave-browser <file>`, not xdg-open (HTML files are associated with a ChatGPT app).
- Glossary: not created yet — add terms only once the learner can use them correctly.

## Later (after this course)
- **TODO: Fragment shaders (relearn).** Learner wants to come back to these. Natural follow-on: the image-grid and rotation-matrix milestones lead straight into it — a fragment shader is a function run once per pixel, and shaders use `mat2`/`mat3`/`mat4` to rotate, scale and move coordinates. Start from The Book of Shaders, ch. 8 "2D Matrices" (https://thebookofshaders.com/08/). Treat as a new mission when we get there: confirm it with the learner first.
