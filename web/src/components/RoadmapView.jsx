import React from 'react'
import AccordionSection from './AccordionSection'
import CopyExport from './actions/CopyExport'

export default function RoadmapView({ roadmap }) {
  const { overview, steps = [], tools = [], projects = [], duration_weeks, bonus_tips = [] } = roadmap || {}

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">Your Roadmap</h3>
        <CopyExport data={roadmap} />
      </div>

      <AccordionSection title="Overview">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{overview}</p>
      </AccordionSection>

      <AccordionSection title="Step-by-Step Learning Path">
        <ol className="space-y-4 list-decimal list-inside">
          {steps.map((s, idx) => (
            <li key={idx} className="space-y-2">
              <div className="font-medium">{s.title}</div>
              {s.details && <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{s.details}</p>}
              {Array.isArray(s.resources) && s.resources.length > 0 && (
                <ul className="mt-1 space-y-1 list-disc list-inside text-sm">
                  {s.resources.map((r, i) => (
                    <li key={i}>
                      {isLink(r) ? (
                        <a href={normalizeUrl(r)} target="_blank" rel="noreferrer" className="text-brand-700 dark:text-brand-400 hover:underline break-all">{r}</a>
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">{r}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </AccordionSection>

      <AccordionSection title="Tools & Technologies">
        <div className="flex flex-wrap gap-2">
          {tools.map((t, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">{t}</span>
          ))}
        </div>
      </AccordionSection>

      {projects.length > 0 && (
        <AccordionSection title="Projects">
          <ul className="space-y-2 list-disc list-inside">
            {projects.map((p, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300">{p}</li>
            ))}
          </ul>
        </AccordionSection>
      )}

      {Number.isFinite(Number(duration_weeks)) && (
        <AccordionSection title="Estimated Duration">
          <p className="text-gray-700 dark:text-gray-300">~ {duration_weeks} weeks</p>
        </AccordionSection>
      )}

      {bonus_tips.length > 0 && (
        <AccordionSection title="Motivation & Community Tips">
          <ul className="space-y-2 list-disc list-inside">
            {bonus_tips.map((t, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300">{t}</li>
            ))}
          </ul>
        </AccordionSection>
      )}
    </div>
  )
}

function isLink(str) {
  return /^https?:\/\//i.test(str)
}

function normalizeUrl(str) {
  if (/^https?:\/\//i.test(str)) return str
  return `https://${str}`
}


