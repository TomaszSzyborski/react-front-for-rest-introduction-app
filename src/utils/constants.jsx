export const keyLocalStorageItemName = "key-from-reception"
export const frontendFlagsAmount = 10
export const trayOpeningsLocalStorageItemObject = {key: "tray-openings", value: 0}

// export const toggleActive = (element) => {
//
//     element.target.parentElement.classList.toggle('is-hidden')
//     element.target.classList.toggle('is-active')
// //     element.target.parentElement.parentElement.toggle('has-dropdown')
// //     element.target.parentElement.classList.toggle('has-dropdown')
// //     element.target.parentNode.classList.toggle('is-collapsed')
// //     let e = element.target.parentElement;
// //     while (e.firstChild) {
// //       e.removeChild(e.firstChild);
// //     }
// //     element.target.parentElement.classList.toggle('dropdown-trigger')
// }
// export const closeTray = (event) => {
//  event.target.props["data-dismiss"]="quickview"
// }
export const toggleTransparentBackground = (element) => {
    element.style.toggle({background: "transparent"})
}

export const createOption = (text, ComponentClass, props = null) => {
    const item = ComponentClass(props)
    return {label: text, value: item}
}