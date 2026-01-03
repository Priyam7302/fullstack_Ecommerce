import "./Loader.css";


const Loader = ({ size = "large" }) => {
  if (size === "small") {
    return (
      <div className="loader-small">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;

