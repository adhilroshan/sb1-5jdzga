import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { format } from 'date-fns';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

export const NoticeboardScreen = () => {
  const [notices, setNotices] = useState<Notice[]>([
    { id: 1, title: "Exam Schedule", content: "Final exams start next week. Check the schedule on the college website.", date: "2023-05-15" },
    { id: 2, title: "Campus Event", content: "Join us for the annual college fest this weekend!", date: "2023-05-20" },
    { id: 3, title: "Library Notice", content: "Extended library hours during exam week.", date: "2023-05-18" },
  ]);
  const [visible, setVisible] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const addNewNotice = () => {
    if (newNotice.title && newNotice.content) {
      const notice: Notice = {
        id: Date.now(),
        title: newNotice.title,
        content: newNotice.content,
        date: new Date().toISOString().split('T')[0],
      };
      setNotices([notice, ...notices]);
      setNewNotice({ title: '', content: '' });
      hideDialog();
    }
  };

  const renderNotice = ({ item }: { item: Notice }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.content}</Paragraph>
        <Paragraph style={styles.date}>Posted on: {format(new Date(item.date), 'MMM d, yyyy')}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={showDialog} style={styles.addButton}>
        Add New Notice
      </Button>
      <FlatList
        data={notices}
        renderItem={renderNotice}
        keyExtractor={(item) => item.id.toString()}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Add New Notice</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={newNotice.title}
              onChangeText={(text) => setNewNotice({ ...newNotice, title: text })}
              style={styles.input}
            />
            <TextInput
              label="Content"
              value={newNotice.content}
              onChangeText={(text) => setNewNotice({ ...newNotice, content: text })}
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={addNewNotice}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  addButton: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
});