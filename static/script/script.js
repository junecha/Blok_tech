const fieldOne = document.getElementById('set1')
const fieldTwo = document.getElementById('set2')
const fieldThree = document.getElementById('set3')
const buttonOne = document.getElementById('but1')
const buttonTwo = document.getElementById('but2')
const backOne = document.getElementById('back1')
const backTwo = document.getElementById('back2')
const submitButton = document.getElementById('subButton')
const container = document.getElementById('container')
const bullets = [...document.querySelectorAll('.bullet')]

const maxStep = 3
let currentStep = 1

buttonOne.addEventListener('click', () => {
  fieldOne.setAttribute('id', 'hidden')
  fieldTwo.setAttribute('id', 'display')
  buttonOne.setAttribute('id', 'hidden')
  buttonTwo.setAttribute('id', 'display')
  backOne.setAttribute('id', 'display')
  bullets[currentStep - 1].classList.add('completed')
  currentStep++
  console.log(currentStep)
  event.preventDefault()
})

buttonTwo.addEventListener('click', () => {
  fieldTwo.setAttribute('id', 'hidden')
  fieldThree.setAttribute('id', 'display')
  buttonTwo.setAttribute('id', 'hidden')
  submitButton.setAttribute('id', 'display')
  backOne.setAttribute('id', 'hidden')
  backTwo.setAttribute('id', 'display')
  bullets[currentStep - 1].classList.add('completed')
  currentStep++
  event.preventDefault()
})

backOne.addEventListener('click', () => {
  fieldOne.setAttribute('id', 'fieldOne')
  fieldTwo.setAttribute('id', 'hidden')
  buttonOne.setAttribute('id', 'display')
  buttonTwo.setAttribute('id', 'hidden')
  backOne.setAttribute('id', 'hidden')
  bullets[currentStep - 2].classList.remove('completed')
  currentStep -= 1;
  event.preventDefault()
})

backTwo.addEventListener('click', () => {
  fieldTwo.setAttribute('id', 'display')
  fieldThree.setAttribute('id', 'hidden')
  buttonTwo.setAttribute('id', 'display')
  submitButton.setAttribute('id', 'hidden')
  backOne.setAttribute('id', 'display')
  backTwo.setAttribute('id', 'hidden')
  bullets[currentStep - 2].classList.remove('completed')
  currentStep -= 1;
  event.preventDefault()
})

//Hide and show some stuff when JS is on, so it still works when js is off
fieldTwo.setAttribute('id', 'hidden')
fieldThree.setAttribute('id', 'hidden')
buttonOne.setAttribute('id', 'display')
subButton.setAttribute('id', 'hidden')
container.setAttribute('id', 'display')


console.log('connected')
