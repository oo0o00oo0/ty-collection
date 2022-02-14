import create from "zustand"

export const useStore = create((set, get) => ({
  stateTest: null,
  setStateTest: (v) => set({ stateTest: v }),
}))
