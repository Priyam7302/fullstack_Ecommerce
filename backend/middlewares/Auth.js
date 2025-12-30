// import jwt from "jsonwebtoken";
// import "dotenv/config";

// export async function checkAuth(req, res, next) {
//   try {
//     const token = req.cookies.auth_token;

//     if (!token)
//       return res
//         .status(401)
//         .json({ message: "You need to log in to perform this action" })
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   }
//   catch (error) {
//     return res.status(500).json({message:error.message})
//   }
  
// }

// // export async function checkForlogin(req, res) {
// //   try {
// //     if (!req.query)
// //       return res.status(422).json({
// //         message: "no referer query parameter, access denied",
// //       });

// //     let token;

// //     if (req.query.referer === "admin") token = req.cookies.admin_token;
// //     if (req.query.referer === "user") token = req.cookies.auth_token;

// //     if (!token) {
// //       return res
// //         .status(401)
// //         .json({ message: "no authentication token, accesss denied" });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     if (decoded.role === req.query.referer)
// //       return res.status(200).json({ message: "token verified" });
// //   } catch (error) {
// //     return res.status(500).json({ message: error.message });
// //   }
// // }


//     let token;
//     if (referer === "admin") token = req.cookies.admin_token;
//     if (referer === "user") token = req.cookies.auth_token;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "no authentication token, access denied" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ FIX

//     if (decoded.role !== referer) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     return res.status(200).json({ message: "token verified" });
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }

import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * 🔐 Protect routes (Cart, Profile, etc.)
 */
export async function checkAuth(req, res, next) {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "You need to log in to perform this action" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ FIXED
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    // ✅ AUTH error, NOT server error
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

/**
 * 🔍 Check login status (used by /check/login)
 */
export async function checkForlogin(req, res) {
  try {
    const referer = req.query.referer;

    if (!referer) {
      return res.status(422).json({
        message: "referer query parameter required",
      });
    }

    let token;
    if (referer === "admin") token = req.cookies.admin_token;
    if (referer === "user") token = req.cookies.auth_token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "no authentication token, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ FIXED

    if (decoded.role !== referer) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json({ message: "token verified" });
  } catch (error) {
    // ✅ AUTH error, NOT server error
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
