import { play, reset, useAppDispatch, useAppSelector } from "../store/store";

export default function GameBoard() {
  const state = useAppSelector((state) => state.gameBoard);
  const dispatch = useAppDispatch();

  return (
    <div className="gameBoard">
      {state.winner !== "?" && <>
      {state.winner === "=" && <div>Empatou</div>}
      {state.winner !== "=" && <div>Vencedor: <strong>{state.winner}</strong></div>}
      </>}
      {state.winner === "?" && <div>Aguardando jogador {state.nextPlayer}</div>}
      <table>
        <tbody>
          {state.board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  onClick={() => dispatch(play({ i, j }))}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => dispatch(reset())}>
          Reiniciar partida
        </button>
      </div>
    </div>
  );
}
