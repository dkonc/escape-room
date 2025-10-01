import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pb";
import PageWrapper from "../components/PageWrapper";
import slika from "../assets/kenguru.png";

const Room3 = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();

  const checkAnswer = async () => {
    setLoading(true);
    setError("");

    try {
      const records = await pb.collection("puzzles").getFullList({
        filter: `roomId = "room3"`,
      });

      if (
        records.length > 0 &&
        records[0].answer.trim().toLowerCase() === input.trim().toLowerCase()
      ) {
        navigate("/room4-8745");
      } else {
        setError("Napačen odgovor, poskusi znova.");
        navigate("/room3-1045");
      }
    } catch (err) {
      setError("Nekaj je šlo narobe, piši Ani.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    checkAnswer();
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
            width: "100%",
            maxWidth: "560px",
          }}
        >
          {/* Question */}
          <h1
            style={{
              margin: 0,
              textAlign: "center",
              fontSize: "1.5rem",
              width: "100%",
            }}
          >
            Štromarka Ana je z žicami povezala nekaj luči (glej sliko). Če
            prižge katerokoli luč, se prižgejo tudi vse luči, ki so s to lučjo
            neposredno povezane. Na začetku so vse luči ugasnjene. Najmanj
            koliko luči mora prižgati Ana, da bodo prižgane vse luči?
          </h1>
          <img
            src={slika}
            alt="Kenguru"
            style={{ width: "300px", height: "auto", borderRadius: "16px" }}
          />
        </div>
        <div>
          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "12px",
              fontSize: "1.25rem",
              width: "100%",
              boxSizing: "border-box",
              border: "2px solid #880e4f",
            }}
            placeholder="Vnesi številko..."
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 0",
              borderRadius: "12px",
              fontSize: "1.25rem",
              width: "100%",
              backgroundColor: "#880e4f",
              color: "white",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#a33274";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#880e4f";
            }}
          >
            Preveri
          </button>

          {/* Hint Button */}
          <button
            type="button"
            onClick={() => setShowHint(true)}
            style={{
              padding: "12px 0",
              borderRadius: "12px",
              fontSize: "1.25rem",
              width: "100%",
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

          {/* Error message */}
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
        </div>
      </form>

      {/* Hint Modal */}
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
                top: "0.5rem",
                right: "0.5rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                color: "#880e4f",
                cursor: "pointer",
                lineHeight: 1,
                padding: 0,
                margin: 0,
              }}
              aria-label="Zapri"
            >
              ×
            </button>
            A si mislu, da bo dejansko vsak hint uporaben? Kr mal se potrud!
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default Room3;
