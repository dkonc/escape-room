import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import pb from "../pb";

type Cell = { active?: boolean; number?: number; letter?: string };

const grid: Cell[][] = [
  [{}, {}, {}, {}, {}, { active: true, number: 1 }, {}, {}, {}, {}, {}],
  [
    {},
    {},
    { active: true, number: 2 },
    { active: true },
    { active: true },
    { active: true },
    { active: true },
    {},
    {},
    {},
    {},
  ],
  [
    {},
    {},
    {},
    {},
    {},
    { active: true },
    {},
    {},
    { active: true, number: 3 },
    {},
    { active: true, number: 4 },
  ],
  [
    {},
    {},
    {},
    {},
    {},
    { active: true, number: 5 },
    { active: true },
    { active: true },
    { active: true },
    { active: true },
    { active: true },
  ],
  [
    { active: true, number: 6 },
    { active: true },
    { active: true, letter: "A" },
    { active: true },
    { active: true },
    { active: true },
    {},
    {},
    { active: true },
    {},
    { active: true },
  ],
  [
    {},
    {},
    {},
    {},
    {},
    {},
    { active: true, number: 7 },
    {},
    { active: true },
    {},
    { active: true },
  ],
  [
    {},
    {},
    {},
    {},
    {},
    {},
    { active: true, number: 8 },
    { active: true, letter: "D" },
    { active: true, letter: "C" },
    { active: true },
    {},
  ],
  [{}, {}, {}, {}, {}, {}, { active: true }, {}, {}, {}, {}],
  [
    {},
    {},
    {},
    {},
    { active: true, number: 9 },
    {},
    { active: true },
    {},
    {},
    {},
    {},
  ],
  [
    {},
    { active: true, number: 10 },
    { active: true },
    { active: true },
    { active: true },
    { active: true },
    { active: true },
    { active: true },
    { active: true, number: 11 },
    {},
    {},
  ],
  [
    {},
    { active: true },
    {},
    {},
    { active: true },
    {},
    { active: true },
    {},
    { active: true, letter: "E" },
    {},
    {},
  ],
  [
    {},
    { active: true },
    {},
    {},
    { active: true, letter: "B" },
    {},
    { active: true },
    {},
    { active: true },
    {},
    {},
  ],
  [
    {},
    { active: true },
    {},
    {},
    { active: true },
    {},
    { active: true },
    {},
    { active: true },
    {},
    {},
  ],
];

const cellStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  border: "1.5px solid #880e4f",
  background: "#fffbe7",
  padding: 0,
  position: "relative",
  boxSizing: "border-box",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  border: "none",
  background: "transparent",
  textAlign: "center",
  fontSize: "1.5em",
  color: "#880e4f",
  outline: "none",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  margin: 0,
  boxSizing: "border-box",
  caretColor: "#880e4f",
};

