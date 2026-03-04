interface SpinnerIconProps {
  svgClassName?: string;
  circleClassName?: string;
}

export function SpinnerIcon({ svgClassName, circleClassName }: SpinnerIconProps = {}) {
  return (
    <svg
      className={svgClassName}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={circleClassName}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
