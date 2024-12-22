import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { AppBar, Toolbar, IconButton, Typography, Box, InputBase } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { fetchConversations, fetchUserDetails, searchUsers, createChatroom } from '../api.service';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

type Conversation = {
    id: string;
    lastMessage: {
        messageContent: string;
        senderID: string;
        timestamp: string;
        isRead: boolean;
    };
    participants: string[];
    updatedAt: string;
};

type ParticipantDetails = {
    name: string;
    photo_url: string;
};

type ConversationDisplay = {
    id: string;
    participantName: string;
    participantPhoto: string;
    lastMessageContent: string;
    unreadMessages: number;
    updatedAt: string;
};

const MessagePage: React.FC = () => {
    const history = useHistory();
    const [conversations, setConversations] = useState<ConversationDisplay[]>([]);
    const userId = JSON.parse(localStorage.getItem('userInfo') || '{}').uid || '';

    const handleBack = () => history.goBack();

    useEffect(() => {
        const loadConversations = async () => {
            try {
                const response = await fetchConversations();
    
                if (response.success && Array.isArray(response.data)) {
                    const processedConversations = await Promise.all(
                        response.data.map(async (conversation: Conversation) => {
                            try {
                                const otherParticipantId = conversation.participants.find(
                                    (participant) => participant !== userId
                                );
    
                                if (!otherParticipantId) {
                                    console.warn(
                                        `No other participant found for conversation ${conversation.id}`
                                    );
                                    return null;
                                }
    
                                const participantDetails: ParticipantDetails = await fetchUserDetails(
                                    otherParticipantId
                                );
    
                                return {
                                    id: conversation.id,
                                    participantName: participantDetails.name || 'Unknown',
                                    participantPhoto:
                                        participantDetails.photo_url ||
                                        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
                                    lastMessageContent:
                                        conversation.lastMessage?.messageContent || 'No message available',
                                    unreadMessages:
                                        conversation.lastMessage.senderID !== userId &&
                                        !conversation.lastMessage.isRead
                                            ? 1
                                            : 0,
                                    updatedAt: conversation.lastMessage?.timestamp || conversation.updatedAt,
                                };
                            } catch (error) {
                                console.error(
                                    `Error processing conversation ${conversation.id}:`,
                                    error
                                );
                                return null;
                            }
                        })
                    );
    
                    // Filter out null conversations and sort by timestamp (newest first)
                    const sortedConversations = processedConversations
                        .filter((conversation) => conversation !== null) // Remove nulls
                        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
                    setConversations(sortedConversations);
                } else {
                    console.error('Invalid response format from fetchConversations');
                }
            } catch (error) {
                console.error('Error loading conversations:', error);
            }
        };
    
        loadConversations();
    
        // Set up polling for auto-refresh every 3 seconds
        const interval = setInterval(loadConversations, 3000);
    
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [userId]);
    

    const navigateToChatRoom = (conversationID: string, participantName: string, participantPhoto: string) => {
        history.push(`/chat/${conversationID}`, {
            userName: participantName,
            profileImage: participantPhoto,
            initialMessages: [],
        });
    };

    const [searchQuery, setSearchQuery] = useState<string>(''); // Search query
    const [searchResults, setSearchResults] = useState<any[]>([]); // User search results
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  
    const handleSearch = async () => {
      if (!searchQuery.trim()) return; // Ignore empty queries
      setIsLoading(true);
      try {
          const response = await searchUsers(searchQuery);
          if (response.success && Array.isArray(response.users)) { // Access 'users' key
              setSearchResults(response.users); // Update search results with users
          } else {
              setSearchResults([]); // No users found
          }
      } catch (error) {
          console.error('Error searching users:', error);
          setSearchResults([]);
      } finally {
          setIsLoading(false);
      }
  };

  const handleUserSelection = async (user: any) => {
    try {
        const chatRoomResponse = await createChatroom(user.uid);
        if (chatRoomResponse.success && chatRoomResponse.data) {
            console.log('Chat room created or retrieved successfully:', chatRoomResponse.data);
        } else {
            console.error('Failed to create or retrieve chat room');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axios error with response data
            if (error.response?.status === 409) {
                // Conflict - Chatroom already exists
                const existingChatRoom = error.response?.data?.data;
                if (existingChatRoom?.id) {
                    console.log('Chatroom already exists:', existingChatRoom);
                } else {
                    console.error('Chatroom already exists but no ID was provided.');
                }
            } else {
                console.error('Error creating chat room:', error.response?.data || error.message);
            }
        } else if (error instanceof Error) {
            // General JavaScript error
            console.error('Error creating chat room:', error.message);
        } else {
            // Unknown error type
            console.error('An unknown error occurred:', error);
        }
    }
};




    return (
        <IonPage>
            <AppBar position="fixed"
                    sx={{
                        backgroundColor: 'white',
                        borderBottomLeftRadius: '30px',
                        borderBottomRightRadius: '30px',
                        height: '82px',
                        paddingTop: '25px',
                    }}>
                <Toolbar>
                    <IconButton onClick={handleBack} color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" style={{ marginLeft: 16, fontWeight: 600 }}>
                        Messages
                    </Typography>
                </Toolbar>
            </AppBar>

            <IonContent style={{ marginTop: '90px' }}>

               {/* Search Bar */}
        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '5px 10px',
            width: '95%',
            maxWidth: '100%',
            margin: '20px auto',
            marginTop : '120px', 
          }}
        >
          <SearchIcon sx={{ color: '#007bff', marginRight: '10px' }} />
          <InputBase
            placeholder="Search users"
            sx={{ flex: 1, color: '#333' }}
            inputProps={{ 'aria-label': 'search users' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter
          />
        </Box>

        {/* Loading Indicator */}
        {isLoading && (
          <Typography sx={{ textAlign: 'center', marginTop: '10px' }}>
            Loading...
          </Typography>
        )}

        {/* Search Results */}
        {!isLoading && searchResults && searchResults.length > 0 ? (
          <Box sx={{ marginTop: '10px', padding: '10px' }}>
            {searchResults.map((user) => (
              <Box
                key={user.uid}
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '10px',
                  marginBottom: '10px',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                }}
                onClick={() => handleUserSelection(user)}
              >
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          !isLoading && searchQuery && <Typography>No users found</Typography>
        )}
                <Box style={{ marginTop: '120px'}} display="flex" flexDirection="column" alignItems="center">
                    {conversations.length === 0 ? (
                        <Typography style={{ marginTop: '20px', color: '#666' }}>No conversations available</Typography>
                    ) : (
                        conversations.map((conversation) => (
                            <Box
                                key={conversation.id}
                                onClick={() =>
                                    navigateToChatRoom(
                                        conversation.id,
                                        conversation.participantName,
                                        conversation.participantPhoto
                                    )
                                }
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                style={{
                                    padding: '16px',
                                    backgroundColor: '#fff',
                                    borderBottom: '1px solid #E0E0E0',
                                    cursor: 'pointer',
                                    width: '100%',
                                }}
                            >
                                <Box display="flex" alignItems="center">
                                    <Box
                                        component="img"
                                        src={conversation.participantPhoto}
                                        alt={conversation.participantName}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            marginRight: '12px',
                                        }}
                                    />
                                    <Box>
                                        <Typography style={{ fontWeight: 600 }}>
                                            {conversation.participantName}
                                        </Typography>
                                        <Typography style={{ fontSize: '12px', color: '#666' }}>
                                            {conversation.lastMessageContent}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    style={{
                                        backgroundColor: '#0094FF',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                    }}
                                >
                                    {conversation.unreadMessages}
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>
            </IonContent>
        </IonPage>
    );
};

export default MessagePage;
