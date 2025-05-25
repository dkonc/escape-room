import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pb";
import PageWrapper from "../components/PageWrapper";
import { getGlobalAttempts, incrementGlobalAttempts } from "../attemptsService";

const Home = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadAttempts = async () => {
      try {
        const count = await getGlobalAttempts();
        if (isMounted) setAttempts(count);
      } catch {
        if (isMounted) setError("Failed to load attempt counter.");
      }
    };

    loadAttempts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const records = await pb.collection("access").getFullList({
        filter: `password="${input}"`,
      });

      if (records.length > 0) {
        navigate("/next-room");
      } else {
        const newCount = await incrementGlobalAttempts();
        setAttempts(newCount);
        navigate("/failed");
      }
    } catch {
      setError("Something went wrong.");
    }
  };

  return (
    <PageWrapper>
      {/* Add a container with festive styling */}
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `radial-gradient(circle at center, rgba(255, 215, 0, 0.3) 0%, rgba(255, 99, 71, 0.3) 70%), 
                 linear-gradient(135deg, #4a148c 0%, #880e4f 100%)`,
          color: "#f0e6ff",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, width: "100%" }}>
          <h1>
            Vse najboljše! Na žalost se je tvoje darilo ujelo v mrežo ugank...
          </h1>
          <h2>Za nadaljevanje potrebuješ geslo:</h2>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Imaš samo 5 poskusov, potem pridejo dodatne ovire...
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              marginTop: "0.5rem",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            {attempts !== null ? (
              <>
                <strong>Trenutni poskusi:</strong>
                <br />
                <span style={{ fontSize: "2rem" }}>{attempts}</span>
              </>
            ) : (
              "Loading..."
            )}
          </p>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "12px",
              border: "none",
              fontSize: "1.25rem",
              marginTop: "1.5rem",
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.7)",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#fff",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "1rem",
              marginTop: "1rem",
              borderRadius: "12px",
              border: "none",
              fontSize: "1.5rem",
              backgroundColor: "#fff",
              color: "#FF6347",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 0 10px #fff",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFD700";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#FF6347";
            }}
          >
            Oddaj
          </button>

          {error && (
            <p style={{ color: "rgba(255, 100, 100, 0.9)", marginTop: "1rem" }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </PageWrapper>
  );
};

export default Home;
