export const clamp = (value, lower = 0, upper = 1) =>
  Math.min(upper, Math.max(lower, value))

export const smooth = (lower, upper, value) => {
  const progress = clamp((value - lower) / (upper - lower))
  return progress * progress * (3 - 2 * progress)
}
