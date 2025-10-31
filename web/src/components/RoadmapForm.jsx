import React, { useMemo, useState } from 'react'

const CATEGORIES = ['DevOps', 'Flutter', 'React', 'Backend', 'AI/ML', 'Data Science']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export default function RoadmapForm({ onGenerate, loading }) {
  const [category, setCategory] = useState(CATEGORIES[0])
  const [experience, setExperience] = useState(LEVELS[0])
  const [known, setKnown] = useState('')
  const [goal, setGoal] = useState('')

  const disabled = useMemo(() => loading || !goal.trim(), [loading, goal])

  function handleSubmit(e) {
    e.preventDefault()
    if (disabled) return
    onGenerate({
      category,
      experience,
      known_languages: known,
      goal: goal.trim()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="grid gap-2">
        <label className="text-sm font-medium">Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2">
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Experience Level</label>
        <select value={experience} onChange={e => setExperience(e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2">
          {LEVELS.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-2 md:col-span-2">
        <label className="text-sm font-medium">Known Languages (comma separated)</label>
        <input value={known} onChange={e => setKnown(e.target.value)} placeholder="Python, JavaScript" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2" />
      </div>

      <div className="grid gap-2 md:col-span-2">
        <label className="text-sm font-medium">Learning Goal</label>
        <textarea value={goal} onChange={e => setGoal(e.target.value)} placeholder="Become a cloud automation DevOps engineer." rows={4} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2" />
      </div>

      <div className="md:col-span-2 flex items-center justify-end gap-3">
        <button type="submit" disabled={disabled} className="btn-primary">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-transparent animate-spin" />
              Generating…
            </span>
          ) : 'Generate Roadmap'}
        </button>
      </div>
    </form>
  )
}


