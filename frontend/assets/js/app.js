import '../scss/app.scss'

'use strict'
const form = document.getElementById('form')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const country = document.getElementById('country')
const postalCode = document.getElementById('postalCode')
const phone = document.getElementById('phone')
const creditCard = document.getElementById('creditCard')
const cardSecurityCode = document.getElementById('CVV')
const expDate = document.getElementById('expDate')

const showError = (input, message) => {
  const formField = input.parentElement
  formField.classList.remove('success')
  formField.classList.add('error')
  const error = formField.querySelector('.error-text')
  error.textContent = message
}

const showSuccess = (input) => {
  const formField = input.parentElement
  formField.classList.remove('error')
  formField.classList.add('success')
  const error = formField.querySelector('.error-text')
  error.textContent = ''
}

const isEmpty = value => value === '' || value === undefined ||
  value === null || value.length === 0 || /^\s+$/.test(value)
const isBetween = (length, min, max) => length < min || length > max ? false : true

const isEmailValid = (email) => {
  const emailRegExp = /^([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*@([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*\.(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]){2,})$/ //eslint-disable-line max-len
  return emailRegExp.test(email)
}

const isPostalCodeValid = (postalCode) => {
  const postalCodeRegExp = /^[0-9]{5}$/
  return postalCodeRegExp.test(postalCode)
}
const isPhoneValid = (phoneNumber) => {
  return /^(\d{3})(\d{3})(\d{3})$/.test(phoneNumber)
}

const isCreditCardValid = (creditCard) => {
  return /^[0-9]{16}$/.test(creditCard)
}

const isCardSecurityCodeValid = (code) => {
  return /^[0-9]{3}$/.test(code)
}
const isExpDateValid = (expDate) => {
  return /^[0-9]{2}\/[0-9]{2}$/.test(expDate)
}

const checkUserName = (input) => {
  let valid = false
  const min = 3
  const max = 25
  let inputValue = input.value.trim()

  if (isEmpty(inputValue)) {
    showError(input, 'firstName cannot be blank.')
  } else if (!isBetween(inputValue.length, min, max)) {
    showError(input, `Username must be between ${min} and ${max} characters.`)
  } else {
    showSuccess(input)
    valid = true
  }
  return valid
}

const checkEmail = () => {
  let valid = false
  const emailValue = email.value.trim()
  if (isEmpty(emailValue)) {
    showError(email, 'Email cannot be blank.')
  } else if (!isEmailValid(emailValue)) {
    showError(email, 'Please enter a valid email address (Ex: johndoe@domain.com).')
  } else {
    showSuccess(email)
    valid = true
  }
  return valid
}

const checkCountry = () => {
  let valid = false
  const countryValue = country.value.trim()
  if(countryValue === 'none' || countryValue === null || countryValue === ''){
    showError(country, 'Please select an option.')
  } else {
    showSuccess(country)
    valid = true
  }
  return valid
}

const checkPostalCode = () => {
  let valid = false
  const postalCodeValue = postalCode.value.trim()
  if(isEmpty(postalCodeValue)) {
    showError(postalCode, 'Postal Code cannot be blank.')
  } else if(!isPostalCodeValid(postalCodeValue)) {
    showError(postalCode, 'Please enter a valid postal code (Ex: 00000).')
  } else {
    showSuccess(postalCode)
    valid = true
  }
  return valid
}

const checkPhone = () => {
  let valid = false
  const phoneValue = phone.value.trim()
  if(isEmpty(phoneValue)) {
    showError(phone, 'Phone number cannot be blank.')
  } else if(!isPhoneValid(phoneValue)) {
    showError(phone, 'Please enter a valid phone number (Ex: 000000000).')
  } else {
    showSuccess(phone)
    valid = true
  }
  return valid
}

const checkCreditCard = () => {
  let valid = false
  const creditCardValue = creditCard.value.trim()
  if(isEmpty(creditCardValue)) {
    showError(creditCard, 'credit card number cannot be blank.')
  } else if(!isCreditCardValid(creditCardValue)) {
    showError(creditCard, 'Please enter a valid credit card number.(Ex: 0000000000000000)')
  } else {
    showSuccess(creditCard)
    valid = true
  }
  return valid
}

const checkCardSecurityCode = () => {
  let valid = false
  const cardSecurityCodeValue = cardSecurityCode.value.trim()
  if(isEmpty(cardSecurityCodeValue)) {
    showError(cardSecurityCode, 'CVV code cannot be blank.')
  } else if(!isCardSecurityCodeValid(cardSecurityCodeValue)) {
    showError(cardSecurityCode, 'Please enter a valid credit card verification number (Ex: 000).')
  } else {
    showSuccess(cardSecurityCode)
    valid = true
  }
  return valid
}

const checkExpDate = () => {
  let valid = false
  const expDateValue = expDate.value.trim()
  if(isEmpty(expDateValue)) {
    showError(expDate, 'Expire date cannot be blank.')
  } else if(!isExpDateValid(expDateValue)) {
    showError(expDate, 'Please enter a expire date of credit card. (ex: 07/25)')
  } else {
    showSuccess(expDate)
    valid = true
  }
  return valid
}

const debounce = (fn, delay = 500) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args)
    }, delay)
  }
}

form.addEventListener('input', debounce(function (e) {
  switch (e.target.id) {
    case 'firstName':
      checkUserName(firstName)
      break
    case 'lastName':
      checkUserName(lastName)
      break
    case 'email':
      checkEmail()
      break
    case 'country':
      checkCountry()
      break
    case 'postalCode':
      checkPostalCode()
      break
    case 'phone':
      checkPhone()
      break
    case 'creditCard' :
      checkCreditCard()
      break
    case 'CVV':
      checkCardSecurityCode()
      break
    case 'expDate':
      checkExpDate()
      break
  }
}))

const showMessage = (className, msg) => {
  let message = document.createElement('div')
  message.className = 'message'
  if (className) {
    message.classList.add(className)
  }
  message.innerHTML = msg
  document.querySelector('main').append(message)
  setTimeout(() => message.remove(), 3000)
}

function formSubmitHandler (event) {
  event.preventDefault()

  let isFirstNameValid = checkUserName(firstName)
  let isLastNameValid = checkUserName(lastName)
  let isEmailValid = checkEmail()
  let isCountryValid = checkCountry()
  let isPostalCodeValid = checkPostalCode()
  let isPhoneValid = checkPhone()
  let isCreditCardValid = checkCreditCard()
  let isCreditCardSecurityCodeValid = checkCardSecurityCode()
  let isExpDateValid = checkExpDate()

  let isFormValid = isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isCountryValid &&
    isPostalCodeValid &&
    isPhoneValid &&
    isCreditCardValid &&
    isCreditCardSecurityCodeValid &&
    isExpDateValid

  if (isFormValid) {
    let formData = new FormData(form)
    fetch('/order', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          showMessage('error', 'Network response was not OK')
        }
        if (response.ok) {
          return response.json()
        }
      })
      .then(result => {
        showMessage('success', JSON.stringify(result.message))
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error)
      })
  }
}

form.addEventListener('submit', formSubmitHandler)
