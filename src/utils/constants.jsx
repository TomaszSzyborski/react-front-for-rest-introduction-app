export const keyLocalStorageItemName = "key-from-reception"
export const frontendFlagsAmount = 10
export const trayOpeningsLocalStorageItemObject = {key: "tray-openings", value: 0}

export const toggleActive = (element) => {
    element.classList.toggle('is-active')
}

export const toggleTransparentBackground = (element) => {
    element.style.toggle({background: "transparent"})
}
