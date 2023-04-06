export const playAudio = async (audio) => {
       await new Promise(res => {
           audio.play()
           audio.onended = res
       })
   }

export const loopAudio = async (audio) => {
   await new Promise(res => {
        audio.play()
        audio.onended = () => {
        audio.play()
        }
   })
}

export const mute = (audio) => {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}
