import React, {useContext, useState} from "react"
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

import { useNavigate } from 'react-router-dom';

export const CreatePage = () => {

      const navigate = useNavigate()
    
      // для подтверждении Авторизации в хедерах запроса нужно отплавлять ТОКЕН
      const auth = useContext(AuthContext);

      const {request} = useHttp();

      const [link, setLink] = useState('')
      const [name, setName] = useState('')
      /* const [name, setName] = useState('') */

      const pressHandler = async() => {
            
                  try{
                       const data = await request('/api/link/generate', 'POST', {from: link, name: name}, {
                        Authorization: `Bearer ${auth.token}`
                       })
                       console.log(data);
                       
                       navigate(`/detail/${data.link._id}`)
                      
                  } catch (e){}
           
      }

      return (
            <div className="row">
                  <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                        <div className="input-field">
                              <input
                                    type="text"
                                    id="link"
                                    value={link}
                                    onChange={e => setLink(e.target.value)}
                                   /*  onKeyDown={pressHandler} */
                              />
                              <label htmlFor="link">Add your link</label>
                        </div>
                        <div className="input-field">
                              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                              <label htmlFor="name">add Name for link</label>
                        </div>
                       
                        <button type="button" onClick={pressHandler}>Submit</button>
                  
                  </div>
            </div>
      )
}