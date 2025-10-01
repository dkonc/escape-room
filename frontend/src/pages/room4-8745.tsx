import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/leakyMirror/map-of-europe/27a335110674ae5b01a84d3501b227e661beea2b/TopoJSON/europe.topojson";

const correctCountries = new Set(["United Kingdom"]);

const Room4: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [, setSelectedList] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const toggleCountry = (countryName: string) => {
    if (selected.has(countryName)) {
      // Remove
      setSelected(new Set());
      setSelectedList([]);
      setMessage(""); // Clear message on deselect
    } else {
      // Only allow one selection at a time
      if (correctCountries.has(countryName)) {
        setSelected(new Set([countryName]));
        setSelectedList([countryName]);
        setMessage("");
        navigate("/room5-2367");
      } else {
        setSelected(new Set());
        setSelectedList([]);
        setMessage("Poskusi ponovno! Ni prav.");
      }
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>Pa da vidimo kako ti gre geografija, skupaj z zgodovino!</p>
      <h1>
        V kateri državi sva bila prvič na skupni službeni poti (Slovenija ne
        šteje)? Izberi na zemljevidu.
      </h1>

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
      </div>

      {/* Submit & Hints */}

      {/* Message */}
      {message && (
        <p
          style={{
            color: "black",
            marginTop: "1rem",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Room4;
