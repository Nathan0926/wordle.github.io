// Array of words to choose from
const words = [
    "apple", "beach", "chair", "dance", "eagle", "fence", "grape", "house", "igloo", "jumps",
    "knife", "lemon", "mango", "nurse", "ocean", "peach", "quilt", "river", "snail", "tiger",
    "under", "visit", "water", "xerox", "yacht", "zebra", "angel", "blaze", "cloud", "drive",
    "fairy", "glide", "hotel", "image", "jelly", "kiosk", "latch", "mould", "night", "opera",
    "peach", "quake", "ranch", "smile", "train", "ultra", "viper", "wrist", "xylo", "yield",
    "zoned", "amber", "blink", "crisp", "diver", "evoke", "flute", "glide", "haste", "insect",
    "jolly", "knock", "latch", "mirth", "nudge", "oasis", "prism", "quirk", "roast", "slice",
    "twist", "unity", "vowal", "whisk", "xylon", "yacht", "zebra", "ashes", "bland", "crisp",
    "demon", "eagle", "flare", "grind", "haste", "indie", "joint", "knack", "latch", "mover",
    "nudge", "onion", "prism", "quest", "ruler", "snack", "twist", "unity", "vocal", "wagon",
    "audio", "shelf", "crypt"
];


// Choose a random 5-letter word from the list
let selectedWord = getRandomWord(words);

let attempts = 6; // Number of attempts allowed
let guessedWord = Array(5).fill("_");

document.getElementById("word-display").textContent = guessedWord.join(" ");
document.getElementById("attempts").textContent = attempts;

document.getElementById("guess-button").addEventListener("click", () => {
    if (attempts > 0) {
        const guessInput = document.getElementById("guess");
        const guess = guessInput.value.toLowerCase();

        if (guess.length === 5) {
            // Check if the guess is a 5-letter word
            const indices = [];

            // Compare the guess with the selectedWord and find correct letters
            for (let i = 0; i < 5; i++) {
                if (guess[i] === selectedWord[i]) {
                    guessedWord[i] = guess[i];
                } else if (selectedWord.includes(guess[i])) {
                    indices.push(i);
                }
            }

            // Update the display
            document.getElementById("word-display").textContent = guessedWord.join(" ");

            if (guessedWord.join("") === selectedWord) {
                showMessage("Congratulations! You've won!");
                disableInput();
            } else {
                attempts--;
                document.getElementById("attempts").textContent = attempts;
                if (attempts === 0) {
                    showMessage(`You've run out of attempts. The correct word was "${selectedWord}".`);
                    disableInput();
                } else {
                    showMessage(`Incorrect guess. Correct letters: ${selectedWord.charAt(indices[0]) || '-'}${selectedWord.charAt(indices[1]) || '-'}${selectedWord.charAt(indices[2]) || '-'}${selectedWord.charAt(indices[3]) || '-'}${selectedWord.charAt(indices[4]) || '-'}`);
                }
            }
        } else {
            showMessage("Please enter a 5-letter word.");
        }

        guessInput.value = "";
    }
});

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

function disableInput() {
    document.getElementById("guess").disabled = true;
    document.getElementById("guess-button").disabled = true;
}

function getRandomWord(wordList) {
    const fiveLetterWords = wordList.filter(word => word.length === 5);
    const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
    return fiveLetterWords[randomIndex];
}