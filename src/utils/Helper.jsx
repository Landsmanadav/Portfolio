export function getBouncyText(text = "") {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className="bouncy-text"
      style={{ animationDelay: `${i * 0.1}s` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}
