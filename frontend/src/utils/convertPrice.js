export const convertToMillions = (price) => {
    return Math.round(price / 1000000).toFixed(1);
};

export const convertToThousands = (price) => {
    return Math.round(price / 1000);
};
