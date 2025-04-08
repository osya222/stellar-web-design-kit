
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Initial check
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Handler to call on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Create media query observer
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Add event listener for both resize and media query change
    window.addEventListener('resize', handleResize)
    mql.addEventListener("change", handleResize)
    
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      mql.removeEventListener("change", handleResize)
    }
  }, [])
  
  // Default to false if undefined, but this should only happen during SSR
  return isMobile === undefined ? false : isMobile
}
