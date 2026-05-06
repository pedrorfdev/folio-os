import { create } from 'zustand'

type PortfolioStore = {
  activeProjectSlug: string | null
  menuOpen: boolean
  cursorX: number
  cursorY: number
  setActiveProject: (slug: string | null) => void
  setMenuOpen: (open: boolean) => void
  setCursor: (x: number, y: number) => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activeProjectSlug: null,
  menuOpen: false,
  cursorX: 0,
  cursorY: 0,
  setActiveProject: (slug) => set({ activeProjectSlug: slug }),
  setMenuOpen: (open) => set({ menuOpen: open }),
  setCursor: (x, y) => set({ cursorX: x, cursorY: y }),
}))