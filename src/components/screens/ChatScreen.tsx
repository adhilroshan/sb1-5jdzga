import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, TextInput, Button } from 'react-native-paper';
import { useAppContext } from '../../context/AppContext';
import { ChatMessage } from '../../types';
import { format } from 'date-fns';

export const ChatScreen = () => {
  const { chats, addChat, currentUser } = useAppContext();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim() && currentUser) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        receiverId: 'all', // For simplicity, we're sending to all users
        content: message,
        timestamp: new Date().toISOString(),
      };
      addChat(newMessage);
      setMessage('');
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.senderId === currentUser?.id ? 'You' : item.senderId}</Title>
        <Paragraph>{item.content}</Paragraph>
        <Paragraph style={styles.timestamp}>
          {format(new Date(item.timestamp), 'MMM d, yyyy HH:mm')}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          label="Type a message"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
        <Button mode="contained" onPress={sendMessage}>
          Send
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
});