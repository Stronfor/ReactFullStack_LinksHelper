// ВСЯ ЛОГИКА СТРАНИЦЫ С ССЫЛКАМИ

const {Router} = require('express');
const shortid = require('shortid')
const config = require('config')
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware')

const router = Router();

////////////////    описание роутов

// добавление новой ссылки
router.post('/generate', auth, async(req, res) => {
      try{
            const baseUrl = config.get('baseUrl');

            const {from} = req.body;

            // Сейчас НУжен метод чтобы Сделать нашу ссылку КОРОТКОЙ (использую библиотеку shortid)
            const code = shortid.generate();

            // проверка на наличие такой ссылки
            const existing = await Link.findOneAndDelete({from});

            if(existing){
                  return res.json({link: existing})
            }

            // создание самой ссылки которая будет хранится в сервисе
            const to = baseUrl + '/t/' + code;

            const link = new Link({
                 code, to, from, owner: req.user.userId 
            })

            await link.save();
            
            res.status(201).json({link});

      } catch(e){
            res.status(500).json({message: 'Ooops... Something went wrong'})
      }
})

// получение всех ссылок
router.get('/', auth, async(req, res) => {
      try{
            // Нужно получать ссылки КОНКРЕТНОГО пользователя
            const links = await Link.find({owner: req.user.userId}) // из за добавления auth.middelware в req появилось поле user.userId
            res.json(links)

      } catch(e){
            res.status(500).json({message: 'Ooops... Something went wrong'})
      }
});

//получение ссылки по ID
router.get('/:id', auth, async(req, res) => {
      try{
            const link = await Link.findById(req.params.id);
            res.json(link)

      } catch(e){
            res.status(500).json({message: 'Ooops... Something went wrong'})
      }
});




module.exports = router;