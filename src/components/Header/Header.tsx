import { useUi } from "../../context/UiContext";

const Header = () => {
  const {
    showCursor,
    setShowCursor,
    showBackground,
    setShowBackground,
    theme,
    setTheme,
  } = useUi();

  return (
    <header className="p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl font-bold shadow-lg">
      <span className="site-title">LANDSMAN PORTFOLIO</span>
      <div className="toggles">
        <button onClick={() => setShowCursor((prev) => !prev)}>
          {showCursor ? "Hide Cursor" : "Show Cursor"}
        </button>
        <button onClick={() => setShowBackground((prev) => !prev)}>
          {showBackground ? "Hide Background" : "Show Background"}
        </button>
        <button onClick={() => setTheme((prev) => !prev)}>
          {theme ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
};

export default Header;
