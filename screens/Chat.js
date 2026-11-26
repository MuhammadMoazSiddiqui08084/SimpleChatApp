import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../firebase';
import styles, { colors } from '../styles';

export default function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();

  //Logout button to navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.chatLogoutButton} onPress={() => signOut(auth)}>
          <Text style={styles.chatLogoutText}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  //Firestore messages in real-time
  useEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'asc')); //'asc' better for standard FlatList

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date()
      }));
      setMessages(fetchedMessages);
    });

    return unsubscribe;
  }, []);

  //Send message payload to Firestore
  const onSend = async () => {
    if (inputText.trim() === '') return;

    const messageData = {
      text: inputText,
      createdAt: new Date(),
      user: {
        _id: auth?.currentUser?.email,
        email: auth?.currentUser?.email
      }
    };

    setInputText(''); //Clear input immediately for snappy UI

    try {
      await addDoc(collection(database, 'chats'), messageData);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  //Render chat bubbles
  const renderItem = ({ item }) => {
    const isCurrentUser = item.user?._id === auth?.currentUser?.email;

    return (
      <View style={[
        styles.messageRow,
        isCurrentUser ? styles.rowRight : styles.rowLeft
      ]}>
        <View style={[
          styles.bubble,
          isCurrentUser ? styles.bubbleRight : styles.bubbleLeft
        ]}>
          {!isCurrentUser && <Text style={styles.senderText}>{item.user.email}</Text>}
          <Text style={isCurrentUser ? styles.textRight : styles.textLeft}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.white }}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 12 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}