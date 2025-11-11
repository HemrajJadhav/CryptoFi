import { motion } from "framer-motion";

const NeoButton = ({
  children,
  onClick,
  className = "",
  icon: Icon,
  fullWidth = false,
  variant = "primary",
  type = "button",
  isOpen,
}) => {
  const colorClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-[inset_0px_2px_2px_#5796fa]",
    secondary:
      "bg-gray-200 backdrop-blur-xl shadow-[inset_0px_2px_2px_#ffffff] hover:bg-gray-200 text-gray-800",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-[inset_0px_2px_2px_#a61c2f]",
    connect:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-[inset_0px_2px_2px_#5796fa]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      type={type}
      className={`font-bold  border border-transparent p-3 rounded-lg  hover:shadow-sm active:shadow-sm transition-all duration-200 flex items-center  gap-2 cursor-pointer ${
        colorClasses[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {Icon && <Icon className="w-6 h-6" />}
      {children}
    </motion.button>
  );
};

export default NeoButton;
