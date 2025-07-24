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

export const MIN = 0.0001;
export const MAX = 0.1;
export const CENTER = 0.001;

const logMin = Math.log10(MIN);
const logMax = Math.log10(MAX);
const logCenter = Math.log10(CENTER);

export function sliderToValue(val: number) {
  const [from, to, base, span] =
    val < 50 ? [logMin, logCenter, 0, 50] : [logCenter, logMax, 50, 50];
  const percent = (val - base) / span;
  return Math.pow(10, from + (to - from) * percent);
}

export function valueToSlider(value: number) {
  const logVal = Math.log10(value);
  if (logVal <= logCenter)
    return ((logVal - logMin) / (logCenter - logMin)) * 50;
  return 50 + ((logVal - logCenter) / (logMax - logCenter)) * 50;
}
