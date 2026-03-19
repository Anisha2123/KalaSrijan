import { useState } from "react";

const SmartImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover"
        style={{
          filter: loaded ? "blur(0)" : "blur(20px)",
          transform: loaded ? "scale(1)" : "scale(1.1)",
          transition: "all 0.6s ease"
        }}
      />
    </div>
  );
};

export default SmartImage;