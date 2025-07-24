import { useUi } from "../../context/UiContext";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

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
    <header className="w-full flex items-center px-6 py-3 border-b bg-background">
      {/* כותרת בצד שמאל */}
      <span className="site-title text-lg font-bold order-1 ml-auto">
        LANDSMAN PORTFOLIO
      </span>

      {/* כפתורי ניווט במרכז */}
      <nav className="flex-1 flex justify-center order-2 gap-4">
        {/* כאן אפשר להוסיף בעתיד ניווט */}
        {/* <Button variant="ghost">עמוד ראשי</Button> */}
        {/* <Button variant="ghost">פרויקטים</Button> */}
        {/* <Button variant="ghost">צור קשר</Button> */}
      </nav>

      {/* כפתורי נגישות בצד ימין */}
      <div className="flex items-center gap-2 order-3 mr-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowCursor((prev) => !prev)}
          aria-label={showCursor ? "הסתר סמן" : "הצג סמן"}
          title={showCursor ? "Hide Cursor" : "Show Cursor"}
        >
          {showCursor ? (
            <Icons.cursorOff className="h-5 w-5" />
          ) : (
            <Icons.cursor className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBackground((prev) => !prev)}
          aria-label={showBackground ? "הסתר רקע" : "הצג רקע"}
          title={showBackground ? "Hide Background" : "Show Background"}
        >
          {showBackground ? (
            <Icons.imageOff className="h-5 w-5" />
          ) : (
            <Icons.image className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
            setTheme((prev) => !prev);
          }}
          aria-label={theme ? "Light Mode" : "Dark Mode"}
          title={theme ? "Light Mode" : "Dark Mode"}
        >
          {theme ? (
            <Icons.sun className="h-5 w-5" />
          ) : (
            <Icons.moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
