import Cart from "../models/Cart.js";

export async function addToCart(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = req.body;
    data.userId = req.userId;
    data.quantity = data.quantity || 1;

    const existingCartItem = await Cart.findOne({
      userId: data.userId,
      productId: data.productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      await Cart.create(data);
    }

    const cart = await Cart.find({ userId: req.userId }).populate("productId");

    const validCart = cart.filter((item) => item.productId !== null);

    return res.status(200).json(validCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export async function getCart(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = await Cart.find({ userId: req.userId }).populate("productId");

    const validCart = cart.filter((item) => item.productId !== null);

    return res.status(200).json(validCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteCartItem(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cartItemId = req.params.id;

    const deletedItem = await Cart.findOneAndDelete({
      _id: cartItemId,
      userId: req.userId, 
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const cart = await Cart.find({ userId: req.userId }).populate("productId");
    const validCart = cart.filter((item) => item.productId !== null);

    return res.status(200).json(validCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export async function updateCartQuantity(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params; // cart item id
    const { action } = req.body; // "inc" | "dec"

    const cartItem = await Cart.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (action === "inc") {
      cartItem.quantity += 1;
    }

    if (action === "dec") {
      cartItem.quantity = Math.max(1, cartItem.quantity - 1);
    }

    await cartItem.save();

    const cart = await Cart.find({ userId: req.userId }).populate("productId");
    const validCart = cart.filter((item) => item.productId !== null);

    return res.status(200).json(validCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
