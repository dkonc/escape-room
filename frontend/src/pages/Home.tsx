import PageWrapper from "../components/PageWrapper";

const Home = () => {
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
        <h1>Vse najboljše! Sem se želel potruditi za darilo, ampak...</h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "rgba(255,255,255,0.95)",
            width: "800px",
          }}
        >
          Ko sem ga poskusil nastaviti, je vskočil Nero in naredil pravo
          zmešnjavo... Na žalost nisem imel veliko časa, da bi ga popravil, zato
          te lahko samo usmerim na pravo smer... Rešitev se nahaja v ORANŽNIH
          MALIH škatlicah... Najdi jih in darilo bo tvoje :D #1: F
        </p>

        <div style={{ margin: "2rem 0", width: "100%", maxWidth: "800px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d696.3147238472547!2d14.293241597850486!3d46.25568726664178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDE1JzIwLjUiTiAxNMKwMTcnMzYuNiJF!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
