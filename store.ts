import { create } from "zustand";

interface DataProp {
  data: string;
}

interface SetDataProp {
  setData: (newString: string) => void;
}

export const store = create<DataProp & SetDataProp>((set) => ({
  data: "",
  setData: (newString: string) => set({ data: newString }),
}));
