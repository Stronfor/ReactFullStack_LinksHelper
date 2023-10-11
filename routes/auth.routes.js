// ВСЯ ЛОГИКА ПО РЕГИСТРАЦИИ И ВХОДУ В СИСТЕМУ

const {Router} = require('express');
const bcrypt = require('bcryptjs'); // для шифрования паролей
const { check, validationResult } = require('express-validator') // для валидации
const jwt = require('jsonwebtoken'); // библиотека Токен нужна для отображение разного контента для разных пользователей
const config = require('config');

// шаблон пользователей (описан по адрессу ...)
const User = require('../models/User');

const router = Router();

////////////////////  Логика создания нового пользователя по адресу =
//  /api/auth/register
router.post(
      '/register',
      [     // логика валидации express-validator
            check('email', 'Email Error').isEmail(),
            check('password', 'Password length min 6 characters').isLength({min: 6})
      ], 
      async(req, res) => {
            try{
                  // validation
                  const errors = validationResult(req); // результат валидации входящих полей
                  if(!errors.isEmpty()){
                        return res.status(400).json({
                              errors: errors.array(),
                              message: 'Не коректные данные при регистрации'
                        })
                  }
                  ///////////

                  const {email, password} = req.body;

                  /////////// логика регистрации

                  // проверка на наличие уже такого мыла (акаунта) в базе 
                  const candidate = await User.findOne({email});// findOne() => метод mangoos

                  if(candidate){
                        return res.status(400).json({message: 'Такой пользователь уже существует'});
                  }

                  // шифруем пароль с помощью библиотеки bcryptjs
                  const hashedPassword = await bcrypt.hash(password, 12);
                  // create new user
                  const user = new User({ email: email, password: hashedPassword });

                  await user.save();

                  res.status(201).json({message: 'Пользователь создан'});

            } catch (e) {
                  res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
      }
);

////////////////////  Логика Авторизации существуещего пользователя по адресу =
//  /api/auth/login
router.post(
      '/login',
      [
            check('email', 'Введите коррестный email').normalizeEmail().isEmail(),
            check('password', 'Введите пароль').exists() // exists() => должен существовать (методы express-validator)(в поле пароль должно быть что то введенно)
      ],
      async(req, res) => {
      try{
            // Validation
            const errors = validationResult(req); // результат валидации входящих полей
            if(!errors.isEmpty()){
                  return res.status(400).json({
                        errors: errors.array(),
                        message: 'Не коректные данные при входе в систему'
                  })
            }
            //////////

            const {email, password} = req.body;
            const user = await User.findOne({ email });
 
            if(!user){
                  return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password) // сравнение паролей через compare (bcrypt)
           
            if(!isMatch){
                  return res.status(400).json({message: 'Неверный пароль, попробуйте снова'});
            }

            // создаем токен если пользователь авторизирован
            const token = jwt.sign(
                  { userId: user.id }, // данные которые будут зашифрованые в конкретном токене
                  config.get('jwtSecret'), // сикретный ключ
                  {expiresIn: '1h'} // время существование токена (1 час)
            );

            res.json({token, userId: user.id})

      } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
      }
});

module.exports = router