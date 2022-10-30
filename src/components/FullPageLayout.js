const FullPageLayout = ({ children, ref, center }) => {
  return (
    <section
      ref={ref}
      className={`overflow-hidden min-h-[calc(100vh_-_theme(headerAndFooterHeight))] container mx-auto  p-4 ${
        center && "grid place-items-center"
      }`}
    >
      {children}
    </section>
  );
};

export default FullPageLayout;
