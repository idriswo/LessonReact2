import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAtom } from 'jotai';

import { useZustandStore } from './zustand';
import { type RootState } from './store/store';
import { addRTKUser, deleteRTKUser, editRTKUser } from './reducer/dataSlice';
import { jotaiDataAtom, addJotaiAtom, deleteJotaiAtom, editJotaiAtom } from './jotai.atom';

function App() {
  // === 1. ZUSTAND ===
  const zustandData = useZustandStore((state) => state.data);
  const addZustand = useZustandStore((state) => state.addUser);
  const deleteZustand = useZustandStore((state) => state.deleteUser);
  const editZustand = useZustandStore((state) => state.editUser);

  // === 2. REDUX TOOLKIT ===
  const rtkData = useSelector((state: RootState) => state.data.data);
  const dispatch = useDispatch();

  // === 3. JOTAI ===
  const [jotaiData] = useAtom(jotaiDataAtom);
  const [, addJotai] = useAtom(addJotaiAtom);
  const [, deleteJotai] = useAtom(deleteJotaiAtom);
  const [, editJotai] = useAtom(editJotaiAtom);

  // === СТЕЙТҲОИ ФОРМА (Variables for our 6 inputs) ===
  const [nom, setNom] = useState('');
  const [familya, setFamilya] = useState('');

  const [sol, setSol] = useState('');
  const [soliTavallud, setSoliTavallud] = useState('');

  const [nomiJoyiKor, setNomiJoyiKor] = useState('');
  const [nomiShahr, setNomiShahr] = useState('');

  // Барои фаҳмидани он ки ҳоло илова мекунем ё таҳрир (edit)
  // Агар editId рақам бошад, яъне мо таҳрир дорем. Агар null бошад, яъне илова.
  const [editId, setEditId] = useState<number | null>(null);

  // Функсия барои тоза кардани ҳамаи input-ҳо
  function clearInputs() {
    setNom('');
    setFamilya('');
    setSol('');
    setSoliTavallud('');
    setNomiJoyiKor('');
    setNomiShahr('');
  }

  // === ФУНКСИЯҲОИ АСОСӢ ===

  // Вақте ки тугмаи "САБТ / ИЛОВА" пахш мешавад
  function handleAddOrEdit(e: React.FormEvent) {
    e.preventDefault(); // Саҳифаро аз навсозӣ бозмедорад

    if (editId !== null) {
      editZustand({ id: editId, nom: nom, familya: familya });

      dispatch(editRTKUser({ id: editId, sol: sol, soliTavallud: soliTavallud }));

      // 3. Jotai
      editJotai({ id: editId, nomiJoyiKor: nomiJoyiKor, nomiShahr: nomiShahr });

      setEditId(null);

    } else {

      const newId = Date.now();

      addZustand({ id: newId, nom: nom, familya: familya });

      dispatch(addRTKUser({ id: newId, sol: sol, soliTavallud: soliTavallud }));

      // 3. Jotai
      addJotai({ id: newId, nomiJoyiKor: nomiJoyiKor, nomiShahr: nomiShahr });
    }

    // Дар охир input-ҳоро тоза мекунем
    clearInputs();
  }

  // Вақте ки тугмаи "Delete" пахш мешавад
  function handleDelete(id: number) {
    deleteZustand(id);
    dispatch(deleteRTKUser(id));

    // 3. Jotai
    deleteJotai(id);
  }

  // Вақте ки тугмаи "Edit" пахш мешавад
  function handleEdit(id: number) {
    setEditId(id); // Ба система мегӯем, ки мо ҳамин ID-ро таҳрир карданӣ ҳастем

    // Маълумотро аз мағозаҳо (stores) меҷӯем ва ба input-ҳо мегузорем
    const zUser = zustandData.find((u) => u.id === id);
    if (zUser) {
      setNom(zUser.nom);
      setFamilya(zUser.familya);
    }

    const rUser = rtkData.find((u) => u.id === id);
    if (rUser) {
      setSol(rUser.sol);
      setSoliTavallud(rUser.soliTavallud);
    }

    const jUser = jotaiData.find((u) => u.id === id);
    if (jUser) {
      setNomiJoyiKor(jUser.nomiJoyiKor);
      setNomiShahr(jUser.nomiShahr);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Коди Осонфаҳм (Junior Level)</h1>

      {/* ФОРМА */}
      <form onSubmit={handleAddOrEdit} className="border p-4 bg-gray-100 rounded-lg mb-8">
        <h2 className="font-bold text-lg mb-4">Маълумотҳоро дохил кунед:</h2>

        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 border rounded">
            <h3 className="font-bold text-blue-600">Zustand</h3>
            <input required placeholder="Ном" value={nom} onChange={(e) => setNom(e.target.value)} className="border p-2 m-2" />
            <input required placeholder="Насаб" value={familya} onChange={(e) => setFamilya(e.target.value)} className="border p-2 m-2" />
          </div>

          <div className="bg-white p-4 border rounded">
            <h3 className="font-bold text-purple-600">Redux Toolkit</h3>
            <input required placeholder="Сол" value={sol} onChange={(e) => setSol(e.target.value)} className="border p-2 m-2" />
            <input required placeholder="Соли таваллуд" value={soliTavallud} onChange={(e) => setSoliTavallud(e.target.value)} className="border p-2 m-2" />
          </div>

          <div className="bg-white p-4 border rounded">
            <h3 className="font-bold text-orange-600">Jotai</h3>
            <input required placeholder="Ҷойи кор" value={nomiJoyiKor} onChange={(e) => setNomiJoyiKor(e.target.value)} className="border p-2 m-2" />
            <input required placeholder="Шаҳр" value={nomiShahr} onChange={(e) => setNomiShahr(e.target.value)} className="border p-2 m-2" />
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="bg-blue-600 text-white p-3 rounded">
            {editId ? "САБТ КАРДАН (Edit)" : "ИЛОВА КАРДАН (Add)"}
          </button>

          {editId && (
            <button type="button" onClick={() => { setEditId(null); clearInputs(); }} className="bg-gray-400 text-white p-3 rounded ml-4">
              БЕКОР КАРДАН (Cancel)
            </button>
          )}
        </div>
      </form>

      {/* РӮЙХАТ */}
      <div>
        <h2 className="font-bold text-lg mb-4">Рӯйхати одамон:</h2>
        <div className="flex flex-col gap-4">
          {zustandData.map((zUser) => {
            // Мо аз RTK ва Jotai маълумотро бо ҳамон ID меёбем, то дар якҷоягӣ намоиш диҳем
            const rUser = rtkData.find((u) => u.id === zUser.id);
            const jUser = jotaiData.find((u) => u.id === zUser.id);

            return (
              <div key={zUser.id} className="border p-4 bg-white flex justify-between items-center rounded shadow">
                <div>
                  <p className="font-bold text-blue-600">Ном ва насаб: {zUser.nom} {zUser.familya}</p>
                  <p className="font-bold text-purple-600">Сол: {rUser?.sol}, Таваллуд: {rUser?.soliTavallud}</p>
                  <p className="font-bold text-orange-600">Кор: {jUser?.nomiJoyiKor}, Шаҳр: {jUser?.nomiShahr}</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleEdit(zUser.id)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                  <button onClick={() => handleDelete(zUser.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;