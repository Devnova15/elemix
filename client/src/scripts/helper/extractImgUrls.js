export const extractImgUrls = (item) => {
    const images = []
    if (item.variations) {
        item.variations.forEach(variation => {
            variation.imageUrls.forEach(url => images.push(url))
        })
        return images
    }
    item.imageUrls.forEach(url => images.push(url))
    return images
}