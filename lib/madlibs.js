function showAlert() {
  alert("Yay!  You clicked the Generate button.  Let's learn how to make it actually generate a Mad Lib.");
}

function playSound(sound) {
  var audioElement = new Audio(sound);
  audioElement.play();
}

function readText(text) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = text.replace( /(<([^>]+)>)/ig, '');;
  window.speechSynthesis.speak(msg);
}

class MadLibGenerator {
  nouns = [];
  verbs = [];
  adjectives = [];

  constructor(nounPlaceholder, verbPlaceholder, adjectivePlaceholder){
    this.nounPlaceholder = nounPlaceholder;
    this.verbPlaceholder = verbPlaceholder;
    this.adjectivePlaceholder = adjectivePlaceholder;
  }

  generate(input) {
    const words = input.split(" ");

    const processedWords = [];

    for (const word of words) {
      processedWords.push(this.processWord(word));
    }

    const madLib = processedWords.join(" ");

    return madLib;
  }

  randomWord(wordList) {
    const wordCount = wordList.length;

    const index = Math.floor(Math.random() * (wordCount));
    
    return wordList[index];
  }

  fillPlaceholder(word, placeholder, wordOptions) {
    const replacement = this.randomWord(wordOptions);
    return "<b>" + word.replace(placeholder, replacement) + "</b>";
  }

  processWord(word) {
    if (word.includes(nounPlaceholder)) {
        return this.fillPlaceholder(word, nounPlaceholder, nouns);
      } else if (word.includes(verbPlaceholder)) {
        return this.fillPlaceholder(word, verbPlaceholder, verbs);
      } else if (word.includes(adjectivePlaceholder)) {
        return this.fillPlaceholder(word, adjectivePlaceholder, adjectives);
      } else {
        return word;
      }
  }
}