import { useId } from "react";

/**
 * Resolves a form field's `id`: uses the caller-supplied `id` if present,
 * otherwise falls back to a stable id from React's `useId()`.
 *
 * Replaces the old `Math.random().toString(36)` pattern, which risks SSR
 * hydration mismatches since it produces a different id on every render.
 */
export function useFieldId(id?: string): string {
  const generatedId = useId();
  return id || generatedId;
}
