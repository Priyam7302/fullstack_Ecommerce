// // import Cart from "../models/Cart.js";

// // export async function addToCart(req, res) {
// //   try {
// //     let data = req.body;
// //     data.userId = req.userId;
// //     const productInCart = new Cart(data);
// //     await productInCart.save();
// //     return res
// //       .status(201)
// //       .json({ message: "product added in cart", product: productInCart });
// //   } catch (error) {
// //     return res.status(500).json({ message: error.message });
// //   }
// // }
// // export async function addToCart(req, res) {
// //   try {
// //     const data = req.body; //{productId,quantity}
// //     data.userId = req.userId; //{productId,quantity,userId}

// //     const existingCartItem = await Cart.findOne({
// //       userId: data.userId,
// //       productId: data.productId,
// //     });

// //     if (existingCartItem) {
// //       existingCartItem.quantity = String(Number(existingCartItem.quantity) + 1);
// //       await existingCartItem.save();
// //       return res.status(200).json({
// //         message: "Product quantity updated in cart",
// //         product: existingCartItem,
// //       });
// //     } else {
// //       const productInCart = new Cart(data);
// //       await productInCart.save();
// //       return res
// //         .status(201)
// //         .json({ message: "Product added in cart", product: productInCart });
// //     }
// //   } catch (error) {
// //     return res.status(500).json({ message: error.message });
// //   }
// // }
// // export async function addToCart(req, res) {
// //   try {
// //     const data = req.body;
// //     data.userId = req.userId;
// //     data.quantity = data.quantity || 1;

// //     const existingCartItem = await Cart.findOne({
// //       userId: data.userId,
// //       productId: data.productId,
// //     });

// //     if (existingCartItem) {
// //       existingCartItem.quantity += 1;
// //       await existingCartItem.save();
// //     } else {
// //       const productInCart = new Cart(data);
// //       await productInCart.save();
// //     }

// //     const cart = await Cart.find({ userId: data.userId }).populate("productId");

// //     return res.status(200).json(cart);//always array
// //   } catch (error) {
// //     return res.status(500).json({ message: error.message });
// //   }
// // }


// // export async function getCart(req, res) {
// //   try {
// //     const response = req.userId;
// //     const cart = await Cart.find({ userId: response }).populate("productId");
// //     return res.status(200).json(cart);
// //   } catch (error) {
// //     return res.status(500).json({ message: error.message });
// //   }
// // }

// import Cart from "../models/Cart.js";

// /**
//  * ➕ ADD TO CART
//  */
// export async function addToCart(req, res) {
//   try {
//     const data = req.body;
//     data.userId = req.userId;
//     data.quantity = data.quantity || 1;

//     const existingCartItem = await Cart.findOne({
//       userId: data.userId,
//       productId: data.productId,
//     });

//     if (existingCartItem) {
//       existingCartItem.quantity += 1;
//       await existingCartItem.save();
//     } else {
//       await Cart.create(data);
//     }

//     // ✅ populate + filter broken references
//     const cart = await Cart.find({ userId: data.userId }).populate("productId");

//     const validCart = cart.filter((item) => item.productId !== null);

//     return res.status(200).json(validCart);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

// /**
//  * 🛒 GET CART
//  */
// export async function getCart(req, res) {
//   try {
//     const cart = await Cart.find({ userId: req.userId }).populate("productId");

//     // ✅ remove invalid products
//     const validCart = cart.filter((item) => item.productId !== null);

//     return res.status(200).json(validCart);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }


import Cart from "../models/Cart.js";

/**
 * ➕ ADD TO CART
 */
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

/**
 * 🛒 GET CART
 */
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
