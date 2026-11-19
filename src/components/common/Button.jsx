import { twMerge } from "tailwind-merge";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={twMerge(
      "w-full rounded-xl bg-black px-5 py-3.5 font-semibold text-white transition hover:bg-gray-800",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;