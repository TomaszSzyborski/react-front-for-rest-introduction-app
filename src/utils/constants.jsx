export const keyLocalStorageItemName = "key-from-reception"
//TODO create an object containing flags to manage flags easier
export const frontendFlagsAmount = 13
export const trayOpeningsLocalStorageItemObject = {key: "tray-openings", value: 0}

export const toggleTransparentBackground = (element) => {
    element.style.toggle({background: "transparent"})
}

export const createOption = (text, ComponentClass, props = null) => {
    const item = ComponentClass(props)
    return {label: text, value: item}
}