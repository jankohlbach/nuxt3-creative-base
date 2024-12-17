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
  // close menu and stuff
}

export const handleAfterEnter = () => {
  const { $scrollStart } = useNuxtApp()

  $scrollStart()
}
