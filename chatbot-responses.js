// Add custom responses to the chatbot
Chatbot.addResponses({
    'what is your name|who are you': 'I\'m a helpful chatbot! You can ask me questions or ask me to flip a coin or roll a dice.',
    
    'how old are you': 'I was created by SuperSimpleDev. I don\'t have an age, but I\'m always learning!',
    
    'what time is it': function() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `It is currently ${hours}:${minutes}`;
    },
    
    'what\'s the weather': 'I don\'t have access to weather data, but you can check a weather website for that!',
    
    'tell me a joke': function() {
        const jokes = [
            'Why did the programmer quit his job? Because he didn\'t get arrays.',
            'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
            'Why do Java developers wear glasses? Because they don\'t C#!'
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        return randomJoke;
    },
    
    'what can you do|help': 'I can flip a coin, roll a dice, tell you today\'s date, tell jokes, and answer simple questions!',
    
    'hello bot|hey bot': 'Hey there! How can I assist you today?',
    
    'goodbye|bye|see you': 'Goodbye! Feel free to chat with me anytime!',
    
    'it was 271k, wasn\'t it?|271k': 'Yes'
});
