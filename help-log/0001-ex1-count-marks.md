# Lesson 1 · Exercise 1 · `countMarks(board, mark)`

[Lesson](../lessons/0001-your-first-grid.html) · [Grid cheat sheet](../reference/grids.html)

## Step 1: loop over the rows

- **Stuck on:** `SyntaxError: Unexpected token ')'`
- **Cause:** the `for` loop's `{` had no matching `}`. Three opening braces, two closing ones.
- **Lesson learned:** when an error points somewhere strange, check that brackets pair up first. Where you put the `}` decides whether code runs *inside* the loop or *after* it.
- **In my words:**

## Step 2: add the inner loop for columns

- **Stuck on:** inner loop was `col < board.length`
- **Cause:** `board.length` is the number of **rows**. On a square 3×3 board the wrong number happens to be right, so the bug hides. On a 2×4 grid it stops at column 1 and skips columns 2 and 3.
- **Lesson learned:** the number of columns comes from a **row**, not the board. Square test data can hide row/column mix-ups.
- **JS vs C#:** reading past the end of an array in JS gives `undefined`, with no crash. C# would throw `IndexOutOfRangeException`.
- **In my words:**

## Step 2b: asking a row for its length

- **Stuck on:** inner loop was `col < board.length[0]`, and the inner loop never ran
- **Cause:** JS reads left to right. `board.length` is the number `3`, and `3[0]` is `undefined`. `col < undefined` is always `false`, so the loop is skipped with no error.
- **Lesson learned:** each `[ ]` or `.` works on the result of the step before it. To get a row's length, pick the row first, then ask for `.length`.
- **In my words:**

## Step 2c: swapping the loops didn't help

- **Stuck on:** moved `board.length[0]` to the outer loop and `board.length` to the inner one. Now nothing printed at all.
- **Cause:** the problem was the expression `board.length[0]` itself (it's `undefined`), not which loop it was in. The outer loop's `row < board.length` had been right all along.
- **Lesson learned:** when unsure what an expression gives you, `console.log` it on its own and look. `board[1]` is an array (a row), and any array has `.length`.
- **In my words:**

## Step 2d: rows vs columns are two different numbers

- **Stuck on:** "board.length works for 3×3, but how do I step it up for a different board?"
- **Cause:** `board.length` only answers "how many rows?". A 3×3 board hides this, because rows and columns are both 3.
- **Lesson learned:** bookshelf picture. `board` is the bookcase and each row is a shelf. `board.length` is the number of shelves. To count the books on a shelf, pick the shelf up first (`board[something]`), then ask its `.length`.
- **In my words:**

## Step 3: read each cell

_(not reached yet)_

## Step 4: count the matches

_(not reached yet)_
