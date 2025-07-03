import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/leakyMirror/map-of-europe/27a335110674ae5b01a84d3501b227e661beea2b/TopoJSON/europe.topojson";

const correctCountries = new Set([
  "Germany",
  "United Kingdom",
  "France",
  "Italy",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Greece",
  "Hungary",
  "Austria",
  "Switzerland",
  "Serbia",
  "Denmark",
  "Croatia",
  "The former Yugoslav Republic of Macedonia",
  "Slovenia",
  "Montenegro",
  "Bosnia and Herzegovina",
]);

const Room4: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const navigate = useNavigate();

  const toggleCountry = (countryName: string) => {
    if (selected.has(countryName)) {
      // Remove
      const newSet = new Set(selected);
      newSet.delete(countryName);
      setSelected(newSet);

      setSelectedList((prevList) => prevList.filter((c) => c !== countryName));
    } else {
      // Add
      const newSet = new Set(selected);
      newSet.add(countryName);
      setSelected(newSet);

      setSelectedList((prevList) => [...prevList, countryName]);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    selected.forEach((country) => {
      if (correctCountries.has(country)) {
        correct++;
      }
    });

    if (correct === 18 && selected.size === 18) {
      navigate("/gift-87654");
    } else if (selected.size <= 10) {
      setMessage(
        `Izbrati moraš vsaj 13 držav, da ne bo prelahko. Iščeš jih 18.`
      );
    } else {
      setMessage(`Pravilno si izbrala ${correct} držav.`);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Enkrat sem te slišal, da si rekla, da si slab poslušalec.</h1>
      <p>
        S tem se ne strinjam niti malo, naslednja uganka je pa dokaz tega. Kje
        vse sem bil? Iščeš 18 držav v Evropi (ni mi uspelo dodati celega sveta
        😂). Obe državi trenutnega tripa na katerem sem štejeta. Gumb za oddajo
        in namig sta spodaj.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {/* Map */}
        <div style={{ maxWidth: 900, width: "100%" }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 600, center: [20, 55] }}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.NAME;
                  const isSelected = selected.has(countryName);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => toggleCountry(countryName)}
                      style={{
                        default: {
                          fill: isSelected ? "#4caf50" : "#DDD",
                          stroke: "#FFF",
                          strokeWidth: 0.5,
                          cursor: "pointer",
                        },
                        hover: {
                          fill: "#81c784",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#388e3c",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Selected Countries */}
        <div
          style={{
            minWidth: "200px",
            maxHeight: "400px",
            overflowY: "auto",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginTop: 0, color: "black" }}>Izbrane države:</h3>
          <ul style={{ paddingLeft: "1rem", margin: 0 }}>
            {selectedList.map((country) => (
              <li key={country} style={{ color: "black", fontWeight: "bold" }}>
                {country}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Submit & Hints */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button
          onClick={handleSubmit}
          style={{
            fontSize: "1rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4caf50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Oddaj
        </button>
        <button
          type="button"
          onClick={() => setShowHint(true)}
          style={{
            fontSize: "1rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#FFD700",
            color: "#880e4f",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 8px #FFD70088",
          }}
        >
          Namig
        </button>
        <button
          type="button"
          onClick={() => setShowHint2(true)}
          style={{
            fontSize: "1rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#90caf9",
            color: "#0d47a1",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 8px #90caf988",
          }}
        >
          Namig 2
        </button>
      </div>

      {/* Message */}
      {message && (
        <p style={{ marginTop: "1rem", color: "red", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      {/* Hint 1 Popup */}
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
            V Grčijo smo šli z avtomobilom
          </div>
        </div>
      )}

      {/* Hint 2 Popup */}
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
              color: "#0d47a1",
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
                top: "0.5rem",
                right: "0.5rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                color: "#0d47a1",
                cursor: "pointer",
                lineHeight: 1,
                padding: 0,
                margin: 0,
              }}
              aria-label="Zapri"
            >
              ×
            </button>
            Pošlji mi seznam treh držav, v katere si najmanj prepričana in ti
            odgovorim z DA/NE.
          </div>
        </div>
      )}
    </div>
  );
};

export default Room4;
