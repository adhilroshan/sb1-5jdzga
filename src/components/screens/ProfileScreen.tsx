import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Title, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useAppContext } from '../../context/AppContext';

export const ProfileScreen = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [bio, setBio] = useState('Passionate about technology and innovation. Always eager to learn new things!');

  const handleSave = () => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, name });
    }
    setEditing(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && currentUser) {
      const asset = result.assets[0];
      setCurrentUser({ ...currentUser, avatar: asset.uri });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: currentUser?.avatar || 'https://via.placeholder.com/150' }}
        style={styles.avatar}
      />
      <Button icon="camera" mode="outlined" onPress={pickImage} style={styles.imageButton}>
        Change Profile Picture
      </Button>
      {editing ? (
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      ) : (
        <Title style={styles.name}>{currentUser?.name}</Title>
      )}
      <Paragraph style={styles.email}>{currentUser?.name.toLowerCase().replace(' ', '.')}@college.edu</Paragraph>
      {editing ? (
        <TextInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          style={styles.input}
        />
      ) : (
        <Paragraph style={styles.bio}>{bio}</Paragraph>
      )}
      <Button
        mode="contained"
        onPress={() => (editing ? handleSave() : setEditing(true))}
        style={styles.button}
      >
        {editing ? 'Save Profile' : 'Edit Profile'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  imageButton: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    marginBottom: 16,
  },
  bio: {
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
});