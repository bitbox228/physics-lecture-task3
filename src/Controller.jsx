import React, { useState, useEffect } from 'react';
import View from './View';
import fetchData from './Model';

const Controller = () => {
    const [currents, setCurrents] = useState([[0, 0, 1]]);
    const [xRange, setXRange] = useState([-5, 5]);
    const [yRange, setYRange] = useState([-5, 5]);
    const [density, setDensity] = useState(3);
    const [loading, setLoading] = useState(false)
    const size = 8;

    const [image, setImage] = useState();

    useEffect(() => {
        handleLoadImage();
    }, []);

    const handleLoadImage = async () => {
        if (xRange[0] >= xRange[1]) {
            alert("x_min >= x_max");
            return
        } else if (yRange[0] >= yRange[1]) {
            alert("y_min >= y_max");
            return
        }
        setLoading(true);
        await fetchData(JSON.stringify({
            "currents": currents,
            "x": xRange,
            "y": yRange,
            "density": density,
            "size": size
        }), setImage);
        setLoading(false);
    };

    return (
        <View
            currents={currents}
            xRange={xRange}
            yRange={yRange}
            density={density}
            setCurrents={setCurrents}
            setXRange={setXRange}
            setYRange={setYRange}
            setDensity={setDensity}
            image={image}
            handleLoadImage={handleLoadImage}
            loading={loading}
        />
    );
};

export default Controller;
