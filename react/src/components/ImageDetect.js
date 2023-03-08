import React, { useEffect, useState } from "react";

const ImageDetect = ({ src, faces, toggleDetect }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageError = () => {
        setIsImageLoaded(false);
        toggleDetect()
    };

    useEffect(() => {
        if (src != '') {
            if (!isImageLoaded) {
                toggleDetect();
            }
            setIsImageLoaded(true);
        }
    }, [src])

    return (
        <div className="my-2 text-center">
            {isImageLoaded && (
                <div className="image-container">
                    <img
                        style={{ width: "500px" }}
                        id="imageDetect"
                        className="rounded"
                        src={src}
                        alt=""
                        onError={handleImageError}
                    />
                    {faces.map((box, index) => (
                        <div key={index} className="image-rectangle" style={box} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageDetect;
