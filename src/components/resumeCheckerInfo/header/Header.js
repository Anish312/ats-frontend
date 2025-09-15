import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon"></span> Anish Dev
      </div>

      <nav className="nav">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <button className="btn">Upload Resume</button>
      </nav>
    </header> 
  );
}

export default Header;
