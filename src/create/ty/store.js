import create from "zustand"

export const useStore = create((set) => ({
  //Navigation menu
  loaded: false,
  setLoaded: (v) => set({ loaded: v }),

  samsonActive: true,
  setSamsonActive: (v) => set({ samsonActive: v }),
  samsonActive: true,
  set: (v) => set({ loading: v }),

  // toggleFavourites: (apartment) =>
  //   set((state) => ({
  //     favourites: state.favourites.some(
  //       (e) => e[fieldNameMapper.plot] === apartment[fieldNameMapper.plot]
  //     )
  //       ? state.favourites.filter(
  //           (c) => apartment[fieldNameMapper.plot] !== c[fieldNameMapper.plot]
  //         )
  //       : [...state.favourites, apartment],
  //   })),
}))
