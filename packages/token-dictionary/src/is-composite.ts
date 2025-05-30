import { P, isMatching } from 'ts-pattern'

export const isCompositeShadow = isMatching({
  inset: P.optional(P.boolean),
  offsetX: P.union(P.number, P.string),
  offsetY: P.union(P.number, P.string),
  blur: P.union(P.number, P.string),
  spread: P.union(P.number, P.string),
  color: P.string,
})

export const isCompositeGradient = isMatching({
  type: P.string,
  placement: P.string,
  stops: P.union(
    P.array(P.string),
    P.array({
      color: P.string,
      position: P.number,
    }),
  ),
})

export const isCompositeBorder = isMatching({
  color: P.string,
  width: P.union(P.string, P.number),
  style: P.string,
})

export const isCompositeAsset = isMatching({
  type: P.union('url', 'svg'),
  value: P.string,
})

export const isCompositeTokenValue = (value: any) => {
  return (
    isCompositeGradient(value) ||
    isCompositeShadow(value) ||
    isCompositeBorder(value) ||
    isCompositeAsset(value) ||
    Array.isArray(value)
  )
}
