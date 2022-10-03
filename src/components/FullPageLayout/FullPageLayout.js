const FullPageLayout = ({ children, ref }) => {
  return (
    <section
      ref={ref}
      className="overflow-hidden min-h-[calc(100vh_-_theme(headerAndFooterHeight))] container mx-auto  p-4"
    >
      {children}
    </section>
  );
};

export default FullPageLayout;
