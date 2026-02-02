import type { InjectionKey } from 'vue'

// Simple reactive mouse position tracker type
export interface MotionValue {
  get: () => number
  set: (newValue: number) => void
  on: (event: string, callback: (val: number) => void) => () => void
}

// Dock context interface
export interface DockContext {
  mouseX: MotionValue
  iconSize: number
  iconMagnification: number
  disableMagnification: boolean
  iconDistance: number
}

// Injection key for child components
export const DOCK_CONTEXT_KEY = Symbol('dock-context') as InjectionKey<DockContext>

// Factory function to create a motion value
export function createMotionValue(initialValue: number): MotionValue {
  let value = initialValue
  const listeners: ((val: number) => void)[] = []
  
  return {
    get: () => value,
    set: (newValue: number) => {
      value = newValue
      listeners.forEach(fn => fn(value))
    },
    on: (event: string, callback: (val: number) => void) => {
      if (event === 'change') {
        listeners.push(callback)
        return () => {
          const index = listeners.indexOf(callback)
          if (index > -1) listeners.splice(index, 1)
        }
      }
      return () => {}
    }
  }
}
