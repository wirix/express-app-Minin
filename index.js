const express = require('express')
const path = require('path')
const exphs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const app = express()

const hbs = exphs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

// настройка express-handlebars
// регистрируем что есть такой движок и вторым парам передаем туда значение
app.engine('hbs', hbs.engine)
// set- начинаем использовать движок 'hbs', 'view engine' -какой engine хотим использовать
app.set('view engine', 'hbs')
// пишем название папки где будут храниться шаблоны (2ой парам по умол views)
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`сервер запущен на порту ${PORT}`)
})