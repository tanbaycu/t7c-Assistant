const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

let isListening = true;

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Boss...");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon Master...");
  } else {
    speak("Good Evening Sir...");
  }
}

window.addEventListener("load", () => {
  speak("Initializing T7C...");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
  console.log("Voice recognition activated. You can speak now.");
};

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

recognition.onend = function () {
  if (isListening) {
    recognition.start();
  }
};

btn.addEventListener("click", () => {
  if (!isListening) {
    isListening = true;
    content.textContent = "Listening...";
    recognition.start();
  } else {
    isListening = false;
    content.textContent = "Click here to speak";
    recognition.stop();
  }
});

function takeCommand(message) {
  if (
    message.includes("hey") ||
    message.includes("hello") ||
    message.includes("hi")
  ) {
    speak("Hello Sir, How May I Help You?");
  } else if (message.includes("how are you")) {
    speak("I'm doing well, thank you for asking. How can I assist you today?");
  } else if (message.includes("good morning")) {
    speak("Good morning! I hope you're having a great start to your day.");
  } else if (message.includes("good afternoon")) {
    speak("Good afternoon! I hope your day is going well so far.");
  } else if (message.includes("good evening")) {
    speak("Good evening! I hope you've had a productive day.");
  } else if (message.includes("good night")) {
    speak("Good night! Sleep well and have sweet dreams.");
  } else if (message.includes("your name")) {
    speak("My name is T7C Assistant, made by tanbaycu.");
  } else if (message.includes("contact with me")) {
    speak("Good night! Sleep well and have sweet dreams.");

    // Web browsing
  } else if (message.includes("open google")) {
    window.open("https://google.com", "_blank");
    speak("Opening Google...");
  } else if (message.includes("open youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("Opening Youtube...");
  } else if (message.includes("open facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("Opening Facebook...");
  } else if (message.includes("open twitter")) {
    window.open("https://twitter.com", "_blank");
    speak("Opening Twitter...");
  } else if (message.includes("open instagram")) {
    window.open("https://instagram.com", "_blank");
    speak("Opening Instagram...");
  } else if (message.includes("open linkedin")) {
    window.open("https://linkedin.com", "_blank");
    speak("Opening LinkedIn...");

    // Searches
  } else if (
    message.includes("what is") ||
    message.includes("who is") ||
    message.includes("what are")
  ) {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText =
      "This is what I found on the internet regarding " + message;
    speak(finalText);
  } else if (message.includes("wikipedia")) {
    window.open(
      `https://en.wikipedia.org/wiki/${message
        .replace("wikipedia", "")
        .trim()}`,
      "_blank"
    );
    const finalText = "This is what I found on Wikipedia regarding " + message;
    speak(finalText);

    // Time and Date
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric"
    });
    const finalText = "The current time is " + time;
    speak(finalText);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    const finalText = "Today's date is " + date;
    speak(finalText);
  } else if (message.includes("day")) {
    const day = new Date().toLocaleString(undefined, { weekday: "long" });
    const finalText = "Today is " + day;
    speak(finalText);

    // Weather
  } else if (message.includes("weather")) {
    speak(
      "I'm sorry, I don't have access to real-time weather data. You can check a weather app or website for accurate information."
    );

    // Calculator and Math
  } else if (message.includes("calculator")) {
    window.open("Calculator:///");
    const finalText = "Opening Calculator";
    speak(finalText);
  } else if (message.includes("add") || message.includes("plus")) {
    speak(
      "I can perform basic calculations. Please provide the numbers you want to add."
    );
  } else if (message.includes("subtract") || message.includes("minus")) {
    speak(
      "I can perform basic calculations. Please provide the numbers you want to subtract."
    );
  } else if (message.includes("multiply") || message.includes("times")) {
    speak(
      "I can perform basic calculations. Please provide the numbers you want to multiply."
    );
  } else if (message.includes("divide") || message.includes("divided by")) {
    speak(
      "I can perform basic calculations. Please provide the numbers you want to divide."
    );

    // System commands
  } else if (message.includes("volume up")) {
    speak(
      "I'm sorry, I don't have control over your system volume. You can use your device's volume controls."
    );
  } else if (message.includes("volume down")) {
    speak(
      "I'm sorry, I don't have control over your system volume. You can use your device's volume controls."
    );
  } else if (message.includes("mute") || message.includes("unmute")) {
    speak(
      "I'm sorry, I don't have control over your system audio. You can use your device's mute/unmute function."
    );

    // Music and entertainment
  } else if (message.includes("play music")) {
    speak(
      "I'm sorry, I don't have access to a music library. You can use a music streaming service or your device's music player."
    );
  } else if (message.includes("stop music")) {
    speak(
      "I'm sorry, I don't have control over your music playback. You can stop the music using your current music player."
    );
  } else if (message.includes("next song")) {
    speak(
      "I'm sorry, I don't have control over your music playback. You can change songs using your current music player."
    );
  } else if (message.includes("previous song")) {
    speak(
      "I'm sorry, I don't have control over your music playback. You can change songs using your current music player."
    );

    // Reminders and alarms
  } else if (message.includes("set a reminder")) {
    speak(
      "I'm sorry, I don't have the ability to set reminders. You can use your device's built-in reminder app."
    );
  } else if (message.includes("set an alarm")) {
    speak(
      "I'm sorry, I don't have the ability to set alarms. You can use your device's built-in alarm app."
    );

    // General knowledge questions
  } else if (message.includes("who created you")) {
    speak(
      "I was created by a developer as a simple voice assistant demonstration."
    );
  } else if (message.includes("what can you do")) {
    speak(
      "I can help with basic tasks like web searches, opening websites, telling the time and date, and answering simple questions."
    );
  } else if (message.includes("how old are you")) {
    speak(
      "I don't have an age. I'm a computer program, so I don't age like humans do."
    );
  } else if (message.includes("are you real")) {
    speak(
      "I'm an artificial intelligence, which means I'm a computer program designed to assist and interact with humans."
    );
  } else if (message.includes("do you have feelings")) {
    speak(
      "As an AI, I don't have feelings or emotions in the way humans do. I'm designed to assist and provide information."
    );

    // Jokes and fun
  } else if (message.includes("tell me a joke")) {
    speak("Why don't scientists trust atoms? Because they make up everything!");
  } else if (message.includes("sing a song")) {
    speak(
      "I'm flattered, but I'm not programmed to sing. I don't think you'd enjoy my attempt at singing anyway!"
    );
  } else if (message.includes("do you like")) {
    speak(
      "As an AI, I don't have personal preferences or likes. I'm here to assist you with information and tasks."
    );

    // Language and translation
  } else if (message.includes("translate")) {
    speak(
      "I'm sorry, I don't have built-in translation capabilities. You can use an online translation service for accurate translations."
    );
  } else if (message.includes("what language")) {
    speak(
      "I communicate in English, but I don't have the ability to identify or translate other languages."
    );

    // Health and fitness
  } else if (message.includes("calories") || message.includes("nutrition")) {
    speak(
      "I'm not a nutritionist or fitness expert. For accurate health and nutrition information, please consult a professional or use a specialized app."
    );
  } else if (message.includes("workout") || message.includes("exercise")) {
    speak(
      "I'm not a fitness trainer. For personalized workout advice, please consult a professional trainer or use a fitness app."
    );

    // Travel
  } else if (
    message.includes("book a flight") ||
    message.includes("book a hotel")
  ) {
    speak(
      "I'm sorry, I don't have the ability to book travel arrangements. You can use a travel booking website or app for this."
    );
  } else if (message.includes("convert currency")) {
    speak(
      "I don't have real-time currency conversion data. You can use an online currency converter for accurate rates."
    );

    // Shopping
  } else if (message.includes("buy") || message.includes("purchase")) {
    speak(
      "I'm not able to make purchases. You can use online shopping websites or apps to buy items."
    );
  } else if (message.includes("price of")) {
    speak(
      "I don't have access to current price information. You can check online retailers or price comparison websites for accurate pricing."
    );

    // News
  } else if (message.includes("news") || message.includes("current events")) {
    speak(
      "I don't have access to current news. You can visit a news website or use a news app for up-to-date information."
    );

    // Sports
  } else if (message.includes("sports") || message.includes("score")) {
    speak(
      "I don't have access to live sports information. You can check sports websites or apps for current scores and updates."
    );
  } else if (message.includes("goodbye") || message.includes("bye")) {
    speak(
      "Goodbye! I'm stopping the conversation now. Click the button when you want to talk again."
    );
    isListening = false;
    recognition.stop();
  } else {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText = "I found some information for " + message + " on Google";
    speak(finalText);
  }
}
