import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import instance from "../axiosConfig";
import { toast } from "react-toastify";

function Register() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    username: "",
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  /* ======================
     NAME VALIDATION
     Only letters & spaces
  ====================== */
  const nameRegex = /^[A-Za-z\s]+$/;
  const isNameValid = nameRegex.test(data.name);

  /* ======================
     USERNAME VALIDATION
     Must not start with number
  ====================== */
  const usernameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
  const isUsernameValid = usernameRegex.test(data.username);

  /* ======================
     PHONE VALIDATION (INDIA)
  ====================== */
  const phoneDigits = data.phone.replace(/\D/g, "");
  const countryCode = "91";

  let localPhone = "";
  if (phoneDigits.startsWith(countryCode)) {
    localPhone = phoneDigits.slice(countryCode.length);
  }

  const isPhoneValid = localPhone.length === 10;

  /* ======================
     GMAIL VALIDATION (STRICT)
  ====================== */
  const email = data.email.trim();

  const hasUppercaseEmail = /[A-Z]/.test(email);
  const hasSpaces = /\s/.test(email);
  const endsWithGmail = email.endsWith("@gmail.com");

  const gmailUsername = endsWithGmail ? email.replace("@gmail.com", "") : "";

  const validChars = /^[a-z0-9.]+$/.test(gmailUsername);
  const noStartDot = !gmailUsername.startsWith(".");
  const noEndDot = !gmailUsername.endsWith(".");
  const noDoubleDot = !gmailUsername.includes("..");
  const minLength = gmailUsername.length >= 6;

  const isEmailValid =
    !hasUppercaseEmail &&
    !hasSpaces &&
    endsWithGmail &&
    validChars &&
    noStartDot &&
    noEndDot &&
    noDoubleDot &&
    minLength;

  /* ======================
     PASSWORD VALIDATION
  ====================== */
  const hasUppercase = /[A-Z]/.test(data.password);
  const hasNumber = /\d/.test(data.password);
  const hasSpecial = /[@$!%*?&]/.test(data.password);
  const hasMinLength = data.password.length >= 8;

  const isPasswordValid =
    hasUppercase && hasNumber && hasSpecial && hasMinLength;

  /* ======================
     FORM VALIDITY CHECK
  ====================== */
  useEffect(() => {
    if (
      isNameValid &&
      isUsernameValid &&
      isPhoneValid &&
      isEmailValid &&
      isPasswordValid
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    isNameValid,
    isUsernameValid,
    isPhoneValid,
    isEmailValid,
    isPasswordValid,
  ]);

  /* ======================
     SUBMIT HANDLER
  ====================== */
  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please correct the highlighted fields");
      return;
    }

    try {
      const payload = {
        ...data,
        email,
        phone: localPhone,
      };

      await instance.post("/user/register", payload);

      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div>
      <h2 className="register-user">Register To Our E-commerce</h2>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
          {!isNameValid && data.name && (
            <small className="error-text">
              Name should contain only letters (no numbers)
            </small>
          )}
        </div>

        {/* PHONE */}
        <div className="form-group">
          <label>Phone</label>
          <PhoneInput
            country={"in"}
            value={data.phone}
            onChange={(phone) => setData({ ...data, phone })}
            inputStyle={{ width: "100%" }}
            required
          />
          {!isPhoneValid && data.phone && (
            <small className="error-text">
              Phone number must be exactly 10 digits after country code
            </small>
          )}
        </div>

        {/* USERNAME */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            required
          />
          {!isUsernameValid && data.username && (
            <small className="error-text">
              Username must start with a letter (not a number)
            </small>
          )}
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          {data.email && !isEmailValid && (
            <small className="error-text">
              Email rules:
              <br />• Only lowercase Gmail allowed
              <br />• Minimum 6 characters before @gmail.com
              <br />• Letters, numbers & dots only
              <br />• No starting/ending dot
              <br />• No consecutive dots
            </small>
          )}
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <ul className="password-rules">
            <li className={hasMinLength ? "valid" : "invalid"}>
              Minimum 8 characters
            </li>
            <li className={hasUppercase ? "valid" : "invalid"}>
              At least one uppercase letter
            </li>
            <li className={hasNumber ? "valid" : "invalid"}>
              At least one number
            </li>
            <li className={hasSpecial ? "valid" : "invalid"}>
              At least one special character
            </li>
          </ul>
        </div>

        <button type="submit" disabled={!isFormValid}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
