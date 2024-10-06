import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { useAppContext } from '../../context/AppContext';
import { Event } from '../../types';
import { format } from 'date-fns';

export const EventsScreen = () => {
  const { events, addEvent, attendEvent, currentUser } = useAppContext();
  const [visible, setVisible] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description && newEvent.date && newEvent.location && currentUser) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        location: newEvent.location,
        organizer: currentUser.name,
        attendees: [],
      };
      addEvent(event);
      setNewEvent({});
      hideDialog();
    }
  };

  const handleAttendEvent = (eventId: string) => {
    if (currentUser) {
      attendEvent(eventId, currentUser.id);
    }
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>Date: {format(new Date(item.date), 'PPP')}</Paragraph>
        <Paragraph>Location: {item.location}</Paragraph>
        <Paragraph>Organizer: {item.organizer}</Paragraph>
        <Paragraph>Attendees: {item.attendees.length}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => handleAttendEvent(item.id)}
          disabled={currentUser && item.attendees.includes(currentUser.id)}
        >
          {currentUser && item.attendees.includes(currentUser.id) ? 'Attending' : 'Attend'}
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={showDialog} style={styles.addButton}>
        Add New Event
      </Button>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Add New Event</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
              style={styles.input}
            />
            <TextInput
              label="Description"
              value={newEvent.description}
              onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
              multiline
              numberOfLines={3}
              style={styles.input}
            />
            <TextInput
              label="Date"
              value={newEvent.date}
              onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
              placeholder="YYYY-MM-DDTHH:mm:ssZ"
              style={styles.input}
            />
            <TextInput
              label="Location"
              value={newEvent.location}
              onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleAddEvent}>Add</Button>
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
  addButton: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
});