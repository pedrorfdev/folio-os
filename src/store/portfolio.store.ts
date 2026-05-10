import { create } from 'zustand'

export type ProjectState = 'idle' | 'hover' | 'fixed' | 'expanded'

type PortfolioStore = {
  activeProjectSlug: any
  setActiveProject: any
  activeSlug: string | null
  projectState: ProjectState
  menuOpen: boolean
  menuHoverSlug: string | null
  cursorX: number
  cursorY: number

  hoverProject: (slug: string) => void
  fixProject: (slug: string) => void
  expandProject: (slug: string) => void
  clearProject: () => void
  setMenuOpen: (open: boolean) => void
  setMenuHover: (slug: string | null) => void
  setCursor: (x: number, y: number) => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activeProjectSlug: null,
  setActiveProject: () => { },
  activeSlug: null,
  projectState: 'idle',
  menuOpen: false,
  menuHoverSlug: null,
  cursorX: 0,
  cursorY: 0,

  hoverProject: (slug) => set((s) =>
    s.projectState === 'idle' ? { activeSlug: slug, projectState: 'hover' } : s
  ),
  fixProject: (slug) => set({ activeSlug: slug, projectState: 'fixed' }),
  expandProject: (slug) => set({ activeSlug: slug, projectState: 'expanded' }),
  clearProject: () => set({ activeSlug: null, projectState: 'idle' }),

  setMenuOpen: (open) => set({ menuOpen: open }),
  setMenuHover: (slug) => set({ menuHoverSlug: slug }),
  setCursor: (x, y) => set({ cursorX: x, cursorY: y }),
}))