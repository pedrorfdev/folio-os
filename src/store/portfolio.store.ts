import { create } from 'zustand'

type PortfolioStore = {
  activeProjectSlug: string | null
  fixedProjectSlug: string | null
  menuOpen: boolean
  cursorX: number
  cursorY: number
  setActiveProject: (slug: string | null) => void
  setFixedProject: (slug: string | null) => void
  setMenuOpen: (open: boolean) => void
  setCursor: (x: number, y: number) => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activeProjectSlug: null,
  fixedProjectSlug: null,
  menuOpen: false,
  cursorX: 0,
  cursorY: 0,
  setActiveProject: (slug) => set({ activeProjectSlug: slug }),
  setFixedProject: (slug) => set({ fixedProjectSlug: slug }),
  setMenuOpen: (open) => set({ menuOpen: open }),
  setCursor: (x, y) => set({ cursorX: x, cursorY: y }),
}))