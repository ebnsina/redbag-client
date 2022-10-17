function Layout({ className, children }) {
  return (
    <main className={`container mx-auto px-4 md:px-0 ${className}`}>
      {children}
    </main>
  );
}

export default Layout;
