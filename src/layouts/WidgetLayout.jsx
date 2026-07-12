export default function WidgetLayout({ sidebar, children, theme }) {

  // We define our two themes here!
  const creamTheme = "bg-[#fdfaf4] border-4 border-[#7ea6eb]";
  const translucentTheme = "bg-black/10 backdrop-blur-3xl border border-white/10 transform-gpu";

  return (
    <div className={`min-h-screen text-slate-700 font-sans rounded-3xl p-4 relative overflow-hidden transition-all duration-500 ${
      theme === 'cream' ? creamTheme : translucentTheme
    }`}>

      {sidebar}

      <main className="h-full relative z-0">
        {children}
      </main>

    </div>
  );
}
// This is the main container mapping to your design: cream background, blue border
// The 'children' prop is where we will inject the Header, Filters, and Task List later.
// This keeps our layout code completely separated from our feature code!


