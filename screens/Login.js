import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import styles from '../styles'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //login
  const onLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        Alert.alert("Login Error", error.message);
      }
    }
  };
  //register
  const onRegister = async () => {
    if (email !== '' && password !== '') {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        Alert.alert("Registration Error", error.message);
      }
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>Welcome to ChatApp</Text>
      <TextInput
        style={styles.loginInput}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.loginInput}
        placeholder="Enter password"
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.loginButton, styles.loginButtonSecondary]} 
        onPress={onRegister}
      >
        <Text style={styles.loginButtonSecondaryText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}