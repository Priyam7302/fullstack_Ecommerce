import Cart from "../models/Cart.js";

/* =====================================================
   ADD TO CART
   - One cart per user
   - Product stored inside products[]
===================================================== */
export async function addToCart(req, res) {
  try {
    const userId = req.userId;
    const { productId, quantity = 1 } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let cart = await Cart.findOne({ userId });

    // 🆕 Create cart if not exists
    if (!cart) {
      cart = await Cart.create({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      // 🔍 Check if product already exists
      const index = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
    }

    const populatedCart = await Cart.findOne({ userId }).populate(
      "products.productId"
    );

    return res.status(200).json(populatedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* =====================================================
   GET CART
===================================================== */
export async function getCart(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ userId }).populate("products.productId");

    // 🧺 Empty cart fallback
    if (!cart) {
      return res.status(200).json({
        userId,
        products: [],
      });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* =====================================================
   DELETE CART ITEM (by productId)
===================================================== */
export async function deleteCartItem(req, res) {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate(
      "products.productId"
    );

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* =====================================================
   UPDATE CART QUANTITY
   action: "inc" | "dec"
===================================================== */
export async function updateCartQuantity(req, res) {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const { action } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (action === "inc") {
      product.quantity += 1;
    }

    if (action === "dec") {
      product.quantity = Math.max(1, product.quantity - 1);
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate(
      "products.productId"
    );

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
