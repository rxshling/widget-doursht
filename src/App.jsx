import { useState, useEffect } from 'react';
import WidgetLayout from './layouts/WidgetLayout';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Filters from './components/Filters';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { initialTasks } from './utils/mockData';
import Trashbin from './components/Trashbin';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('hq-tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hq-theme') || 'translucent';
  });

  // --- NEW EDIT MODE STATE ---
  const [isEditMode, setIsEditMode] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Tasks');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [sortBy, setSortBy] = useState('Due Date');
  const [filterBy, setFilterBy] = useState('All');

  useEffect(() => {
    localStorage.setItem('hq-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('hq-theme', theme);
  }, [theme]);

  // --- THE "ENTER" KEY LISTENER ---
  useEffect(() => {
    if (!isEditMode) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') saveAndExitEditMode();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditMode]);

  // Sends the signal to the backend to lock the size and position!
  const saveAndExitEditMode = () => {
    setIsEditMode(false);
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send('save-bounds');
    }
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
      setEditingTask(null);
    } else {
      const newTask = { ...taskData, id: Date.now(), status: 'todo' };
      setTasks([...tasks, newTask]);
      setIsAddingTask(false);
    }
  };

  const getProcessedTasks = () => {
    let processed = tasks.filter(t => t.status !== 'trashed');
    if (filterBy === 'Done') processed = processed.filter(t => t.status === 'done');
    else if (filterBy === 'To-Do') processed = processed.filter(t => t.status === 'todo');

    processed.sort((a, b) => {
      if (sortBy === 'Due Date') return (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31');
      if (sortBy === 'Category') return (a.category || '').localeCompare(b.category || '');
      if (sortBy === 'Energy') return (b.energyNeeded || 0) - (a.energyNeeded || 0);
      return 0;
    });
    return processed;
  };

  const renderMainContent = () => {
    if (activeTab === 'Settings') {
      return (
        // Removed 'relative', added pb-2 so it doesn't touch the absolute bottom edge
        <div className="flex flex-col h-full animate-in fade-in duration-300 pb-2">
          <Header onAddClick={() => setIsAddingTask(true)} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Removed flex-1 from here so it only takes the space it actually needs! */}
          <div className="mt-4 flex flex-col gap-2">
            <h2 className="text-xs font-black tracking-[0.2em] text-slate-400 mb-2 border-b border-white/30 pb-2">PREFERENCES</h2>

            {/* Theme Settings */}
            <div className="flex justify-between items-center bg-white/40 p-4 rounded-2xl border border-white/50 shadow-sm">
              <span className="font-bold text-sm text-slate-700">Glassmorphism UI</span>
              <button
                onClick={() => setTheme(theme === 'cream' ? 'translucent' : 'cream')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'translucent' ? 'bg-[#a3d996]' : 'bg-slate-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'translucent' ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* Edit Layout Button */}
            <div className="flex justify-between items-center bg-white/40 p-4 rounded-2xl border border-white/50 shadow-sm">
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-700">Layout & Position</span>
                <span className="text-[9px] font-bold text-slate-400">Move and resize widget</span>
              </div>
              <button
                onClick={() => setIsEditMode(true)}
                className="bg-slate-700 hover:bg-slate-800 text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-colors shadow-sm active:scale-95"
              >
                EDIT
              </button>
            </div>
          </div>

          {/* --- PERFECT FLEXBOX FOOTER --- */}
          {/* mt-auto dynamically shoves this to the very bottom of the window safely */}
          <div className="mt-auto pt-4 text-center opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-[9px] font-black tracking-widest text-slate-400 uppercase">
              Designed & Built By
            </p>
            <p className="text-xs font-bold text-slate-700 mt-0.5">
              ryshxxx
            </p>
            <p className="text-[8px] tracking-wider text-slate-400 mt-1">
              v1.0.0
            </p>
          </div>

        </div>
      );
    }

    if (activeTab === 'Tasks') {
      if (isAddingTask || editingTask) {
        return <AddTaskForm theme={theme} initialData={editingTask} onSave={handleSaveTask} onCancel={() => { setIsAddingTask(false); setEditingTask(null); }} />;
      }
      return (
        <>
          <Header onAddClick={() => setIsAddingTask(true)} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Filters theme={theme} sortBy={sortBy} setSortBy={setSortBy} filterBy={filterBy} setFilterBy={setFilterBy} />
          <TaskList tasks={getProcessedTasks()} setTasks={setTasks} onEditClick={(task) => setEditingTask(task)} />
        </>
      );
    }

    if (activeTab === 'Trashbin') {
      return (
        <div className="flex flex-col h-full animate-in fade-in duration-300">
          <Header onAddClick={() => setIsAddingTask(true)} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Trashbin tasks={tasks} setTasks={setTasks} theme={theme} />
        </div>
      );
    }

    return (
      <>
        <Header onAddClick={() => setIsAddingTask(true)} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-col items-center justify-center h-64 text-slate-400 opacity-70">
          <span className="text-4xl mb-2">🚧</span>
          <h2 className="text-sm font-black tracking-widest">{activeTab.toUpperCase()}</h2>
        </div>
      </>
    );
  };

  return (
    <>
      {/* THE EDIT MODE OVERLAY */}
      {isEditMode && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border-[3px] border-amber-400 rounded-3xl animate-in fade-in duration-200"
          style={{ WebkitAppRegion: 'drag' }}
        >
          <div className="bg-white/10 p-5 rounded-3xl text-center flex flex-col items-center gap-3 shadow-2xl border border-white/20" style={{ WebkitAppRegion: 'no-drag' }}>
            <span className="text-4xl">📏</span>
            <h2 className="text-white font-black tracking-widest text-sm">EDIT MODE</h2>
            <p className="text-slate-300 text-[10px] font-bold max-w-[200px] leading-relaxed">
              Drag anywhere to move.<br/>Pull the edges to resize.
            </p>
            <button
              onClick={saveAndExitEditMode}
              className="mt-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-[11px] tracking-widest px-6 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              SAVE (ENTER)
            </button>
          </div>
        </div>
      )}

      {/* NORMAL APP RENDER */}
      <WidgetLayout
        theme={theme}
        sidebar={<Sidebar isOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} closeSidebar={() => setIsSidebarOpen(false)} />}
      >
        {renderMainContent()}
      </WidgetLayout>
    </>
  );
}

export default App;