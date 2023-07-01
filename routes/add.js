const { Router } = require('express')
const router = Router()
const Course = require('../modules/course')

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add Course Page',
    isAdd: true
  })
})

router.post('/', async (req, res) => {
  const course = new Course(req.body.title, +req.body.price, req.body.img)
  course.save()
  res.redirect('/courses')
})

module.exports = router