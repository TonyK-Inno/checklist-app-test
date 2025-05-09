import React, { useRef, useState } from "react";

export const CameraButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrcs((prevImageSrcs) => [...prevImageSrcs, imageURL]);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Take Photo</button>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {imageSrcs.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {imageSrcs.map((imageSrc, index) => (
            <img
              key={index}
              src={imageSrc}
              alt="Captured"
              style={{
                maxWidth: "30%",
                margin: "10px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
