import { useState } from "react"

const useLoading = () => {
  const [loading,setLoading] = useState(false);
  const toggleLoading = () => setLoading(prev=>!prev);
  return [loading,toggleLoading];
}

export default useLoading