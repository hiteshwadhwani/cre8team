import { useEffect, useState } from "react"

const useDebounce = <T>(name : T, time?: number) : T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(name)
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(name)
        }, time);
        return () => {
            clearTimeout(timer || 500)
        }
    }, [name, time])

    return debouncedValue
}
export default useDebounce