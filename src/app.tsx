import { RouterProvider } from '@tanstack/react-router'
import { useMousePosition } from './hooks/useMousePosition'
import { router } from './router'


const AppInner = () => {
  useMousePosition()
  return <RouterProvider router={router} />
}

export const App = () => <AppInner />