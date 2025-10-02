import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { getGlobalAttempts } from "../attemptsService";

const Home = () => {
  const [error, setError] = useState("");
  const [, setAttempts] = useState<number | null>(null);
  const navigate = useNavigate();
  const [cookieVisible, setCookieVisible] = useState(true);
  const [cookieAnimate, setCookieAnimate] = useState(false);

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

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setCookieAnimate(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    navigate("/PageDown");
  };

  return (
    <PageWrapper>
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(71, 152, 255, 0.3) 70%), linear-gradient(135deg, rgb(20, 134, 140) 0%, rgba(58, 91, 190, 0.84) 100%)",
          color: "#f0e6ff",
          textAlign: "center",
          padding: "2rem",
          position: "relative",
        }}
      >
        {/* Cookie Popup centered above the main text */}
        {cookieVisible && (
          <div
            className={cookieAnimate ? "popup-animate" : ""}
            style={{
              position: "absolute",
              left: "50%",
              top: "0",
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
              To rojstnodnevno darilo uporablja čokoladne piškotke za
              zagotavljanje boljše uporabniške (Rokove) izkušnje.
              <br />
              <br />S klikom na spodnji gumb potrjuješ prejem prvega darila:
              “Anini home-made čokoladni piškotki”.
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
              onClick={() => setCookieVisible(false)}
            >
              Sprejmi piškotke
            </button>
            <style>
              {`
                .popup-animate {
                  animation: popupFloatDown 2.0s forwards;
                }
                @keyframes popupFloatDown {
                  from { top: -220px; opacity: 0; }
                  to { top: 180px; opacity: 1; }
                }
              `}
            </style>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: 400, width: "100%", marginTop: "120px" }}
        >
          <h1>
            Vse najboljše! Na žalost se je tvoje darilo ujelo v mrežo ugank...
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "rgba(255,255,255,0.95)",
              width: "800px",
            }}
          >
            Dragi Rok, v nadaljevanju te čaka 9 ugank, ki bodo razgibale tvoje
            (sedaj že nekoliko starejše) možgančke. 😉 Nekatera vprašanja so
            osebna in se nanašajo na naju, druga pa so bolj matematične ali
            logične narave. Saj veš – cilj ni le zabava, ampak tudi preizkusiti
            spomin, logiko in druge kognitivne sposobnosti. Brez skrbi – število
            poskusov za reševanje ni omejeno, zato lahko po potrebi večkrat
            premisliš in popravljaš odgovore. 💪 In ne pozabi: na koncu tega
            »testa« te čaka zaslužena nagrada. Srečno!
          </p>

          <button
            type="submit"
            style={{
              fontSize: "1.25rem",
              borderRadius: "12px",
              backgroundColor: "#880e4f",
              color: "white",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#bc4886ff";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#880e4f";
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
    </PageWrapper>
  );
};

export default Home;
