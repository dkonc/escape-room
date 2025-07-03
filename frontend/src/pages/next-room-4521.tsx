import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pb";
import PageWrapper from "../components/PageWrapper";
import { incrementRoom1Hint } from "../attemptsService"; // <-- add this import

const NextRoom = () => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintLoading, setHintLoading] = useState(false);
  const [showHint2, setShowHint2] = useState(false); // <-- add state for Namig 2
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalized = answer.trim().toLowerCase();

    try {
      const records = await pb.collection("puzzles").getFullList({
        filter: `roomId = "room1" && answer = "${normalized}"`,
      });

      if (records.length > 0) {
        navigate("/room2-8392");
      } else {
        navigate("/failed");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  const handleShowHint = async () => {
    setHintLoading(true);
    setShowHint(true);
    try {
      await incrementRoom1Hint();
    } catch {
      // ignore error, still show hint
    }
    setHintLoading(false);
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <h1>Rešitev: Brižinski spomeniki od Davida Konca</h1>
        <p>Zmedenost je del poti do rešitve. </p>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{
            padding: "1rem",
            borderRadius: "12px",
            fontSize: "1.25rem",
            width: "100%",
            marginTop: "1rem",
          }}
        />
        {/* Centered button group */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <button
            type="submit"
            style={{
              padding: "1rem",
              fontSize: "1.25rem",
              borderRadius: "12px",
              backgroundColor: "#fff",
              color: "#880e4f",
              fontWeight: "bold",
            }}
          >
            Oddaj
          </button>
          <button
            type="button"
            onClick={handleShowHint}
            disabled={hintLoading}
            style={{
              padding: "1rem",
              fontSize: "1.25rem",
              borderRadius: "12px",
              backgroundColor: "#FFD700",
              color: "#880e4f",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 8px #FFD70088",
            }}
          >
            Namig
          </button>
          <button
            type="button"
            onClick={() => setShowHint2(true)}
            style={{
              padding: "1rem",
              fontSize: "1.25rem",
              borderRadius: "12px",
              backgroundColor: "#90caf9",
              color: "#0d47a1",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 8px #90caf988",
            }}
          >
            Namig 2
          </button>
        </div>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
      {/* First hint popup */}
      {showHint && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowHint(false)}
        >
          <div
            style={{
              background: "#fff",
              color: "#880e4f",
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 4px 32px #0004",
              minWidth: "260px",
              maxWidth: "90vw",
              textAlign: "center",
              fontSize: "1.25rem",
              fontWeight: "bold",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* X button absolutely positioned in top right */}
            <button
              onClick={() => setShowHint(false)}
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                color: "#880e4f",
                cursor: "pointer",
                lineHeight: 1,
              }}
              aria-label="Zapri"
            >
              ×
            </button>
            Ne celotne zgodovine... Danes je tvoj rojstni dan
          </div>
        </div>
      )}
      {/* Second hint popup */}
      {showHint2 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowHint2(false)}
        >
          <div
            style={{
              background: "#fff",
              color: "#0d47a1",
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 4px 32px #0004",
              minWidth: "260px",
              maxWidth: "90vw",
              textAlign: "center",
              fontSize: "1.25rem",
              fontWeight: "bold",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowHint2(false)}
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                color: "#0d47a1",
                cursor: "pointer",
                lineHeight: 1,
              }}
              aria-label="Zapri"
            >
              ×
            </button>
            Napiši mi na FB en fun fact v zameno za namig.
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default NextRoom;
