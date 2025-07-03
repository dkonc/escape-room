import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

type Player = "X" | "O" | null;

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

const checkWinner = (board: Player[]): Player | "draw" | null => {
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every((cell) => cell !== null) ? "draw" : null;
};

const aiMove = (board: Player[]): number => {
  // 1. Check if AI can win immediately
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const testBoard = [...board];
      testBoard[i] = "O"; // simulate AI move
      if (checkWinner(testBoard) === "O") {
        return i; // winning move found
      }
    }
  }

  // 2. Block player's winning move
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const testBoard = [...board];
      testBoard[i] = "X"; // simulate player's move
      if (checkWinner(testBoard) === "X") {
        return i; // block here
      }
    }
  }

  // 3. Otherwise, pick first available cell
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) return i;
  }

  return -1; // no moves left
};

const Room2 = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        if (winner === "X") {
          navigate("/room3-1045");
        } else {
          navigate("/failed");
        }
      }, 2000);
    }
  }, [winner, navigate]);

  const handleClick = (index: number) => {
    if (!isUserTurn || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsUserTurn(false);

    const userWin = checkWinner(newBoard);
    if (userWin) {
      setWinner(userWin);
      return;
    }

    setTimeout(() => {
      const aiIndex = aiMove(newBoard);
      if (aiIndex === -1) {
        setWinner("draw");
        return;
      }
      newBoard[aiIndex] = "O";
      setBoard(newBoard);

      const aiWin = checkWinner(newBoard);
      if (aiWin) {
        setWinner(aiWin);
      } else {
        setIsUserTurn(true);
      }
    }, 500);
  };

  return (
    <PageWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Title */}
        <h1 style={{ textAlign: "center", margin: 0 }}>
          Se predaš? Jaz se ne.
        </h1>

        {/* Subtitle text */}
        <p style={{ margin: 0 }}>Imaš prvo potezo - križci krožci.</p>

        {/* Board */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 80px)",
            gridTemplateRows: "repeat(3, 80px)",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {board.map((cell, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              style={{
                width: "80px",
                height: "80px",
                fontSize: "2.5rem",
                fontWeight: "bold",
                borderRadius: "12px",
                cursor: winner || cell ? "default" : "pointer",
                backgroundColor: "#f0e6ff",
                border: "2px solid #880e4f",
                color: cell === "X" ? "#880e4f" : "#4a148c",
              }}
              disabled={!!cell || !!winner}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Success/Fail messages */}
        {winner && (
          <div
            style={{
              color: "#880e4f",
              fontSize: "1.25rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            {winner === "X" ? (
              <>
                <p style={{ margin: 0 }}>Zmagala si!</p>
                <p style={{ margin: 0 }}>Preusmerjena boš...</p>
              </>
            ) : (
              <>
                <p style={{ margin: 0 }}>Nisi zmagala!</p>
                <p style={{ margin: 0 }}>Preusmerjam...</p>
              </>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Room2;
