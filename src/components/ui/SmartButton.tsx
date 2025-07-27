import { useUi } from "@/context/UiContext";
import { Button } from "./button";
import { ComponentProps } from "react";

type SmartButtonProps = ComponentProps<typeof Button>;

function SmartButton(props: SmartButtonProps) {
  const { setCursorHover } = useUi();

  return (
    <Button
      {...props}
      onMouseEnter={() => setCursorHover(true)}
      onMouseLeave={() => setCursorHover(false)}
    />
  );
}
export default SmartButton;
