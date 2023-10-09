const express = require('express');
const config = require('config'); // библиотека которая читает данные с файла (для хранения паролей и переменных)
const mongoose = require('mongoose')

const app = express();

app.use(express.json({extended: true}))// для того чтобы Node мог коректно прочитать тело запроса

// registration ROUTES
app.use('/api/auth', require('./routes/auth.routes'))


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