
import { Input as AntInput } from "antd";
import { twMerge } from "tailwind-merge";

const Input = ({
  type = "text",
  className = "",
  ...props
}) => {
  const Component =
    type === "password" ? AntInput.Password : AntInput;

  return (
    <Component
      {...props}
      className={twMerge(
        "w-full rounded-xl bg-gray-50 px-4 text-sm",
        className
      )}
    />
  );
};

export default Input;
