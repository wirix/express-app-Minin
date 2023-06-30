const fs = require('fs')
const path = require('path')

class MyClass {
  constructor(title, price) {
    this.title = title,
    this.price = price
  }

  toJSON() {
    return { title: this.title, price: this.price }
  }

  async addUser() {
    const obj = await MyClass.getAll()
    obj.push(this.toJSON())
    return new Promise((res, rej) => {
      fs.writeFile(path.join(__dirname, '../data/courses.json'), JSON.stringify(obj), (err => {
        if (err) {
          rej(err)
        } else {
          res()
        }
      }))
    })
  }

  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8', (err, content) => {
        if (err) {
          rej(err)
        } else {
          res(JSON.parse(content))
        }
      })
    })
  }
}

module.exports = MyClass