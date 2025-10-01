import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { getGlobalAttempts } from "../attemptsService";

const CookiePopup = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fff",
        color: "#880e4f",
        borderRadius: 16,
        boxShadow: "0 2px 16px #0002",
        padding: "20px 32px",
        zIndex: 9999,
        maxWidth: 340,
        textAlign: "center",
        fontSize: "1.05em",
        border: "2px solid #880e4f",
      }}
    >
      <div>
        To rojstnodnevno darilo uporablja čokoladne piškotke za zagotavljanje
        boljše uporabniške (Rokove) izkušnje.
        <br />
        <br />S klikom na spodnji gumb potrjuješ prejem prvega darila: “Anini
        home-made čokoladni piškotki”.
      </div>
      <button
        style={{
          marginTop: 18,
          padding: "10px 22px",
          borderRadius: 10,
          border: "none",
          background: "#880e4f",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1em",
          cursor: "pointer",
          boxShadow: "0 1px 6px #880e4f33",
        }}
        onClick={() => setVisible(false)}
      >
        Sprejmi piškotke
      </button>
    </div>
  );
};

const Home = () => {
  const [error, setError] = useState("");
  const [, setAttempts] = useState<number | null>(null);
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
    navigate("/PageDown");
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
          background: `radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(71, 152, 255, 0.3) 70%), linear-gradient(135deg, rgb(20, 134, 140) 0%, rgba(58, 91, 190, 0.84) 100%)`,
          color: "#f0e6ff",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, width: "100%" }}>
          <h1>
            Vse najboljše! Na žalost se je tvoje darilo ujelo v mrežo ugank...
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              marginTop: "0.5rem",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Dragi Rok, v nadaljevanju te čaka X ugank, ki bodo razgibale tvoje
            (sedaj že nekoliko starejše) možgančke. 😉 Nekatera vprašanja so
            osebna in se nanašajo na naju, druga pa so bolj matematične ali
            logične narave. Saj veš – cilj ni le zabava, ampak tudi preizkusiti
            spomin, logiko in druge kognitivne sposobnosti. Brez skrbi – število
            poskusov za reševanje ni omejeno, zato lahko po potrebi večkrat
            premisliš in popravljaš odgovore. 💪 In ne pozabi: na koncu tega
            »testa« te čaka zaslužena nagrada 🍪 Srečno!
          </p>

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
            Nadaljuj
          </button>

          {error && (
            <p style={{ color: "rgba(255, 100, 100, 0.9)", marginTop: "1rem" }}>
              {error}
            </p>
          )}
        </form>
      </div>
      <CookiePopup />
    </PageWrapper>
  );
};

export default Home;
