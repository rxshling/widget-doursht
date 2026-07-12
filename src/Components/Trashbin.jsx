import { useState } from 'react';

export default function Trashbin({ tasks, setTasks, theme }) {
  // New state to track if the user clicked Empty Trash!
  const [isConfirming, setIsConfirming] = useState(false);

  const trashedTasks = tasks.filter(t => t.status === 'trashed');

  const restoreTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'todo' } : t));
  };

  const deleteForever = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const emptyTrash = () => {
    setTasks(tasks.filter(t => t.status !== 'trashed'));
    setIsConfirming(false); // Reset the state after deleting!
  };

  const textColor = theme === 'cream' ? 'text-slate-500' : 'text-slate-200 drop-shadow-sm';
  const cardBg = theme === 'cream' ? 'bg-white border-[#f3eee5]' : 'bg-white/10 border-white/20 shadow-sm';

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Top Controls */}
      <div className="flex justify-between items-center mb-3 px-1 mt-1 min-h-[24px]">
        <h2 className={`text-[11px] font-black tracking-[0.2em] ${textColor}`}>TRASHBIN</h2>

        {trashedTasks.length > 0 && (
          isConfirming ? (
            // The Confirmation State
            <div className="flex gap-1.5 animate-in slide-in-from-right-2 fade-in duration-200">
              <button
                onClick={() => setIsConfirming(false)}
                className="text-[9px] font-bold text-slate-500 bg-white hover:bg-slate-100 px-2.5 py-1 rounded-full transition-colors shadow-sm"
              >
                CANCEL
              </button>
              <button
                onClick={emptyTrash}
                className="text-[9px] font-bold text-white bg-red-500 hover:bg-red-600 px-2.5 py-1 rounded-full transition-colors shadow-sm"
              >
                SURE?
              </button>
            </div>
          ) : (
            // The Default State
            <button
              onClick={() => setIsConfirming(true)}
              className="text-[9px] font-bold text-rose-50 hover:text-white bg-rose-400 hover:bg-rose-500 px-2.5 py-1 rounded-full transition-colors shadow-sm"
            >
              EMPTY TRASH
            </button>
          )
        )}
      </div>

      {/* The Deleted Tasks List */}
      <div className="space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-4 flex-1">
        {trashedTasks.length === 0 ? (
          <div className={`text-center mt-12 text-[11px] font-bold opacity-60 ${textColor}`}>
            Trash is empty. Clean slate! ✨
          </div>
        ) : (
          trashedTasks.map(task => (
            <div key={task.id} className={`flex items-center justify-between p-2.5 rounded-xl border-2 transition-all ${cardBg}`}>

              <div className="truncate pr-2 opacity-70">
                <h3 className={`font-bold tracking-wider text-[11px] truncate ${theme === 'cream' ? 'text-slate-700' : 'text-white'}`}>
                  {task.category} <span className="text-slate-400">|</span> {task.title}
                </h3>
              </div>

              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => restoreTask(task.id)}
                  className="w-7 h-7 rounded-lg bg-[#a3d996] text-white flex items-center justify-center hover:bg-green-400 hover:scale-110 active:scale-95 transition-all shadow-sm text-lg font-black pb-0.5"
                  title="Restore Task"
                >
                  ↺
                </button>
                <button
                  onClick={() => deleteForever(task.id)}
                  className="w-7 h-7 rounded-lg bg-rose-300 text-white flex items-center justify-center hover:bg-rose-400 hover:scale-110 active:scale-95 transition-all shadow-sm text-xs"
                  title="Delete Forever"
                >
                  ✖
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}