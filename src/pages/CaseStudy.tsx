import { useParams } from '@tanstack/react-router'

export const CaseStudy = () => {
  const { slug } = useParams({ from: '/projetos/$slug' })

  return (
    <main>
      <p style={{ color: 'var(--text-secondary)', padding: '2rem' }}>
        CaseStudy — {slug}
      </p>
    </main>
  )
}