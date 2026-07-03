import { prisma } from "../../config/db"

export const updateCartItemQuantity = (cartId, productId, newQuantity) => {
    const cartItem = await prisma.cartItem.findFirst({
        where: {
            cartId: cartId,
            productId: Number(productId)
        }
    })
    
    if (!cartItem) throw new Error("Cart Item not found");

    await prisma.cartItem.update({
        where: {
            cartId: cartId,
            productId: Number(productId)
        },
        data: {
            quantity: newQuantity
        }
    })
}