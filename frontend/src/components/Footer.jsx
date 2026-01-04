import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="WearHaus Logo" />
          </Link>
        </div>

        {/* Brand text */}
        <p>
          WearHaus — your trusted destination for stylish, premium, and
          affordable fashion.
        </p>

        {/* Footer links */}
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>

      {/* Bottom section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} WearHaus. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
