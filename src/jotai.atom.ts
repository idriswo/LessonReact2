import { atom } from 'jotai';
import type { JotaiUser } from './types';

// Атоми асосӣ барои нигоҳ доштани маълумот
export const jotaiDataAtom = atom<JotaiUser[]>([
  {
    id: 1,
    nomiJoyiKor: "IT",
    nomiShahr: "Dushanbe",
  }
]);

// Функсияи илова кардан  
export const addJotaiAtom = atom(
  null,
  (get, set, user: JotaiUser) => {
    set(jotaiDataAtom, [...get(jotaiDataAtom), user]);
  }
);

// Функсияи нест кардан
export const deleteJotaiAtom = atom(
  null,
  (get, set, id: number) => {
    set(jotaiDataAtom, get(jotaiDataAtom).filter((u) => u.id !== id));
  }
);

// Функсияи таҳрир кардан
export const editJotaiAtom = atom(
  null,
  (get, set, user: JotaiUser) => {
    set(jotaiDataAtom, get(jotaiDataAtom).map((u) => {
      if (u.id === user.id) {
        return user;
      }
      return u;
    }));
  }
);
