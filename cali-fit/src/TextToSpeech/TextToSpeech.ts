export const handleTextToSpeech = (text: string) => {
  let synth = window.speechSynthesis
  let voices = synth.getVoices()
  let textToSpeech = new SpeechSynthesisUtterance(text)
  synth.speak(textToSpeech)
}
