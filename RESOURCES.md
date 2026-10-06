# Matrices (grids → graphics) Resources

## Knowledge

- [javascript.info — Arrays (Multidimensional arrays section)](https://javascript.info/array#multidimensional-arrays)
  Clear, modern JS tutorial. Use for: array basics, `for..of`, `length`, arrays of arrays.
- [MDN — Array: Creating a two-dimensional array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#creating_a_two-dimensional_array)
  The canonical JS reference; chess-board example of `board[row][col]`. Use for: any Array method lookup.
- [MDN — Array.prototype.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
  Shows building a matrix with a loop + `fill`, and warns that `fill` with an object/array shares one reference. Use for: creating grids of any size.
- [Microsoft Learn — C# arrays (multidimensional & jagged)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays#jagged-arrays)
  Bridge from the user's C# background: `int[,]` vs `int[][]`. JS arrays-of-arrays behave like C# jagged arrays.
- [Book: _Eloquent JavaScript_ by Marijn Haverbeke (free online)](https://eloquentjavascript.net/)
  Respected free JS book. Chapter 18 has a Conway's Game of Life exercise. Use for: JS fundamentals, Game of Life milestone.
- [Wikipedia — Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
  Rules, history, and named patterns (glider, blinker). Use for: Game of Life milestone.
- [Red Blob Games — Introduction to A* (covers breadth-first search on grids)](https://www.redblobgames.com/pathfinding/a-star/introduction.html)
  Best-in-class interactive explanation of BFS / Dijkstra / A*. Use for: maze solving, flood fill (Minesweeper reveal).
- [Red Blob Games — Grid parts and relationships](https://www.redblobgames.com/grids/parts/)
  Neighbours, edges, coordinates on grids. Use for: neighbour-counting lessons.
- [Jamis Buck — Maze algorithms (interactive demos)](https://www.jamisbuck.org/mazes/)
  Author of _Mazes for Programmers_. Use for: maze generation milestone (recursive backtracker etc.).

## Wisdom (Communities)

- [r/learnjavascript](https://www.reddit.com/r/learnjavascript/)
  Beginner-friendly JS help. Use for: "why does my code do this?" questions, code review of finished games.
- [ConwayLife.com forums](https://conwaylife.com/forums/)
  Long-running Game of Life enthusiast community. Use for: sharing patterns once Life is built.

## Gaps

- Image-manipulation-in-browser (canvas `ImageData`) and rotation-matrix sources: find when we reach those milestones.
