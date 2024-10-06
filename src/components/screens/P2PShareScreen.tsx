import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Dialog, Portal, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useAppContext } from '../../context/AppContext';
import { SharedFile } from '../../types';

export const P2PShareScreen = () => {
  const { sharedFiles, addSharedFile, currentUser } = useAppContext();
  const [visible, setVisible] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const fileName = asset.uri.split('/').pop() || 'file';
      setNewFileName(fileName);
      showDialog();
    }
  };

  const shareFile = async (fileName: string) => {
    try {
      const fileUri = FileSystem.documentDirectory + fileName;
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Error sharing file:", error);
    }
  };

  const addNewFile = () => {
    if (newFileName && currentUser) {
      const newFile: SharedFile = {
        id: Date.now().toString(),
        name: newFileName,
        size: '1 MB', // This would typically be calculated based on the actual file
        ownerId: currentUser.id,
        sharedWith: [],
      };
      addSharedFile(newFile);
      hideDialog();
    }
  };

  const renderFile = ({ item }: { item: SharedFile }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>Size: {item.size}</Paragraph>
        <Paragraph>Owner: {item.ownerId}</Paragraph>
        <Paragraph>Shared with: {item.sharedWith.length} users</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button icon="share" onPress={() => shareFile(item.name)}>Share</Button>
        <Button icon="download" onPress={() => console.log(`Downloading ${item.name}`)}>Download</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Button icon="upload" mode="contained" onPress={pickImage} style={styles.uploadButton}>
        Upload New File
      </Button>
      <FlatList
        data={sharedFiles}
        renderItem={renderFile}
        keyExtractor={(item) => item.id}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>New File</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="File Name"
              value={newFileName}
              onChangeText={setNewFileName}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={addNewFile}>Add</Button>
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
  uploadButton: {
    marginBottom: 16,
  },
});