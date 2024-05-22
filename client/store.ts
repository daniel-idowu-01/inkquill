import { create } from "zustand";
import { useEffect, useRef } from "react";

interface DataProp {
  data: string;
}

interface SetDataProp {
  setData: (newString: string) => void;
}

export const useStore = create<DataProp & SetDataProp>((set) => ({
  data: "",
  setData: (newString: string) => {
    set({ data: newString });
    if (typeof window !== "undefined") {
      localStorage.setItem("dataString", newString);
    }
  },
}));

// Custom hook to handle localStorage on mount
export const useClientStore = () => {
  const store = useStore();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem("dataString");
        if (storedData) {
          store.setData(storedData);
        }
      }
    }
  }, [store]);

  return store;
};
