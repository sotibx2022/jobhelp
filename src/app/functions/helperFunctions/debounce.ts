export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
) {
  let timer: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
