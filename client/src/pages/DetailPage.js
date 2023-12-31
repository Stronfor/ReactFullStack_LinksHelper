import React, { useContext, useCallback, useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {LinkCard} from '../components/LinkCard'
import {Loader} from '../components/Loader'

export const DetailPage = () => {

      const {token} = useContext(AuthContext)
      const {request, loading} = useHttp()
      const [link, setLink] = useState(null)
      // Берем id с Адресной строки
      const linkId = useParams().id

      const getLink = useCallback(async()=>{
            try{

                  const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                        Authorization: `Bearer ${token}`
                  })

                  setLink(fetched)

            } catch (e){ }
      },[token, linkId, request])

      useEffect(()=>{
            getLink();
      }, [getLink])

    if(loading){
      return <Loader />
    }
      
      return (
            <>
                  {!loading && link && <LinkCard link={link} />}
            </>
      )
}