// Суть миделвееров перехвативыть какието данные и делать с ними определенную логику

const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => { // next  это метод позволяющий продолжить выполнение запроса
      if(req.method === 'OPTIONS'){ // проверит доступность сервера
            return next();
      }

      // а Если это уже обычный запрос (POST GET ...) 
      try{
            const token = req.headers.authorization.slice(7) // Bearer <TOKEN>

            if(!token){
                return  res.status(401).json({message: 'No token for autorization'})
            }

            // разкодированый токен
            const decoded = jwt.verify(token, config.get('jwtSecret')) 
            req.user = decoded
            next();

      } catch (e){
            res.status(401).json({message: 'No autorization'})    
      }
}