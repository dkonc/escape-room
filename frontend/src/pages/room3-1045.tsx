import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pb";
import PageWrapper from "../components/PageWrapper";

const Room3 = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
        navigate("/failed");
      }
    } catch (err) {
      setError("Failed to check answer, please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          width: "100%",
          maxWidth: "360px",
        }}
      >
        {/* Question */}
        <h1 style={{ margin: 0, textAlign: "center" }}>Kje sem?</h1>

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
          placeholder="Vnesi odgovor..."
        />

        {/* Submit Button */}
        <button
          onClick={checkAnswer}
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
          Oddaj
        </button>

        {/* Error message */}
        {error && (
          <p style={{ color: "red", marginTop: "0.5rem", textAlign: "center" }}>
            {error}
          </p>
        )}
      </div>
    </PageWrapper>
  );
};

export default Room3;
