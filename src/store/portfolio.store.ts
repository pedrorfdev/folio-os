import { create } from 'zustand'

type PortfolioStore = {
  activeProjectSlug: string | null
  cursorX: number
  cursorY: number
  setActiveProject: (slug: string | null) => void
  setCursor: (x: number, y: number) => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activeProjectSlug: null,
  cursorX: 0,
  cursorY: 0,
  setActiveProject: (slug) => set({ activeProjectSlug: slug }),
  setCursor: (x, y) => set({ cursorX: x, cursorY: y }),
}))