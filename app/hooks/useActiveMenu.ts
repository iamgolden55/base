import { create } from 'zustand'

type ActiveMenuState = {
  activeMenu: string
  setActiveMenu: (menu: string) => void
}

export const useActiveMenu = create<ActiveMenuState>((set) => ({
  activeMenu: 'dashboard',
  setActiveMenu: (menu) => set({ activeMenu: menu }),
})) 