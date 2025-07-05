const PageDown = () => (
  <div
    style={{
      color: "#000",
      background: "#fff",
      minHeight: "100vh",
      padding: "40px 0 0 0", // remove left padding
      textAlign: "left",
      fontFamily: "Times New Roman, Times, serif",
    }}
  >
    <h1
      style={{
        fontSize: "4em",
        fontWeight: "normal",
        margin: "0 0 0.7em 0",
        textAlign: "left",
      }}
    >
      404 Page Not Found
    </h1>
    <p style={{ fontSize: "1.5em", margin: 0, textAlign: "left" }}>
      The requested resource was not found on this server. Maybe you should try
      /PageUp instead?
    </p>
  </div>
);

export default PageDown;
