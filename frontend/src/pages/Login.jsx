// import axios from "axios";
// import { useNavigate, Link, useParams } from "react-router-dom";
// import { useAuth } from "../contexts/AuthProvider";
// import { useState } from "react";
// import instance from "../axiosConfig";
// import { GoogleLogin } from "@react-oauth/google";


// function Login() {
//   const { checkIsLoggedIn } = useAuth();
//   const { setIsLoggedIn } = useAuth();
//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });


//   function handleChange(e) {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const response = await instance.post(
//         "/user/login",
//         data,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.status == 200) {
//         checkIsLoggedIn();
//         const params1 = new URLSearchParams(window.location.search);
//         console.log(params1);
//         for (const [key, value] of params1.entries()) {
//           if (key === "nextPage") navigate(value);
//         }
//       }
//       console.log("Login success:", response.data);
//       alert("Login successful!");
//       // setIsLoggedIn(true);

//       // navigate("/"); // go to home page
//     } catch (error) {
//       console.log("Login error:", error);
//       alert("Invalid email or password");
//     }
//   }

//   async function handleGoogleSuccess(credentialResponse) {
//     try {
//       await instance.post("/user/google-login", {
//         token: credentialResponse.credential,
//       });

//       alert("Google login successful");
//       setIsLoggedIn(true);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       alert("Google login failed");
//     }
//   }
//   function handleGoogleError() {
//     alert("Google Login Failed");
//   }

//   return (
//     <div>
//       <h2 className="login-user">Login To your Account</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             placeholder="Enter Your Email"
//             name="email"
//             value={data.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             placeholder="Enter Your Password"
//             name="password"
//             value={data.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>*
//         <div className="text-center  w-3xs">
//           <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={handleGoogleError}
//           />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import instance from "../axiosConfig";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

function Login() {
const { checkUserLogin, setIsUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  /* ======================
     NORMAL LOGIN
  ====================== */
 async function handleSubmit(e) {
   e.preventDefault();

   try {
     const response = await instance.post("/user/login", data, {
       withCredentials: true,
     });

     if (response.status === 200) {
       const role = response.data?.user?.role;

    
       if (role === "admin") {
         toast.error("Admin must login from admin panel");

      
         await instance.post("/user/logout", {}, { withCredentials: true });

         navigate("/admin/login");
         return;
       }

   
       toast.success("Login successful");

       checkUserLogin();
       setIsUserLoggedIn(true);

       const params = new URLSearchParams(window.location.search);
       const nextPage = params.get("nextPage");

       navigate(nextPage || "/");
     }
   } catch (error) {
     console.error("Login error:", error);
     toast.error(error.response?.data?.message || "Invalid email or password");
   }
 }


  async function handleGoogleSuccess(credentialResponse) {
    try {
      const response = await instance.post(
        "/user/google-login",
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      const role = response.data?.user?.role;

      if (role === "admin") {
        toast.error("Admin must login from admin panel");

        await instance.post("/user/logout", {}, { withCredentials: true });

        navigate("/admin/login");
        return;
      }

      toast.success("Google login successful");

      checkUserLogin();
      setIsUserLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    }
  }


  function handleGoogleError() {
    toast.error("Google login failed");
  }

  return (
    <div>
      {/* <h2 className="login-user">Login To your Account</h2> */}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
        <div className="text-center w-3xs">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      <p className="auth-switch">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </p>
      </form>
    </div>
  );
}

export default Login;
