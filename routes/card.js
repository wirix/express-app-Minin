const { Router } = require('express')
const router = Router()
const Card = require('../modules/card')
const Course = require('../modules/course')

router.get('/', async (req, res) => {
  const card = await Card.getAll()
  res.render('card', {
    title: 'Ваши курсы',
    card: card.courses,
    price: card.price,
    isCard: true
  })
})

router.post('/add', async (req, res) => {
  const course = await Course.getById(req.body.id)
  const card = await Card.getAll()
  await Card.addCourse(course)
  res.redirect('/card')
})

router.delete('/remote/:id', async (req, res) => {
  const card = await Card.remove(req.params.id)
  // чтобы подтвердить, что все прошло успешно для delete 
  res.status(200).json(card)
})


module.exports = router