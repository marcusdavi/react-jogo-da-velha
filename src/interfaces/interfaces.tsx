import { Action, PayloadAction } from "@reduxjs/toolkit";

export type CellValue = "X" | "O" | "";
export type Winner = "X" | "O" | "?" | "=";

export interface GameBoardState {
  nextPlayer: "X" | "O";
  winner: Winner;
  board: CellValue[][];
}

export type ActionPlay = PayloadAction<{ i: number; j: number }>;