'use strict'

let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})

const header = document.querySelector('.header')
const logo = header.querySelector('.header__logo')
const nav = header.querySelector('.header__nav')
const about = document.querySelector('.about h2')
const program = document.querySelector('.program h2')
const tariffs = document.querySelector('.tariffs h2')

const menu = header.querySelector('.header__menu')
const burger = header.querySelector('.header__burger')
const overlay = header.querySelector('.header__overlay')
const overlayTransition = getTransitionDuration(overlay)
const menuTransition = getTransitionDuration(menu)
const tablet = 820
const mobile = 440

logo.addEventListener('click', onLogoClick)
logo.addEventListener('keydown', onLogoClick)

nav.addEventListener('click', onNavClick)
nav.addEventListener('keydown', onNavClick)

function onNavClick(evt) {
  if (evt.target.classList.contains('header__nav-item')) {

    if (evt.type === 'keydown' && evt.code !== 'Enter') return

    let section

    switch(evt.target.dataset.nav) {
      case 'about':
        section = about
        break
      case 'program':
        section = program
        break
      case 'tariffs':
        section = tariffs
        break
    }

    let y = section.getBoundingClientRect().y + window.scrollY - header.offsetHeight - 20

    if (window.innerWidth <= tablet) closeMenu()

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    })
  }
}

function onLogoClick(evt) {
  if (evt.type === 'keydown' && evt.code !== 'Enter') return

  if (window.innerWidth <= tablet && menu.classList.contains('header__menu--open')) closeMenu()

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// ***

burger.addEventListener('click', onBurgerClick )

function onBurgerClick() {
  if (menu.classList.contains('header__menu--open')) {
    closeMenu()
    return
  }

  openMenu()
}

function openMenu() {
  showMenu()
  showOverlay()
}

function closeMenu() {
  hideMenu()
  hideOverlay()
}

function showMenu() {
  menu.classList.toggle('header__menu--block')
  setTimeout(() => menu.classList.toggle('header__menu--open'))
  burger.classList.toggle('header__burger--close')
}

function hideMenu() {
  menu.classList.toggle('header__menu--open')
  setTimeout(() => menu.classList.toggle('header__menu--block'), menuTransition)
  burger.classList.toggle('header__burger--close')
}

function showOverlay() {
  overlay.classList.toggle('header__overlay--none')
  setTimeout(() => overlay.classList.toggle('header__overlay--transparent'))
  document.body.classList.toggle('body--no-scroll')
}

function hideOverlay() {
  overlay.classList.toggle('header__overlay--transparent')
  setTimeout(() => overlay.classList.toggle('header__overlay--none'), overlayTransition)
  document.body.classList.toggle('body--no-scroll')
}

function getTransitionDuration(el) {
  return parseFloat(getComputedStyle(el).transitionDuration) * 1000
}

// ***

window.addEventListener('resize', onHeaderResize)

function onHeaderResize() {
  if (window.innerWidth > tablet && menu.classList.contains('header__menu--open')) {
    closeMenu()
  }
}

// ***

window.addEventListener('click', onOverlayClick)

function onOverlayClick(event) {
  if (event.target === overlay) {
    closeMenu()
  }
}
