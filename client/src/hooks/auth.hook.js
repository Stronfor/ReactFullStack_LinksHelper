import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData';

// создаем логику для авторизации пользователя
export const useAuth = () => {
      // храним значение Токена
      const [token, setToken] = useState(null);
      // id пользователя
      const [userId, setUserId] = useState(null);

      // вход в систему (токен работает 1 час и при повторном заходе(храним в локалсторе) не требуется регистрация)
      const login = useCallback((jwtToken, id) => {
            // задаем значение Токена
            setToken(jwtToken);

            // задаем id пользователя
            setUserId(id);

            // Создам локальное хранилище для Токена
            localStorage.setItem(storageName, JSON.stringify({
                  userId: id, token: jwtToken
            }))
      },[])

      // Выход из акаунта
      const logout = useCallback(()=>{
            setToken(null);
            setUserId(null);

            localStorage.removeItem(storageName);
      },[]);

      // При заходе Сначал проверка на наличие данных(token, userId) в localStorage если есть то заходим автоматом
      useEffect(()=>{
            const data = JSON.parse(localStorage.getItem(storageName));

            if(data && data.token){
                  login(data.token, data.userId)
            }
      }, [login])

      return {login, logout, token, userId}
}