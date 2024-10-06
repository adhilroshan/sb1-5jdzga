import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useAppContext } from '../../context/AppContext';
import { Post } from '../../types';
import { format } from 'date-fns';

export const HomeScreen = () => {
  const { posts, addPost, currentUser } = useAppContext();
  const [newPostContent, setNewPostContent] = useState('');

  const handleAddPost = () => {
    if (newPostContent.trim() && currentUser) {
      const newPost: Post = {
        id: Date.now().toString(),
        userId: currentUser.id,
        content: newPostContent,
        likes: 0,
        comments: 0,
        timestamp: new Date().toISOString(),
      };
      addPost(newPost);
      setNewPostContent('');
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.userId}</Title>
        <Paragraph>{item.content}</Paragraph>
        <Paragraph style={styles.timestamp}>
          {format(new Date(item.timestamp), 'MMM d, yyyy HH:mm')}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button icon="thumb-up">Like ({item.likes})</Button>
        <Button icon="comment">Comment ({item.comments})</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <TextInput
        label="What's on your mind?"
        value={newPostContent}
        onChangeText={setNewPostContent}
        multiline
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddPost} style={styles.button}>
        Post
      </Button>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  card: {
    marginBottom: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
});