const fs = require('fs')
const path = require('path')

class Card {
  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(path.join(__dirname, '../data/card.json'), 'utf-8', (err, content) => {
        if (err) {
          rej(err)
        } else {
          res(JSON.parse(content))
        }
      })
    })
  }

  static async addCourse(course) {
    let card = await Card.getAll()
    console.log(card)
    const idx = card.courses.findIndex(c => c.id === course.id)
    const candidate = card.courses[idx]
    if (candidate) {
      candidate.count++
      card.courses[idx] = candidate
    } else {
      course.count = 1
      card.courses.push(course)
    }
    card.price += +course.price
    return new Promise((res, rej) => {
      fs.writeFile(path.join(__dirname, '../data/card.json'), JSON.stringify(card), (err) => {
        if (err) {
          rej(err)
        } else {
          res()
        }
      })
    })
  }
}

module.exports = Card