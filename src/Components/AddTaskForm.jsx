import { useState } from 'react';

// Added the theme prop here!
export default function AddTaskForm({ onSave, onCancel, initialData, theme, isLocked }) {
    const [formData, setFormData] = useState(initialData || {
    category: '',
    title: '',
    dueDate: '', // This will now store dates like "YYYY-MM-DD"
    energyNeeded: 3,
    details: '',
    links: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    onSave(formData);
  };

  // Dynamic Styles: Dark text for Cream theme, Bright text for Translucent theme!
  const labelStyle = theme === 'cream' ? 'text-slate-500' : 'text-slate-100 drop-shadow-md';
  const headingStyle = theme === 'cream' ? 'text-slate-500' : 'text-white drop-shadow-md';

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 p-1">

      {/* DYNAMIC DRAG REGION FOR THE FORM HEADER */}
      <div
        className="flex justify-between items-center mb-4 select-none"
        style={{ WebkitAppRegion: isLocked ? 'no-drag' : 'drag' }}
      >
        <h2 className={`text-[11px] font-black tracking-[0.2em] ${headingStyle}`}>
          {initialData ? 'EDIT TASK' : 'NEW TASK'}
          {!isLocked && <span className="ml-2 text-amber-300 text-[9px] tracking-normal">🔓 UNLOCKED</span>}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-lg hover:scale-110 active:scale-95 transition-transform text-slate-400 hover:text-rose-400 cursor-pointer"
          style={{ WebkitAppRegion: 'no-drag' }}
        >
          ✖
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-2" style={{ WebkitAppRegion: 'no-drag' }}>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            {/* Applied the dynamic labelStyle */}
            <label className={`text-[9px] font-bold uppercase tracking-wider ml-1 transition-colors ${labelStyle}`}>Category</label>
            <input
              type="text"
              placeholder="e.g. ART"
              className="bg-white/60 border border-white/40 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-700 focus:outline-none focus:border-amber-300 focus:bg-white transition-colors shadow-sm"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value.toUpperCase()})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={`text-[9px] font-bold uppercase tracking-wider ml-1 transition-colors ${labelStyle}`}>Due Date</label>
            {/* Changed type to "date" to trigger the OS Calendar Picker! */}
            <input
              type="date"
              className="bg-white/60 border border-white/40 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-700 focus:outline-none focus:border-amber-300 focus:bg-white transition-colors shadow-sm w-full"
              value={formData.dueDate}
              onChange={e => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={`text-[9px] font-bold uppercase tracking-wider ml-1 transition-colors ${labelStyle}`}>Task Summary</label>
          <input
            type="text"
            placeholder="e.g. MOSAIC ART OF SELF"
            className="bg-white/60 border border-white/40 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-700 focus:outline-none focus:border-amber-300 focus:bg-white transition-colors shadow-sm"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value.toUpperCase()})}
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={`text-[9px] font-bold uppercase tracking-wider ml-1 transition-colors ${labelStyle}`}>Energy Needed</label>
          <div className="flex gap-2 bg-white/30 p-1.5 rounded-xl border border-white/30 justify-between">
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                type="button"
                onClick={() => setFormData({...formData, energyNeeded: num})}
                className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-all shadow-sm ${
                  formData.energyNeeded === num
                    ? 'bg-amber-300 text-white scale-110'
                    : 'bg-white/80 text-slate-500 hover:bg-white'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={`text-[9px] font-bold uppercase tracking-wider ml-1 transition-colors ${labelStyle}`}>Additional Details</label>
          <textarea
            rows="2"
            className="bg-white/60 border border-white/40 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-700 focus:outline-none focus:border-amber-300 focus:bg-white transition-colors shadow-sm resize-none"
            value={formData.details}
            onChange={e => setFormData({...formData, details: e.target.value})}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={`text-[9px] font-bold uppercase tracking-wider ml-1 transition-colors ${labelStyle}`}>Links</label>
          <input
            type="text"
            placeholder="https://..."
            className="bg-white/60 border border-white/40 rounded-xl px-2.5 py-1.5 text-[11px] text-blue-600 focus:outline-none focus:border-amber-300 focus:bg-white transition-colors shadow-sm"
            value={formData.links}
            onChange={e => setFormData({...formData, links: e.target.value})}
          />
        </div>

        <div className="mt-1 pb-2">
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber-300 text-white text-[11px] font-black tracking-widest hover:bg-amber-400 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2"
          >
            SAVE TASK <span className="text-sm">✓</span>
          </button>
        </div>

      </form>
    </div>
  );
}