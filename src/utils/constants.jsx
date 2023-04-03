export const keyLocalStorageItemName = "key-from-reception"
export const frontendFlagsAmount = 14
export const trayOpeningsLocalStorageItemObject = {key: "tray-openings", value: 0}

export const toggleTransparentBackground = (element) => {
    element.style.toggle({background: "transparent"})
}

export const createOption = (text, ComponentClass, props = null) => {
    const item = ComponentClass(props)
    return {label: text, value: item}
}