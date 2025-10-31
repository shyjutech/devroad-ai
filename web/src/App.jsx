import React, { useMemo, useState } from 'react'
import ThemeToggle from './components/ThemeToggle'
import RoadmapForm from './components/RoadmapForm'
import RoadmapView from './components/RoadmapView'
import Logo from './components/Logo'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState(null)
  const [error, setError] = useState('')

  const title = useMemo(() => 'DevRoad AI — Developer Roadmap Generator', [])

  async function handleGenerate(form) {
    setLoading(true)
    setError('')
    setRoadmap(null)
    try {
      if (import.meta.env.VITE_DISABLE_BACKEND === 'true') {
        const mock = {
          overview: `A focused roadmap for ${form.category} tailored to a ${form.experience} learner. This plan helps you achieve: ${form.goal}.`,
          steps: [
            { title: 'Foundations', details: 'Review core programming, CLI, Git, and networking basics.', resources: ['https://roadmap.sh', 'https://www.freecodecamp.org/'] },
            { title: 'Core Skills', details: 'Deep dive into key topics for your category with hands-on labs.', resources: ['https://docs.docker.com/', 'https://kubernetes.io/docs/'] },
            { title: 'Projects & Portfolio', details: 'Build real-world projects and document learnings.', resources: ['https://github.com', 'https://www.udemy.com/'] }
          ],
          tools: ['VS Code', 'Git', 'Docker'],
          projects: ['Build a CI pipeline', 'Containerize an app', 'Deploy a demo project'],
          duration_weeks: 12,
          bonus_tips: ['Join a community', 'Be consistent', 'Share progress']
        }
        await new Promise(r => setTimeout(r, 600))
        setRoadmap(mock)
        return
      }
      const res = await fetch('/api/generateRoadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to generate roadmap')
      const data = await res.json()
      setRoadmap(data)
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 relative">
      {/* Branded gradient background with decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-brand-300/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 to-white dark:from-gray-950 dark:to-gray-900" />
      </div>

      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-white/20 dark:border-gray-800/60">
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-lg sm:text-xl font-semibold">DevRoad AI</span>
            <span className="ml-2 hidden sm:inline-flex items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-800/40 dark:text-brand-300 px-2 py-0.5 text-xs border border-brand-200/60 dark:border-brand-800">Beta</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 space-y-8">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Your Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">Developer Roadmap</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            DevRoad AI crafts actionable learning plans with curated resources based on your goals and experience.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/70 dark:bg-gray-900/60 border border-white/30 dark:border-gray-800 px-2 py-1">⚡ Gemini 1.5 Pro</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/70 dark:bg-gray-900/60 border border-white/30 dark:border-gray-800 px-2 py-1">🎯 Personalized</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/70 dark:bg-gray-900/60 border border-white/30 dark:border-gray-800 px-2 py-1">📚 Curated Resources</span>
          </div>
        </section>

        {/* Form */}
        <section className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Generate your roadmap</h2>
            <div className="text-xs text-gray-500">Brand: <span className="font-medium text-brand-700 dark:text-brand-400">DevRoad AI</span></div>
          </div>
          <RoadmapForm onGenerate={handleGenerate} loading={loading} />
          {error && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </section>

        {loading && (
          <section className="card grid place-items-center py-16">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Generating your roadmap…</p>
            </div>
          </section>
        )}

        {roadmap && (
          <section className="card">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Your DevRoad Plan</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Crafted by DevRoad AI</p>
            </div>
            <RoadmapView roadmap={roadmap} />
          </section>
        )}
      </main>
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DevRoad AI — Build faster, learn smarter.
      </footer>
    </div>
  )
}
