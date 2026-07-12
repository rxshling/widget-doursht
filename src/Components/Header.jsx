import { useState, useEffect } from 'react';

// Added isLocked prop
export default function Header({ onAddClick, onMenuClick, isLocked }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  }).toUpperCase();

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true
  });

  const currentDayOfWeek = currentTime.getDay();

  return (
    <header
      className="mb-3 select-none transition-all duration-300"
      // DYNAMIC DRAG REGION: Disables dragging if isLocked is true!
      style={{ WebkitAppRegion: isLocked ? 'no-drag' : 'drag' }}
    >
      <div className={`bg-[#fdfaf4] rounded-2xl p-3 flex justify-between items-center shadow-sm border transition-colors ${
        isLocked ? 'border-[#f3eee5]' : 'border-amber-300 shadow-amber-200/50'
      }`}>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onMenuClick}
              className="text-lg drop-shadow-sm hover:scale-110 transition-transform cursor-pointer"
              style={{ WebkitAppRegion: 'no-drag' }}
            >
              🌼
            </button>
            <h1 className="text-xs font-bold tracking-widest text-slate-800 mt-0.5">{formattedDate}</h1>
          </div>

          <div className="flex gap-1 ml-6 mt-0.5">
            {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
              <div
                key={dayIndex}
                className={`w-1.5 h-1.5 rounded-full transition-colors shadow-sm ${
                  dayIndex === currentDayOfWeek ? 'bg-amber-300' : 'bg-amber-100'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="text-sm font-black text-slate-700 tracking-wider mt-0.5">
            {formattedTime}
          </h2>
          <button
            onClick={onAddClick}
            className="text-xl hover:scale-110 active:scale-95 transition-transform drop-shadow-md cursor-pointer"
            style={{ WebkitAppRegion: 'no-drag' }}
          >
            <span className="text-amber-400 font-black">+</span>
          </button>
        </div>

      </div>
    </header>
  );
}