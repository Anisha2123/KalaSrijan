import { useState } from "react";

const SmartImage = ({ src, alt, className = "", style = {} }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`w-full h-full ${className}`} style={{ position: "relative" }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          inset: 0,
          filter: loaded ? "blur(0)" : "blur(20px)",
          transform: loaded ? "scale(1)" : "scale(1.05)",
          transition: "all 0.6s ease",
          ...style, // ✅ IMPORTANT
        }}
      />
    </div>
  );
};

export default SmartImage;