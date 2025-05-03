import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";

// Default values shown
interface SpinnerProps {
  size: string;
  color: string;
  speed: string;
}
const Spinner = ({ size, color, speed }: SpinnerProps) => {
  return <Bouncy size={size} speed={speed} color={color} />;
};

export default Spinner;
