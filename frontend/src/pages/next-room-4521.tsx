import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pb";
import PageWrapper from "../components/PageWrapper";
import { incrementRoom1Hint } from "../attemptsService";

const NextRoom = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintLoading, setHintLoading] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [monthIncorrect, setMonthIncorrect] = useState(false);
  const [yearIncorrect, setYearIncorrect] = useState(false);
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

    const normalizedMonth = month.trim().toLowerCase();
    const normalizedYear = year.trim().toLowerCase();

    try {
      const monthRecord = await pb.collection("puzzles").getFullList({
        filter: `roomId = "room1-1" && answer = "${normalizedMonth}"`,
      });
      const yearRecord = await pb.collection("puzzles").getFullList({
        filter: `roomId = "room1-2" && answer = "${normalizedYear}"`,
      });

      setMonthIncorrect(monthRecord.length === 0);
      setYearIncorrect(yearRecord.length === 0);

      if (monthRecord.length > 0 && yearRecord.length > 0) {
        setError("");
        navigate("/room2-8392");
      } else {
        let errorMsg = "Poskusi znova. Napačen vnos: ";
        if (monthRecord.length === 0 && yearRecord.length === 0) {
          errorMsg += "mesec in leto.";
        } else if (monthRecord.length === 0) {
          errorMsg += "mesec.";
        } else if (yearRecord.length === 0) {
          errorMsg += "leto.";
        }
        setError(errorMsg);
      }
    } catch (err) {
      setError("Poskusi znova.");
      setMonthIncorrect(false);
      setYearIncorrect(false);
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // align to top
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <p>
            Ker vem, da si zgodovinski navdušenec začniva z naslednjim
            vprašanjem:
          </p>
          <h1 style={{ maxWidth: "520px" }}>
            Katerega meseca in katerega leta sem se kot študentka pridružila
            Innbox ekipi?
          </h1>
          <div>
            <p>Sem vnesi mesec:</p>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={{
                padding: "0.6rem",
                borderRadius: "12px",
                fontSize: "1.25rem",
                width: "50%",
                marginTop: "1rem",
                border: monthIncorrect
                  ? "2px solid #d81b60"
                  : "2px solid #880e4f",
                background: monthIncorrect ? "#fce4ec" : "#fff",
                transition: "border 0.2s, background 0.2s",
              }}
            />
            <p>Sem vnesi leto:</p>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{
                padding: "0.6rem",
                borderRadius: "12px",
                fontSize: "1.25rem",
                width: "50%",
                marginTop: "1rem",
                border: yearIncorrect
                  ? "2px solid #d81b60"
                  : "2px solid #880e4f",
                background: yearIncorrect ? "#fce4ec" : "#fff",
                transition: "border 0.2s, background 0.2s",
              }}
            />
          </div>

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
            <button
              type="button"
              onClick={() => setShowHint2(true)}
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
              Namig 2
            </button>
          </div>
          {error && (
            <p
              style={{
                color: "black",
                marginTop: "1rem",
                fontSize: "24px",
                fontWeight: "bold",
                transition: "opacity 0.5s",
                opacity: error ? 1 : 0,
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
                  top: "-0.75rem",
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
              Veliki srpan
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
                onClick={() => setShowHint2(false)}
                style={{
                  position: "absolute",
                  top: "-0.75rem",
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
              MMXXI
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default NextRoom;
