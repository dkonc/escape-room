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

    if (correct === 17 && selected.size === 17) {
      navigate("/gift");
    } else if (selected.size <= 10) {
      setMessage(
        `Izbrati moraš vsaj 13 držav, da ne bo prelahko. Iščeš jih 17.`
      );
    } else {
      setMessage(`Pravilno si izbrala ${correct} držav.`);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Res je. Sedaj pa malo težje... Skoraj si na koncu.</h1>
      <p>Kje sem (bil)? :D </p>

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

      {/* Submit & Message */}
      <div style={{ marginTop: "2rem" }}>
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
        {message && (
          <p style={{ marginTop: "1rem", color: "red", fontWeight: "bold" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Room4;
