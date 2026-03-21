"use client";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  size = "md",
}) {
  const sizeClasses =
    size === "sm"
      ? "text-xs sm:text-sm md:text-base"
      : size === "lg"
        ? "text-base sm:text-lg md:text-2xl"
        : "text-sm sm:text-base md:text-xl";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`mt-0.5 p-2 md:mt-2 md:p-3 bg-amber-300 text-black font-semibold rounded-full hover:bg-amber-200 transition pointer-events-auto shadow-[0_4px_20px_rgba(255,200,100,0.4)] ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
}

