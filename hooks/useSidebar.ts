import { useState } from "react"

export const useSidebar = () => {
  const [isVisible, setIsVisible] = useState(false)

  const openSidebar = () => setIsVisible(true)
  const closeSidebar = () => setIsVisible(false)
  const toggleSidebar = () => setIsVisible(!isVisible)
  return {
    isVisible,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  }
}
