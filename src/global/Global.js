

import { create } from "zustand"

export const Global =  create((set) => ({
    busqueda: '',
    setBusqueda: (state) => set({ busqueda: state }),
    busquedaReset: () => set({ busqueda: ''})
}))

