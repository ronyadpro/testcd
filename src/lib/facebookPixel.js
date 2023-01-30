export const pixelTruck = (event, data) => {
    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.init('165110945568148');
            ReactPixel.track(event, data);
        });
};
export const pixelCustomTruck = (event, data) => {
    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.init('165110945568148');
            ReactPixel.trackCustom(event, data);
        });
};

export const pixelSingleTruck = (event, data) => {
    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.init('165110945568148');
            ReactPixel.trackSingle('165110945568148', event, data);
        });
};
