import { useUi } from "../../context/UiContext";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import { sliderToValue, valueToSlider } from "@/utils/helper";
const Header = () => {
  const {
    showCursor,
    setShowCursor,
    showBackground,
    setShowBackground,
    theme,
    setTheme,
    frequency,
    setFrequency,
  } = useUi();

  const [openSettings, setOpenSettings] = useState(false);
  return (
    <div className="header-container">
      <header className="w-full flex items-center px-6 py-3 border-b bg-background">
        {/* כותרת בצד שמאל */}
        <span className="site-title text-lg  order-1 ml-auto">
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
          <Popover open={openSettings} onOpenChange={setOpenSettings}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={openSettings ? "Hide Settings" : "Show Settings"}
                title={openSettings ? "Hide Settings" : "Show Settings"}
              >
                <Icons.settings
                  className={`h-5 w-5 ${
                    openSettings ? "animate-[spin_3s_linear_infinite]" : ""
                  }`}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 ">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Visual Effects</h4>
                  <p className="text-muted-foreground text-sm">
                    Personalize how colors and animations appear throughout your
                    site.
                  </p>
                </div>
                <div className="grid gap-8">
                  <div className="grid  items-center gap-4">
                    <Label htmlFor="colorFrequency">Color Frequency</Label>
                    <Slider
                      onDoubleClick={() => setFrequency(0.001)}
                      value={[valueToSlider(frequency)]}
                      onValueChange={([val]) =>
                        setFrequency(sliderToValue(val))
                      }
                      min={0}
                      max={100}
                      step={1}
                      id="colorFrequency"
                    />
                  </div>
                  {/* <div className="grid  items-center gap-4">
                    <Label htmlFor="colorFrequency">Color Frequency</Label>
                    <Slider id="colorFrequency" />
                  </div> */}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowCursor((prev) => !prev)}
            aria-label={showCursor ? "Hide Cursor" : "Show Cursor"}
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
            aria-label={showBackground ? "Hide Background" : "Show Background"}
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
    </div>
  );
};

export default Header;
