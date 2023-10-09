import React , {useEffect, useState} from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
      const message = useMessage();

      const {loading, error: errorFromHook, request:requestFromHook, clearError} = useHttp();

      const [form, setForm] = useState({
            email: '', password: ''
      });

      // обработка ошибки которая пришла от сервера
      useEffect(()=>{
            message(errorFromHook);
            clearError()
      }, [errorFromHook, message, clearError]);

      const changeHandler = event => {
            setForm({...form, [event.target.name]: event.target.value })
      }

      const registerHandler = async () => {
            try{
                  // в package.json добавляем поле = "proxy":"http://localhost:5050",(Работает для РАЗРАБОТКИ, для продакшена есть другой метод!!!)
                  const data = await requestFromHook('/api/auth/register', 'POST', {...form}) // фронт и бек работают на разных портах!! будет ошибка!! Нужно исольховать ПРОКСИ!!!
                  message(data.message)
                  
            } catch(e){}
      }

      const loginHandler = async () => {
            try{
                  // в package.json добавляем поле = "proxy":"http://localhost:5050",(Работает для РАЗРАБОТКИ, для продакшена есть другой метод!!!)
                  const data = await requestFromHook('/api/auth/login', 'POST', {...form}) // фронт и бек работают на разных портах!! будет ошибка!! Нужно исольховать ПРОКСИ!!!
                  message(data.message)
                  
            } catch(e){}
      }

      return (
            <div className="row">
                  <div className="col s6 offset-s3">
                        <h1>LinkSaver</h1>
                        <div className="card blue darken-1">
                              <div className="card-content white-text">
                                    <span className="card-title">Autarization</span>
                                    <div>
                                          <div className="input-field">
                                                <input
                                                      type="text"
                                                      id="email"
                                                      name="email"
                                                      className="yellow-input"
                                                      onChange={changeHandler}
                                                />
                                                <label htmlFor="email">Email</label>
                                          </div>
                                          <div className="input-field">
                                                <input
                                                      type="password"
                                                      id="password"
                                                      name="password"
                                                      className="yellow-input"
                                                      onChange={changeHandler}
                                                />
                                                <label htmlFor="password">Password</label>
                                          </div>
                                    </div>
                                    <div className="card-action">
                                          <button
                                                className="btn yellow darken-4"
                                                style={{marginRight: 10}}
                                                disabled={loading}
                                                onClick={loginHandler}
                                          >Enter
                                          </button>
                                          <button
                                                className="btn grey darken-1"
                                                onClick={registerHandler}
                                                disabled={loading}
                                          >Registration
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}