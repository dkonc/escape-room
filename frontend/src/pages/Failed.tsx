import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { color } from "framer-motion";

const Failed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 4000); // 4 seconds

    return () => clearTimeout(timeout); // cleanup if unmounted
  }, [navigate]);

  return (
    <PageWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#4a148c", fontSize: "48pt" }}>
          Ponesrečilo se ti je...
        </h1>
        <p style={{ color: "gray", marginTop: "1rem" }}>
          Te preusmerimo nazaj v kratkem...
        </p>
      </div>
    </PageWrapper>
  );
};

export default Failed;
