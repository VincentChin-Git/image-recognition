import React, { useEffect, useState } from "react";

const ImageDetect = ({ src, faces }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageError = () => {
        setIsImageLoaded(false);
    };

    useEffect(() => {
        setIsImageLoaded(true);
    }, [src])

    console.log(faces)

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
