import React, { useEffect, useState } from 'react';
import { fetchMessages, createMessage } from '../api.service'; // Make sure fetchMessages is defined in your api.service

// Define the type for a message
interface Message {
  ID: string;
  message_content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
}

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Store messages
  const [message, setMessage] = useState<string>(''); // Input message
  const [partnerID, setPartnerID] = useState<string | null>(null); // Partner ID
  const userID = localStorage.getItem('userUID'); // Get logged-in user ID from localStorage

  useEffect(() => {
    // Fetch messages when the component mounts
    const loadMessages = async () => {
      if (!userID) return; // If no user ID is found, return early

      try {
        const messagesData = await fetchMessages(userID); // Fetch all messages for this user
        if (Array.isArray(messagesData)) {
          setMessages(messagesData); // Set the messages array if the data is valid
          
          // Find the partner based on the sender/receiver ID
          const partner = messagesData.find((msg) => msg.sender_id !== userID);
          if (partner) {
            setPartnerID(partner.sender_id === userID ? partner.receiver_id : partner.sender_id);
          }
        } else {
          setMessages([]); // If the response is not an array, fallback to an empty array
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]); // Fallback to empty array if an error occurs
      }
    };

    loadMessages();
  }, [userID]); // Runs once when the component mounts or userID changes

  const handleSendMessage = async () => {
    if (!partnerID || !message.trim()) return; // Do nothing if no partner or empty message

    try {
      const newMessage = {
        message_content: message,
        receiver_id: partnerID,
        sender_id: userID,
      };
      const response = await createMessage(newMessage); // Send the new message to the backend
      if (response.data) {
        setMessages([...messages, response.data]); // Add the new message to the state
        setMessage(''); // Clear the message input after sending
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Chat {partnerID ? `with ${partnerID}` : 'not started yet'}</h2>
      {partnerID ? (
        <>
          <div>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg.ID}>
                  <strong>{msg.sender_id === userID ? 'You' : 'Partner'}:</strong> {msg.message_content}
                </div>
              ))
            ) : (
              <div>No messages to display</div>
            )}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </>
      ) : (
        <div>No conversation started yet.</div>
      )}
    </div>
  );
};

export default ChatComponent;
