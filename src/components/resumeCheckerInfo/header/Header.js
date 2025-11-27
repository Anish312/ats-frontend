import { useState } from "react";
import "./Header.css";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon"></span> Anish Dev
      </div>

      <nav className={`nav ${open ? "active" : ""}`}>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <button className="btn">Upload Resume</button>
      </nav>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>
    </header>
  );
}

export default Header;
