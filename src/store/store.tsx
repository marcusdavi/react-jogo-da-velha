import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  ActionPlay,
  CellValue,
  GameBoardState,
  Winner,
} from "../interfaces/interfaces";

const initialState: GameBoardState = {
  nextPlayer: "X",
  winner: "?",
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const slice = createSlice({
  name: "gameBoard",
  initialState,
  reducers: {
    play: (state, action: ActionPlay) => {
      const { i, j } = action.payload;
      if (state.board[i][j] === "" && state.winner === "?") {
        state.board[i][j] = state.nextPlayer;
        state.winner = getWinner(state.board);
        state.nextPlayer = state.nextPlayer === "X" ? "O" : "X";
      } else {
        return state;
      }
    },
    reset: (state) => {
      return initialState;
    },
  },
});

export const store = configureStore({
  reducer: {
    gameBoard: slice.reducer,
  },
});

export const { play, reset } = slice.actions;

function getWinner(board: CellValue[][]): Winner {
  const players: ("X" | "O")[] = ["X", "O"];
  for (const player of players) {
    for (let i = 0; i <= 2; i++) {
      if (
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      ) {
        return player;
      }
      if (
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      ) {
        return player;
      }
      if (
        board[0][0] === player &&
        board[1][1] === player &&
        board[2][2] === player
      ) {
        return player;
      }
      if (
        board[0][2] === player &&
        board[1][1] === player &&
        board[2][0] === player
      ) {
        return player;
      }
    }
  }
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      if (board[i][j] === "") {
        return "?";
      }
    }
  }
  return "=";
}
