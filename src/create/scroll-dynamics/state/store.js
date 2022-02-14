import create from "zustand"

export const useStore = create((set, get) => ({
  scroll: 0,
  setScroll: (v) => set({ scroll: v }),
  totalHeight: null,
  setTotalHeight: (v) => set({ totalHeight: v }),
}))
