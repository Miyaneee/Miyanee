import { useState } from 'react'

function useBoolean(initialValue: unknown) {
  const [bool, setBool] = useState(Boolean(initialValue))
  function toggleBool(value?: boolean) {
    setBool(value === undefined ? !bool : value)
  }
  return [bool, toggleBool] as const
}

export default useBoolean
