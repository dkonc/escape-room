import { useRef, useState } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import giftBoxAnimation from "../assets/Gift-Box.json";

const Gift = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Freeze animation at frame 65
  const handleLottieEnterFrame = (e: any) => {
    const currentFrame = e?.currentTime;

    if (currentFrame >= 40.5) {
      setShowPopup(true);
    }

    if (typeof currentFrame === "number" && currentFrame >= 65 && !isFrozen) {
      setShowPopup(true);
      lottieRef.current?.pause();
      lottieRef.current?.goToAndStop(65, true);

      setIsFrozen(true);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(71, 152, 255, 0.3) 70%), linear-gradient(135deg, rgb(20, 134, 140) 0%, rgba(58, 91, 190, 0.84) 100%)",
        flexDirection: "column",
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={giftBoxAnimation}
        loop={false}
        autoplay
        style={{
          width: "600px",
          height: "600px",
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
        onEnterFrame={handleLottieEnterFrame}
      />
      {showPopup && (
        <>
          <div
            style={{
              position: "fixed",
              left: "50%",
              bottom: "72%",
              transform: "translateX(-50%)",
              background: "rgba(226, 205, 163, 1)",
              border: "2px solid rgb(250, 176, 33)",
              borderRadius: "16px",
              padding: "24px 48px",
              fontSize: "2rem",
              color: "rgb(255, 138, 32)",
              fontWeight: "bold",
              boxShadow: "0 2px 16px #880e4f22",
              textAlign: "center",
              zIndex: 9999,
              opacity: showPopup ? 1 : 0,
              transition: "opacity 1s ease",
            }}
          >
            40YearsOfRok$2025
          </div>
          <div
            style={{
              position: "fixed",
              left: "50%",
              bottom: "5%",
              transform: "translateX(-50%)",
              borderRadius: "16px",
              padding: "18px 32px",
              fontSize: "1.3rem",
              color: "#000000ff",
              fontWeight: "bold",
              textAlign: "center",
              zIndex: 9999,
              opacity: showPopup ? 1 : 0,
              transition: "opacity 1s ease",
            }}
          >
            Čestitke! Uspešno si rešil vse naloge in si zaslužiš darilo! 🎉
            Geslo v zgornjem oknu bo tvoj ključ za odklepanje ZIP datoteke, kjer
            te čaka presenečenje – tvoje rojstnodnevno darilo!
          </div>
        </>
      )}
    </div>
  );
};

export default Gift;
// filepath: c:\Users\david\Desktop\Projects\escape-room\frontend\src\pages\gift-87654.tsx
