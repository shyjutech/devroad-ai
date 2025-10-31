import React from 'react'

export default function CopyExport({ data }) {
  function toText(d) {
    try {
      const { overview, steps = [], tools = [], projects = [], duration_weeks, bonus_tips = [] } = d || {}
      const parts = []
      if (overview) parts.push(`# Overview\n${overview}`)
      if (steps.length) {
        parts.push(`\n# Steps`)
        steps.forEach((s, i) => {
          parts.push(`\n${i + 1}. ${s.title}\n${s.details || ''}`)
          if (Array.isArray(s.resources) && s.resources.length) {
            parts.push(`Resources:`)
            s.resources.forEach(r => parts.push(`- ${r}`))
          }
        })
      }
      if (tools.length) parts.push(`\n# Tools\n- ${tools.join('\n- ')}`)
      if (projects.length) parts.push(`\n# Projects\n- ${projects.join('\n- ')}`)
      if (Number.isFinite(Number(duration_weeks))) parts.push(`\n# Estimated Duration\n~ ${duration_weeks} weeks`)
      if (bonus_tips.length) parts.push(`\n# Tips\n- ${bonus_tips.join('\n- ')}`)
      return parts.join('\n')
    } catch {
      return JSON.stringify(d, null, 2)
    }
  }

  async function handleCopy() {
    const text = toText(data)
    await navigator.clipboard.writeText(text)
  }

  function handleDownloadJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'roadmap.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center gap-2">
      <button className="btn-outline text-sm" onClick={handleCopy}>Copy</button>
      <button className="btn-outline text-sm" onClick={handleDownloadJson}>Export JSON</button>
    </div>
  )
}


