import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pb";
import PageWrapper from "../components/PageWrapper";
import { incrementRoom1Hint } from "../attemptsService";
import slika from "../assets/kenguru2.png";

const Room6 = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintLoading, setHintLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const navigate = useNavigate();

  // Automatically clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const val1 = input1.trim().toLowerCase();
    const val2 = input2.trim().toLowerCase();
    const val3 = input3.trim().toLowerCase();

    try {
      const rec1 = await pb.collection("puzzles").getFullList({
        filter: `roomId = "room6-1" && answer = "${val1}"`,
      });
      const rec2 = await pb.collection("puzzles").getFullList({
        filter: `roomId = "room6-2" && answer = "${val2}"`,
      });
      const rec3 = await pb.collection("puzzles").getFullList({
        filter: `roomId = "room6-3" && answer = "${val3}"`,
      });

      const allCorrect = rec1.length > 0 && rec2.length > 0 && rec3.length > 0;
      setIncorrect(!allCorrect);

      if (allCorrect) {
        setError("");
        navigate("/room7-6281");
      } else {
        setError("Poskusi znova. Napačen vnos.");
      }
    } catch (err) {
      setError("Poskusi znova.");
      setIncorrect(true);
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
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // stick to top
        }}
      >
        <form onSubmit={handleSubmit}>
          <p>Pa preveriva še tvoje matematične sposobnosti.</p>
          <h1 style={{ maxWidth: "720px", fontSize: "1.5rem" }}>
            Ana je na vsakega izmed 3 kartončkov napisala petmestno število,
            vsota 3 napisanih petmestnih števil je bila 57263. Nato je kartončke
            položila na mizo, tako da so bile 3 števke prekrite (glej sliko).
            Ali lahko Rok ugotovi, katere števke so bile prekrite? Zapiši jih v
            naraščajočem vrstnem redu.
          </h1>
          <img
            height={"150px"}
            src={slika}
            alt="Kartončki z napisanimi številkami"
          ></img>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              margin: "0.5rem 0",
            }}
          >
            <input
              type="text"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              maxLength={1}
              style={{
                width: "0.5em",
                height: "0.5em",
                fontSize: "2em",
                textAlign: "center",
                border: incorrect ? "2px solid #d81b60" : "2px solid #880e4f",
                background: incorrect ? "#fce4ec" : "#fff",
                borderRadius: "8px",
                transition: "border 0.2s, background 0.2s",
              }}
            />
            <input
              type="text"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              maxLength={1}
              style={{
                width: "0.5em",
                height: "0.5em",
                fontSize: "2em",
                textAlign: "center",
                border: incorrect ? "2px solid #d81b60" : "2px solid #880e4f",
                background: incorrect ? "#fce4ec" : "#fff",
                borderRadius: "8px",
                transition: "border 0.2s, background 0.2s",
              }}
            />
            <input
              type="text"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
              maxLength={1}
              style={{
                width: "0.5em",
                height: "0.5em",
                fontSize: "2em",
                textAlign: "center",
                border: incorrect ? "2px solid #d81b60" : "2px solid #880e4f",
                background: incorrect ? "#fce4ec" : "#fff",
                borderRadius: "8px",
                transition: "border 0.2s, background 0.2s",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              type="submit"
              style={{
                fontSize: "1.25rem",
                borderRadius: "12px",
                backgroundColor: "#880e4f",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Preveri
            </button>
            <button
              type="button"
              onClick={handleShowHint}
              disabled={hintLoading}
              style={{
                padding: "1rem",
                fontSize: "1.25rem",
                borderRadius: "12px",
                backgroundColor: "#2fc9b5ff",
                color: "#000000ff",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 8px #00000088",
              }}
            >
              Namig
            </button>
          </div>
          {error && (
            <p
              style={{
                color: "black",
                marginTop: "1rem",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>
          )}
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
              <button
                onClick={() => setShowHint(false)}
                style={{
                  position: "absolute",
                  top: "-1.8rem",
                  right: "-0.5rem",
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
              A je res tok težko? Če ne pa poklič Ano.
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Room6;