const Hints = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 40, // more space between the two hint boxes
      marginTop: 0,
      justifyContent: "flex-start",
      padding: "0 0 0 32px", // add left "outer" padding to push both boxes away from the edge
    }}
  >
    <div
      style={{
        minWidth: 260,
        background: "#fffbe7",
        border: "2px solid #880e4f",
        borderRadius: 10,
        padding: "32px",
        boxShadow: "0 2px 12px #0001",
        color: "#111",
      }}
    >
      <h3
        style={{
          color: "#880e4f",
          marginTop: 0,
          marginBottom: 12,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        Počez
      </h3>
      <ul
        style={{
          paddingLeft: 0,
          margin: 0,
          listStyle: "none",
          lineHeight: 1.7,
        }}
      >
        <li>
          <b>2.</b> beseda, ki jo rečeš, ko se naredi nekaj neumnega
        </li>
        <li>
          <b>5.</b> Python based backend framework
        </li>
        <li>
          <b>6.</b> država, kjer je David skoraj izgubil ledvico
        </li>
        <li>
          <b>8.</b> glavno mesto Norveške
        </li>
        <li>
          <b>10.</b> darilo za moj RD, ki so bili produkt napačne ocene količine
          moke
        </li>
      </ul>
    </div>
    <div
      style={{
        minWidth: 260,
        background: "#fffbe7",
        border: "2px solid #880e4f",
        borderRadius: 10,
        padding: "32px",
        boxShadow: "0 2px 12px #0001",
        color: "#111",
      }}
    >
      <h3
        style={{
          color: "#880e4f",
          marginTop: 0,
          marginBottom: 12,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        Dol
      </h3>
      <ul
        style={{
          paddingLeft: 0,
          margin: 0,
          listStyle: "none",
          lineHeight: 1.7,
        }}
      >
        <li>
          <b>1.</b> črno-bel medved
        </li>
        <li>
          <b>3.</b> restavracija, kjer naročim pico istega imena
        </li>
        <li>
          <b>4.</b> ime mojemu mačku
        </li>
        <li>
          <b>7.</b> ime obalnega mesta, kjer smo se kopali
        </li>
        <li>
          <b>9.</b> prvi slovenski barvni film in oseba, ki jo David okliče, ko
          se zgodi nekaj smešnega
        </li>
        <li>
          <b>10.</b> po Dadotovo da bo nekaj narejeno hitro
        </li>
        <li>
          <b>11.</b> v hribe ga neseš, ponavadi so z sirom in šunko
        </li>
      </ul>
    </div>
  </div>
);

const Gift = () => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "fail" | "loading">(
    "idle"
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      // Check with PocketBase (collection: puzzles, roomId: "crossword", answer: "HELSE")
      const records = await pb.collection("puzzles").getFullList({
        filter: `roomId = "crossword"`,
      });
      const correct =
        records.length > 0 &&
        records[0].answer.trim().toLowerCase() === input.trim().toLowerCase();

      if (correct || input.trim().toUpperCase() === "HELSE") {
        setStatus("success");
      } else {
        setStatus("fail");
        setError("Napačno geslo. Poskusi znova!");
      }
    } catch (err) {
      setStatus("fail");
      setError("Napaka pri preverjanju gesla.");
    }
  };

  return (
    <PageWrapper>
      <div
        style={{
          alignItems: "center",
          minHeight: "100vh",
          background: "#fffbe7",
          paddingRight: 32,
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "#880e4f", letterSpacing: 2, marginBottom: 0 }}>
          Križanka
        </h1>
        <p
          style={{
            color: "#880e4f",
            background: "#fff",
            borderRadius: 10,
            padding: "18px 24px",
            margin: "18px 0 0 0",
            fontSize: "1.1em",
            maxWidth: 600,
            boxShadow: "0 2px 12px #0001",
            fontWeight: 500,
            textAlign: "center", // <-- center the instructions
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Navadna križanka :D Rešitev je beseda, sestavljena iz črk, po vrsti
          abecede iz križanke (sepravi, tam kjer je "A" je prva črka rešitve,
          "B" je druga črka rešitve itd.)
        </p>
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "24px 0 0 0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ABCDE"
            style={{
              padding: "12px",
              borderRadius: "12px",
              fontSize: "1.25rem",
              border: "2px solid #880e4f",
              outline: "none",
              width: 180,
              background: "#fff",
              color: "#880e4f",
              fontWeight: "bold",
              letterSpacing: 2,
              boxSizing: "border-box",
            }}
            disabled={status === "loading"}
          />
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              fontSize: "1.1rem",
              backgroundColor: "#880e4f",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
              transition: "background 0.2s",
            }}
            disabled={status === "loading"}
          >
            Preveri
          </button>
        </form>
        {status === "success" && (
          <div style={{ color: "#388e3c", marginTop: 12, fontWeight: 700 }}>
            Pravilno! Kam pa sedaj s tem? 👀🔑
          </div>
        )}
        {status === "fail" && (
          <div style={{ color: "#c62828", marginTop: 12, fontWeight: 700 }}>
            {error}
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 40,
            padding: "32px 0 32px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              padding: "8px 0 8px 8px",
            }}
          >
            <div
              style={{
                overflowX: "auto",
                background: "#fff",
                padding: "28px 28px 28px 28px",
                borderRadius: 14,
                border: "2.5px solid #880e4f",
                boxShadow: "0 4px 24px #880e4f22",
              }}
            >
              <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                  {grid.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, colIdx) => (
                        <td
                          key={colIdx}
                          style={
                            cell.active
                              ? cellStyle
                              : {
                                  width: 40,
                                  height: 40,
                                  background: "transparent",
                                  border: "none",
                                }
                          }
                        >
                          {cell.active ? (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                              }}
                            >
                              {(cell.number || cell.letter) && (
                                <span
                                  style={{
                                    position: "absolute",
                                    top: 2,
                                    left: 4,
                                    fontSize: "0.7em",
                                    color: "#880e4f",
                                    fontWeight: 700,
                                    userSelect: "none",
                                    zIndex: 2,
                                  }}
                                >
                                  {cell.number ?? cell.letter}
                                </span>
                              )}
                              <input
                                type="text"
                                maxLength={1}
                                style={inputStyle}
                              />
                            </div>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Hints />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Gift;
