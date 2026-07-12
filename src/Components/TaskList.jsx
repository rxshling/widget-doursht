import { useState } from 'react';

export default function TaskList({ tasks, setTasks, onEditClick }) {
  const [expandedId, setExpandedId] = useState(null);
  const [dragState, setDragState] = useState({ id: null, startX: 0, currentX: 0 });
  const [revealedTrashId, setRevealedTrashId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    setRevealedTrashId(null);
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status: t.status === 'todo' ? 'done' : 'todo' } : t
    ));
  };

  const handleTrash = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'trashed' } : t));
    setRevealedTrashId(null);
  };

  const onPointerDown = (e, id) => {
    setDragState({ id, startX: e.clientX, currentX: e.clientX });
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e, id) => {
    if (dragState.id === id) {
      setDragState(prev => ({ ...prev, currentX: e.clientX }));
    }
  };

  const onPointerUp = (e, id) => {
    if (dragState.id === id) {
      const draggedDistance = dragState.currentX - dragState.startX;
      if (draggedDistance < -40) {
        setRevealedTrashId(id);
      } else {
        setRevealedTrashId(null);
      }
      setDragState({ id: null, startX: 0, currentX: 0 });
    }
  };

  // Add this formatting helper!
  const formatDisplayDate = (dateString) => {
    // If it's empty or old dummy data, just return it as is
    if (!dateString || !dateString.includes('-')) return dateString;

    // Convert YYYY-MM-DD into a localized Date object
    const [year, month, day] = dateString.split('-');
    const d = new Date(year, month - 1, day);

    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
    return `${formatted} | ${weekday}`.toUpperCase();
  };

  return (
    // Reduced spacing between tasks to space-y-2
    <div className="space-y-2 max-h-[440px] overflow-y-auto pb-4 [&::-webkit-scrollbar]:hidden">
      {tasks.map(task => {
        const isDone = task.status === 'done';
        const isExpanded = expandedId === task.id;
        const isRevealed = revealedTrashId === task.id;

        let translateX = 0;
        if (dragState.id === task.id) {
          translateX = Math.min(0, Math.max(-60, dragState.currentX - dragState.startX));
        } else if (isRevealed) {
          translateX = -50;
        }

        return (
          <div key={task.id} className={`transition-opacity duration-300 ${isDone ? 'opacity-60' : 'opacity-100'}`}>
            <div className="relative z-10">

              <div className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-rose-200 rounded-xl z-0">
                <button
                  onClick={() => handleTrash(task.id)}
                  className="w-8 h-8 text-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                >
                  🗑️
                </button>
              </div>

              <div
                onPointerDown={(e) => onPointerDown(e, task.id)}
                onPointerMove={(e) => onPointerMove(e, task.id)}
                onPointerUp={(e) => onPointerUp(e, task.id)}
                onPointerCancel={(e) => onPointerUp(e, task.id)}
                style={{ transform: `translateX(${translateX}px)` }}
                // Reduced padding to p-2.5, rounded to xl instead of 2xl
                className={`flex items-center justify-between p-2.5 rounded-xl border-2 shadow-sm relative z-10 transition-transform ${
                  dragState.id === task.id ? 'cursor-grabbing duration-0' : 'cursor-grab duration-300'
                } ${isDone ? 'bg-slate-100 border-slate-200' : 'bg-white border-[#f3eee5]'}`}
              >
                {/* Reduced gap to gap-2 */}
                <div className="flex items-center gap-2 pointer-events-none overflow-hidden">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleStatus(task.id); }}
                    className="focus:outline-none shrink-0 pointer-events-auto active:scale-95 transition-transform"
                  >
                    {/* Checkbox shrunk to w-6 h-6 */}
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                      isDone ? 'bg-green-400 border-green-500' : 'bg-white border-slate-300'
                    }`}>
                      {isDone && <span className="text-white font-bold text-[10px]">✓</span>}
                    </div>
                  </button>

                  <div className="truncate">
                    {/* Text shrunk to text-[11px] */}
                    <h3 className={`font-bold tracking-wider text-[11px] truncate ${isDone ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {task.category} <span className="text-slate-300">|</span> {task.title}
                    </h3>
                    {/* Subtext shrunk to text-[9px] */}
                    <div className="flex gap-2 text-[9px] font-medium text-slate-400 mt-[1px]">
                      <span>DUE: {formatDisplayDate(task.dueDate)}</span>
                      <span>Energy: {task.energyNeeded}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); toggleExpand(task.id); }}
                  // Button shrunk to w-7 h-7
                  className="w-7 h-7 rounded-lg bg-[#a3d996] flex items-center justify-center hover:bg-green-400 active:scale-95 transition-all shadow-sm shrink-0 pointer-events-auto ml-1"
                >
                  <span className="text-white text-sm font-black leading-none pb-0.5">{isExpanded ? '⌃' : '⌄'}</span>
                </button>
              </div>
            </div>

            {isExpanded && (
              // Details completely compacted
              <div className="bg-[#fcf9f2] border-x-2 border-b-2 border-[#f3eee5] rounded-b-xl p-2.5 pt-4 mt-[-10px] text-[10px] text-slate-600 shadow-inner relative z-0">
                <div className="grid grid-cols-[50px_1fr] gap-x-1 gap-y-0.5 items-start">
                  <span className="font-bold text-slate-400">Details:</span>
                  <p className="m-0 leading-tight">{task.details}</p>

                  <span className="font-bold text-slate-400 mt-1">Links:</span>
                  <div className="mt-1">
                    {task.links ? (
                      <a href={task.links} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline truncate inline-block max-w-[190px]">
                        {task.links}
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">None</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-1">
                  <button onClick={() => onEditClick(task)} className="text-sm hover:scale-110 active:scale-95 transition-transform">
                    ✏️
                  </button>
                </div>
              </div>
            )}

          </div>
        )
      })}
    </div>
  );
}