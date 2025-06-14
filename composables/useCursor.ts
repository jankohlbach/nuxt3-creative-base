export const useCursor = () => {
  const cursorPos = useState('cursorPos', () => ({
    current: { x: 0.5, y: 0.5 },
    target: { x: 0.5, y: 0.5 },
    isHovering: '',
  }))

  const setCursorPosCurrent = (x: number, y: number) => {
    cursorPos.value.current.x = x
    cursorPos.value.current.y = y
  }

  const setCursorPosTarget = (mouseX: number, mouseY: number) => {
    cursorPos.value.target.x = (mouseX / window.innerWidth)
    cursorPos.value.target.y = (mouseY / window.innerHeight)
  }

  const hoverTrigger = useState<NodeList | null>('hoverTrigger', () => null)

  const setHoverTrigger = () => {
    hoverTrigger.value = document.querySelectorAll('[data-cursor], a, button')
  }

  return {
    cursorPos,
    setCursorPosCurrent,
    setCursorPosTarget,
    hoverTrigger,
    setHoverTrigger,
  }
}
