import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { Home } from './pages/Home'
import { CaseStudy } from './pages/CaseStudy'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const caseStudyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projetos/$slug',
  component: CaseStudy,
})

const routeTree = rootRoute.addChildren([homeRoute, caseStudyRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}