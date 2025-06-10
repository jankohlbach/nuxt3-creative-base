export const handleBeforeLeave = () => {
  const { $scrollStop } = useNuxtApp()

  $scrollStop()
}

export const handleLeave = () => {
}

export const handleBeforeEnter = () => {
}

export const handleEnter = () => {
}

export const handleAfterLeave = () => {
  const { canvasItems } = useCanvas()

  canvasItems.value = null
}

export const handleAfterEnter = () => {
  const { $scrollStart } = useNuxtApp()

  const { setCanvasItems } = useCanvas()

  setCanvasItems()
  $scrollStart()
}
