import { RouterProvider } from '@tanstack/react-router'
import { useMousePosition } from './hooks/useMousePosition'
import { router } from './router'
import { usePortfolioStore } from './store/portfolio.store'
import { Cursor } from './components/ui/Cursor'


const AppInner = () => {
  useMousePosition()
  // remova depois
  usePortfolioStore.subscribe((s) => console.log(s.cursorX, s.cursorY))
  return (
    <>
      <Cursor />
      <RouterProvider router={router} />
    </>
  )
}

export const App = () => <AppInner />