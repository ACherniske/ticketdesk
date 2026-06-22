import { useEffect, useState } from 'react'
import { portalConfig } from '../portal.config'
import type { TargetOption } from '../types/ticket'

type ValidationState =
  | { status: 'validating' }
  | { status: 'ready'; targets: TargetOption[] }
  | { status: 'error'; message: string }

export function useValidation() {
  const [state, setState] = useState<ValidationState>({ status: 'validating' })

  useEffect(() => {
    async function validate() {
      try {
        const resolved = await Promise.all(
          portalConfig.targets.map(async (target) => {
            if (target.type !== 'project') return target

            const res = await fetch(`${portalConfig.apiUrl}/api/validate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                owner: target.destination.kind === 'project'
                  ? target.destination.owner
                  : null,
                projectNumber: target.destination.kind === 'project'
                  ? target.destination.projectNumber
                  : null
              })
            })

            const data = await res.json() as {
              projectId: string
              fieldId: string
              optionId: string
              error?: string
            }

            if (!res.ok) {
              throw new Error(
                `Validation failed for "${target.label}": ${data.error ?? 'Unknown error'}`
              )
            }

            return {
              ...target,
              destination: {
                ...target.destination,
                projectId: data.projectId,
                fieldId: data.fieldId,
                optionId: data.optionId
              }
            } as TargetOption
          })
        )

        setState({ status: 'ready', targets: resolved })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Validation failed'
        setState({ status: 'error', message })
      }
    }

    validate()
  }, [])

  return state
}
