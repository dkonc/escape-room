import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pb";
import PageWrapper from "../components/PageWrapper";

const COUSINE_TYPES = [
  "kitajska",
  "italijanska",
  "mehiška",
  "japonska",
  "francoska",
  "grška",
  "ameriška",
  "turška",
  "španska",
  "tajska",
  "vietnamska",
  "ruska",
  "nemška",
  "angleška",
  "madžarska",
  "slovenska",
  "avstrijska",
  "hrvaška",
  "bosanska",
  "libanonska",
  "egipčanska",
  "maroška",
  "afriška",
  "argentinska",
  "brazilska",
  "indijska",
  "perujska",
  "čilska",
  "kanadska",
  "avstralska",
  "korejska",
  "mongolska",
  "češka",
  "poljska",
  "ukrajinska",
  "romunska",
  "bulgarska",
  "finska",
  "švedska",
  "norveška",
  "danska",
  "portugalska",
  "izraelska",
  "palestinska",
  "iranska",
  "iraška",
  "pakistanska",
  "indonezijska",
  "malezijska",
  "filipinska",
];

const Room5 = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkAnswer = async () => {
    setLoading(true);
    setError("");
    try {
      if (selected === "indijska") {
        navigate("/room6-7639");
      } else {
        setError("Napačen odgovor, poskusi znova.");
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
          <h1
            style={{
              margin: 35,
              textAlign: "center",
              fontSize: "1.5rem",
              width: "100%",
            }}
          >
            Na tem potovanju sva šla na kar nekaj odličnih večerij. V kateri
            restavraciji sva jedla prvi večer?
          </h1>
        </div>
        <div style={{ margin: 0 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)", // 10 choices per row
              gap: "0px",
              margin: 0,
              padding: 0,
            }}
          >
            {COUSINE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelected(type)}
                style={{
                  padding: "10px",
                  borderRadius: "0px",
                  border:
                    selected === type ? "2px solid #880e4f" : "1px solid #ccc",
                  background: selected === type ? "#fce4ec" : "#fff",
                  color: "#880e4f",
                  fontWeight: selected === type ? "normal" : "normal",
                  cursor: "pointer",
                  fontSize: "1em",
                  transition: "all 0.2s",
                  margin: 0,
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading || !selected}
            style={{
              padding: "12px 24px",
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
    </PageWrapper>
  );
};

export default Room5;
