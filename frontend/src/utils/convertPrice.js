export const convertToMillions = (price) => {
    return (Math.round(price / 100000) / 10).toFixed(1)
}

export const convertToThousands = (price) => {
    return Math.round(price / 1000)
}
