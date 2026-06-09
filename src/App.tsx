import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import { setTodos, updateTodoSync, deleteTodoSync, completeTodoSync, type ToDo } from './reducer/todoSlice';
import axios from 'axios';

const API_URL = 'https://to-dos-api.softclub.tj';

const App = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos } = useSelector((state: RootState) => state.todoSlice);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');


  
  const fetchTodosData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/to-dos`);
      dispatch(setTodos(response.data?.data || response.data));
    } catch (err: any) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, [dispatch]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Description', description);
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append('Images', files[i]);
        }
      }
      await axios.post(`${API_URL}/api/to-dos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setName('');
      setDescription('');
      setFiles(null);
      // Баъд аз илова кардан рӯйхатро аз нав мегирем
      fetchTodosData();
    } catch (err: any) {
      setError(err.response?.data || err.message);
      setLoading(false);
    }
  };

  const handleEdit = (todo: ToDo) => {
    setEditingId(todo.id);
    setEditName(todo.name);
    setEditDescription(todo.description);
  };

  const handleSaveEdit = async () => {
    if (editingId && editName && editDescription) {
      setLoading(true);
      try {
        await axios.put(`${API_URL}/api/to-dos`, { id: editingId, name: editName, description: editDescription });
        // Акшен-и синхрониро фаъол мекунем
        dispatch(updateTodoSync({ id: editingId, name: editName, description: editDescription }));
        setEditingId(null);
        setEditName('');
        setEditDescription('');
      } catch (err: any) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if(window.confirm('Шумо мутмаин ҳастед, ки ин вазифаро нест кардан мехоҳед?')) {
      setLoading(true);
      try {
        await axios.delete(`${API_URL}/api/to-dos?id=${id}`);
        dispatch(deleteTodoSync(id));
      } catch (err: any) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleComplete = async (id: number) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/completed?id=${id}`);
      dispatch(completeTodoSync(id));
    } catch (err: any) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#111827] to-indigo-950 text-slate-100 p-4 md:p-8 lg:p-12 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        
        

        {/* Add Form Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
            <div className="bg-indigo-500/20 p-2 rounded-xl">
               <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
               </svg>
            </div>
            Вазифаи нав
          </h2>
          
          <form onSubmit={handleAdd} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Ном</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Масалан: Хондани китоб..."
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Расмҳо (Ихтиёрӣ)</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-4 py-3 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/20 file:text-indigo-300 hover:file:bg-indigo-500/30 transition-all cursor-pointer shadow-inner"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Тавсиф</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Тафсилоти бештар дар бораи ин вазифа..."
                rows={3}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none shadow-inner"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-500/25 transform transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-70"
            >
              Илова кардан
            </button>
          </form>
        </div>

        {/* Status Indicators */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-400"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-6 py-4 rounded-2xl backdrop-blur-md flex items-center gap-3">
            <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Хатогӣ: {error}
          </div>
        )}

        {/* Todos List Section */}
        <div className="space-y-5 pb-20">
          {todos?.length === 0 && !loading && !error && (
            <div className="text-center py-16 text-slate-400 bg-white/5 backdrop-blur-md rounded-3xl border border-white/5 border-dashed">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <p className="text-xl">Рӯйхат холӣ аст</p>
              <p className="text-sm mt-1">Аввалин вазифаи худро илова кунед!</p>
            </div>
          )}
          
          {todos?.map((todo) => (
            <div 
              key={todo.id} 
              className={`group bg-white/5 backdrop-blur-xl border ${todo.isCompleted ? 'border-emerald-500/30 bg-emerald-900/10' : 'border-white/10'} rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:bg-white/[0.08] relative overflow-hidden`}
            >
              {todo.isCompleted && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 rounded-bl-[100px] flex justify-center items-center pointer-events-none">
                  <svg className="w-8 h-8 text-emerald-400 mb-4 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              
              {editingId === todo.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-900/70 border border-slate-600 rounded-xl px-5 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full bg-slate-900/70 border border-slate-600 rounded-xl px-5 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                    rows={2}
                  />
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                    >
                      Сабт
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    >
                      Бекор
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-10">
                  <div className="flex-1 space-y-3">
                    <h3 className={`text-2xl font-bold tracking-tight ${todo.isCompleted ? 'text-slate-500 line-through decoration-emerald-500/50' : 'text-white'}`}>
                      {todo.name}
                    </h3>
                    <p className={`text-base ${todo.isCompleted ? 'text-slate-500' : 'text-slate-300'}`}>
                      {todo.description}
                    </p>
                    {/* Optional Images */}
                    {todo.images && todo.images.length > 0 && (
                      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
                        {todo.images.map((img, idx) => (
                          <div key={idx} className="relative group/img h-20 w-20 flex-shrink-0">
                            <img 
                              src={`https://to-dos-api.softclub.tj/images/${img}`} 
                              alt="todo-attachment" 
                              className="h-full w-full object-cover rounded-xl border border-white/20 transition-transform duration-300 group-hover/img:scale-105 shadow-md"
                              onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 w-full md:w-auto">
                    {!todo.isCompleted && (
                      <button
                        onClick={() => handleComplete(todo.id)}
                        className="flex-1 md:flex-none justify-center bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        Иҷро
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(todo)}
                      className="flex-1 md:flex-none justify-center bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      Тағйир
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="flex-1 md:flex-none justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Нест
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default App;