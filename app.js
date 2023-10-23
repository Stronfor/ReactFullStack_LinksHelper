const express = require('express');
const config = require('config'); // библиотека которая читает данные с файла (для хранения паролей и переменных)
const mongoose = require('mongoose')
const path = require('path')

const app = express();

app.use(express.json({extended: true}))// для того чтобы Node мог коректно прочитать тело запроса

// registration ROUTES /api/auth/..... потом роуты описанные в auth.routes.js
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

// Фунционал для работы на удаленном сервере (через хост)
if(process.env.NODE_ENV === 'production'){
      // тогда отдаем статику
      app.use('/', express.static(path.join(__dirname, 'client', 'build')))

      // на любые Запросы обращаемся к файлу (и таким образом будет работать и фронт и бэк одновременно)
      app.get('*', (req, res) =>{
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
      })
}
///////////////

const PORT = config.get('port') || 5000

async function start(){
      try{
            // add DB
            await mongoose.connect(config.get('mongoUri', {
                  useUnifiedTopology: true,
                  useCreateIndex: true
            }))

           //start server
           app.listen(PORT, ()=> console.log(`App has been started on port ${PORT}...`));

      } catch(e){
            console.log('Server Error', e.message);
            process.exit(1)
      }
}

/* app.listen(PORT, ()=> console.log(`App has been started on port ${PORT}...`)); */
start();