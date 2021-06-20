export function compareValues(a: any, b: any, strict: boolean = true): boolean {
  if (strict) {
    return a === b
  }

  /* eslint-disable */
  return a == b
}
