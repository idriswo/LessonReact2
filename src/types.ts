export interface BaseId {
  id: number;
}

export interface ZustandUser extends BaseId {
  nom: string;
  familya: string;
}

export interface RTKUser extends BaseId {
  sol: string;
  soliTavallud: string;
}

export interface JotaiUser extends BaseId {
  nomiJoyiKor: string;
  nomiShahr: string;
}