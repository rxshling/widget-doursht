import { useState } from 'react';

export default function Filters({ theme, sortBy, setSortBy, filterBy, setFilterBy }) {
  // We only keep the expand/collapse state locally!
  const [isExpanded, setIsExpanded] = useState(false);

  const activeBubble = "bg-amber-100 text-amber-700 border-amber-200 font-black shadow-inner";
  const inactiveBubble = "bg-[#fdfaf4] text-slate-500 border-[#f3eee5] hover:bg-white shadow-sm";

  const toggleBtnStyle = theme === 'cream'
    ? "text-slate-500 bg-slate-100 border-slate-200 hover:bg-slate-200 hover:text-slate-700"
    : "text-slate-100 bg-white/10 border-white/20 hover:text-white hover:bg-white/20 drop-shadow-md";

  return (
    <div className="flex flex-col gap-2 mb-3 px-1 transition-all duration-300">

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-[10px] font-black tracking-wider flex items-center gap-1 transition-colors px-2 py-1 rounded-full border ${toggleBtnStyle}`}
        >
          ⚙️ CHANGE FILTERS <span className="text-sm leading-none ml-0.5">{isExpanded ? '⌃' : '⌄'}</span>
        </button>

        {!isExpanded && (
          <div className="flex gap-1.5 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className={`px-2.5 py-0.5 rounded-full border text-[9px] ${activeBubble}`}>
              {sortBy}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full border text-[9px] ${activeBubble}`}>
              {filterBy}
            </span>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="flex flex-col gap-2.5 text-[9px] font-bold text-slate-500 bg-[#fdfaf4] p-3 rounded-2xl border border-white/40 shadow-md animate-in slide-in-from-top-2 fade-in duration-200 mt-1">

          <div className="flex items-center gap-2">
            <span className="text-slate-400 mr-1 font-black tracking-wider w-12">Sort by:</span>
            {['Due', 'Category', 'Energy'].map(opt => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`px-2.5 py-1 rounded-full border transition-all ${sortBy === opt ? activeBubble : inactiveBubble}`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 mr-1 font-black tracking-wider w-12">Filter by:</span>
            {['All', 'Done', 'To-Do'].map(opt => (
              <button
                key={opt}
                onClick={() => setFilterBy(opt)}
                className={`px-2.5 py-1 rounded-full border transition-all ${filterBy === opt ? activeBubble : inactiveBubble}`}
              >
                {opt}
              </button>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}