document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal')
  const header = document.getElementById('header')

  let isDragging = false
  let offsetX, offsetY

  header.addEventListener('mousedown', e => {
    isDragging = true
    offsetX = e.clientX - terminal.offsetLeft
    offsetY = e.clientY - terminal.offsetTop
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', stop)
  })

  function move(e) {
    if (isDragging) {
      terminal.style.left = `${e.clientX - offsetX}px`
      terminal.style.top = `${e.clientY - offsetY}px`
    }
  }

  function stop() {
    isDragging = false
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', stop)
  }

  document
    .querySelector('.button.red')
    .addEventListener('click', () => window.close())
  document
    .querySelector('.button.yellow')
    .addEventListener('click', () => window.location.reload())
})
