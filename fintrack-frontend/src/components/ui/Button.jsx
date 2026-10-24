export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const styles = {
    primary:
      "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700",

    secondary:
      "bg-white text-slate-700 border border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600",

    danger:
      "bg-red-600 text-white border border-red-600 hover:bg-red-700",
  };

  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        h-11
        w-auto
        px-5
        rounded-xl
        font-medium
        text-sm
        transition-all
        duration-300
        shadow-sm
        hover:shadow-md
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}