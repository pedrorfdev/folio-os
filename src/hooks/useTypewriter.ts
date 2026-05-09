import { useEffect, useState } from 'react'

export const useTypewriter = (text: string, active: boolean, speed = 18) => {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      setDone(false)
      return
    }

    let i = 0
    setDisplayed('')
    setDone(false)

    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        setDone(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [active, text, speed])

  return { displayed, done }
}