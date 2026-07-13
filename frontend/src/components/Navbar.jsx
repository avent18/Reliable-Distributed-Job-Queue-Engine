

const Navbar = () => {
  return (
    <nav className="w-full bg-slate-900 border-b border-slate-700 px-8 py-4 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Reliable Job Queue
        </h1>
        <p className="text-sm text-slate-400">
          Real-Time Queue Monitoring Dashboard
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-sm font-medium text-green-400">
          System Online
        </span>
      </div>
    </nav>
  );
};

export default Navbar;