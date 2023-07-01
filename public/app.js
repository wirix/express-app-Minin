const toCurrency = price => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent)
})

const $card = document.querySelector('#card')
if ($card) {
  $card.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id

      fetch('/card/remote/' + id, {
        method: 'delete'
      }).then(res => res.json())
        .then(card => {
          if (card.courses.length) {
            const html = card.courses.map(c => {
              return `
            <div id='card' class='row'>
              <div>Курс: ${c.title}, Цена: ${c.price}, Количество: ${c.count}</div>
              <button class='btn btn-primary js-remove' data-id="${c.id}">удалить 1 курс</button>
            </div>
            `
            }).join('')
            $card.querySelector('.body').innerHTML = html
            $card.querySelector('.price').textContent = toCurrency(Number(card.price))
          } else {
            card.innerHtml = '<p>Корзина пуста</p>'
          }
        })
    }
  })
}