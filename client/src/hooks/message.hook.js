import { useCallback } from "react"

export const useMessage = () => {
      return useCallback(text=>{

            // window.M.toast = ЭТО пришло с библиотеки Materiolize( типа bootstrap)
            if(window.M && text){
                  window.M.toast({html: text})
            }
      }, [])
}