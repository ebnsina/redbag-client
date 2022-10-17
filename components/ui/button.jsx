function Button({ className, children, ...rest }) {
  const primaryClasses = `px-4 py-3 w-full font-medium border border-transparent bg-sky-500 text-white inline-block rounded-xl transition hover:bg-transparent hover:text-sky-500 hover:border-sky-500 focus:ring focus:ring-rose-600`;

  return (
    <button className={`${primaryClasses} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
