import React from "react";
import "./GoogleButton.css";

const GoogleButton = ({ onClick, loading }) => {
  return (
    <button
      type="button"
      className="google-btn"
      onClick={onClick}
      disabled={loading}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="google"
      />
      <span>{loading ? "Connecting..." : "Continue with Google"}</span>
    </button>
  );
};

export default GoogleButton;
