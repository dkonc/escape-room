import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pb";
import PageWrapper from "../components/PageWrapper";

const Room8 = () => {
  const [input1, setInput1] = useState("");
  const [error, setError] = useState("");
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

    try {
      const rec1 = await pb.collection("puzzles").getFullList({
        filter: `roomId = "room8-1" && answer = "${val1}"`,
      });

      const allCorrect = rec1.length > 0;
      setIncorrect(!allCorrect);

      if (allCorrect) {
        setError("");
        navigate("/gift-87654");
      } else {
        setError("Poskusi znova. Napačen vnos.");
      }
    } catch (err) {
      setError("Poskusi znova.");
      setIncorrect(true);
    }
  };

  return (
    <PageWrapper>
      <div
        style={{
          minHeight: "100vh",
          padding: "2rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // stick to top
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1 style={{ maxWidth: "720px", fontSize: "1.5rem" }}>
            Rok je za rojstni dan dobil škatlo s 60 čokoladnimi piškoti. V
            ponedeljek je v službi pojedel 1/10 piškotov, v torek 1/9 preostalih
            piškotov, v sredo 1/8 preostalih piškotov, v četrtek 1/7 preostalih
            piškotov in tako dalje, dokler ni pojedel polovice preostalih
            piškotov. Koliko piškotov je na koncu ostalo Roku?
          </h1>
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
      </div>
    </PageWrapper>
  );
};

export default Room8;
