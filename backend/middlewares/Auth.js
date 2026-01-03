// import jwt from "jsonwebtoken";
// import "dotenv/config";


// export async function checkAuth(req, res, next) {
//   try {
//     const token = req.cookies.auth_token;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "You need to log in to perform this action" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); 
//     req.userId = decoded.id;
//     req.role = decoded.role;

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }


// export async function checkForlogin(req, res) {
//   try {
//     const referer = req.query.referer;

//     if (!referer) {
//       return res.status(422).json({
//         message: "referer query parameter required",
//       });
//     }

//     let token;
//     if (referer === "admin") token = req.cookies.admin_token;
//     if (referer === "user") token = req.cookies.auth_token;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "no authentication token, access denied" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); 

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

/* =========================
   CHECK AUTH (USER)
   Protect user routes
========================= */
export function checkAuth(req, res, next) {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        message: "You need to log in to perform this action",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

/* =========================
   CHECK ROLE (USER / ADMIN)
   Generic & scalable
========================= */
export function checkRole(requiredRole) {
  return (req, res, next) => {
    try {
      const token =
        requiredRole === "admin"
          ? req.cookies.admin_token
          : req.cookies.auth_token;

      if (!token) {
        return res.status(401).json({
          message: "Authentication token missing",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== requiredRole) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      req.userId = decoded.id;
      req.role = decoded.role;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  };
}

/* =========================
   CHECK LOGIN STATUS
   Frontend auth check
========================= */
export function checkForLogin(req, res) {
  try {
    const { referer } = req.query;

    if (!referer) {
      return res.status(422).json({
        message: "referer query parameter required",
      });
    }

    let token;
    if (referer === "admin") token = req.cookies.admin_token;
    if (referer === "user") token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== referer) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    return res.status(200).json({
      message: "Token verified",
      role: decoded.role,
      userId: decoded.id,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
