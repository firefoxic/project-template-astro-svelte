import { activateNavigation } from "./Navigation.js"

let navigations = document.querySelectorAll(`.Navigation`)

navigations.forEach((navigation) => { activateNavigation(navigation) })
