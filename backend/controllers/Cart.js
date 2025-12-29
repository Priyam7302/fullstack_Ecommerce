import Cart from "../models/cart.js";

// export async function addToCart(req, res) {
//   try {
//     let data = req.body;
//     data.userId = req.userId;
//     const productInCart = new Cart(data);
//     await productInCart.save();
//     return res
//       .status(201)
//       .json({ message: "product added in cart", product: productInCart });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }
export async function addToCart(req, res) {
  try {
    const data = req.body; //{productId,quantity}
    data.userId = req.userId; //{productId,quantity,userId}

    const existingCartItem = await Cart.findOne({
      userId: data.userId,
      productId: data.productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity = String(Number(existingCartItem.quantity) + 1);
      await existingCartItem.save();
      return res.status(200).json({
        message: "Product quantity updated in cart",
        product: existingCartItem,
      });
    } else {
      const productInCart = new Cart(data);
      await productInCart.save();
      return res
        .status(201)
        .json({ message: "Product added in cart", product: productInCart });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getCart(req, res) {
  try {
    const response = req.userId;
    const cart = await Cart.find({ userId: response }).populate("productId");
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
