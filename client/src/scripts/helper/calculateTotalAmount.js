export const calculateTotalAmount = (products) => {
    const totalAmount = products.reduce((total, product) => {
        return total + product.product.currentPrice * product.cartQuantity
    }, 0);
    return `$${totalAmount.toFixed(2)}`

}