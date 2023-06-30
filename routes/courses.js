const {Router} = require('express')
const Course = require('../modules/course')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.getAll()
  res.render('courses', {
    title: 'Courses Page',
    isCourses: true,
    courses
  })
})

module.exports = router