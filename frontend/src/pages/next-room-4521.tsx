import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pb";
import PageWrapper from "../components/PageWrapper";

const NextRoom = () => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
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

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <h1>Namig: "Brižinski spomeniki - David Konc"</h1>
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
        <button
          type="submit"
          style={{
            marginTop: "1rem",
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
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </PageWrapper>
  );
};

export default NextRoom;
