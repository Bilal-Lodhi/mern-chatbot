function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading }) {
    const [inputText, setInputText] = React.useState('');
    const [hasUserMessaged, setHasUserMessaged] = React.useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function sendMessage() {
        if (!inputText.trim() || isLoading) return;

        // Remove welcome messages on first user message
        let messagesToUse = chatMessages;
        if (!hasUserMessaged) {
            messagesToUse = chatMessages.filter(msg => msg.sender === 'user');
            setHasUserMessaged(true);
        }

        const newChatMessages = [
            ...messagesToUse,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID()
            }
        ];

        setChatMessages(newChatMessages);
        setIsLoading(true);

        // Simulate loading delay
        setTimeout(() => {
            const response = Chatbot.getResponse(inputText);
            setChatMessages([
                ...newChatMessages,
                {
                    message: response,
                    sender: 'robot',
                    id: crypto.randomUUID()
                }
            ]);
            setIsLoading(false);
        }, 500);

        setInputText('');
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                value={inputText}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isLoading}
                className="chat-input"
            />
            <button
                onClick={sendMessage}
                disabled={isLoading}
                className="send-button"
            >{isLoading ? 'Loading...' : 'Send'}</button>
        </div>
    );
}

function ChatMessage({ message, sender }) {
    return (
        <div className={
            sender === 'user'
                ? 'chat-message-user'
                : 'chat-message-robot'
        }>
            {sender === 'robot' && (
                <img src="robot.png" className="chat-message-profile" />
            )}
            <div className="chat-message-text">
                {message}
            </div>
            {sender === 'user' && (
                <img src="user.png" className="chat-message-profile" />
            )}
        </div>
    );
}

function ChatMessages({ chatMessages, isLoading }) {
    const chatMessagesRef = React.useRef(null);

    React.useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages, isLoading]);

    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                );
            })}
            {isLoading && (
                <div className="chat-message-robot">
                    <img src="robot.png" className="chat-message-profile" />
                    <div className="loading-message">
                        <div className="loading-spinner"></div>
                        <span>Bot is typing...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

function App() {
    const [chatMessages, setChatMessages] = React.useState([
        {
            message: 'Welcome to the Chatbot! 👋',
            sender: 'robot',
            id: crypto.randomUUID()
        },
        {
            message: 'I can help you with questions, flip a coin, roll a dice, or tell you jokes!',
            sender: 'robot',
            id: crypto.randomUUID()
        },
        {
            message: 'Feel free to ask me anything. What would you like to know?',
            sender: 'robot',
            id: crypto.randomUUID()
        }
    ]);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div className="app-container">
            <div className="app-header">
                <h1>✨ AI Chatbot</h1>
            </div>
            <ChatMessages
                chatMessages={chatMessages}
                isLoading={isLoading}
            />
            <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </div>
    );
}

const container = document.querySelector('.js-container');
ReactDOM.createRoot(container).render(<App />);
