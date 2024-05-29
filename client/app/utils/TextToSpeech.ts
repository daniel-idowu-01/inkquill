const speak = (text: string) => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  } else {
    alert("Sorry, your browser does not support text to speech!");
  }
};

export { speak };
