import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { useAppContext } from '../../context/AppContext';
import { DatingProfile } from '../../types';

export const DatingScreen = () => {
  const { datingProfiles, currentUser } = useAppContext();

  const renderProfile = ({ item }: { item: DatingProfile }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.userId}</Title>
        <Paragraph>{item.bio}</Paragraph>
        <View style={styles.interestsContainer}>
          {item.interests.map((interest, index) => (
            <Chip key={index} style={styles.chip}>{interest}</Chip>
          ))}
        </View>
      </Card.Content>
      <Card.Actions>
        <Button icon="heart" mode="contained" onPress={() => console.log(`Liked ${item.userId}`)}>
          Like
        </Button>
        <Button icon="message" onPress={() => console.log(`Message ${item.userId}`)}>
          Message
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={datingProfiles.filter(profile => profile.userId !== currentUser?.id)}
        renderItem={renderProfile}
        keyExtractor={(item) => item.id}
      />
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
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    margin: 4,
  },
});