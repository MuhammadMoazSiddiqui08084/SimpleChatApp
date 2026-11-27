# SimpleChatApp

A cross-platform mobile messaging application built with **React Native (Expo SDK 51)** and **Firebase v10**. SimpleChatApp decouples the UI from data persistence, providing real-time, event-driven message synchronization over WebSockets via Cloud Firestore.

---

## Architecture & Tech Stack

- **Frontend Framework:** React Native via [Expo (SDK 51)](https://expo.dev/) for unified iOS and Android builds.
- **Chat UI Layer:** [`react-native-gifted-chat`](https://github.com/FaridSafi/react-native-gifted-chat) (`2.4.0`) for optimized message rendering, scrolling, and user avatars.
- **Navigation:** [React Navigation](https://reactnavigation.org/) (`@react-navigation/native`) using a Stack architecture to manage transitions across authentication states.
- **Backend-as-a-Service (Firebase v10):**
  - **Firebase Authentication:** Handles email/password login and registration with local token persistence via `AsyncStorage`.
  - **Cloud Firestore:** NoSQL document database utilizing active `onSnapshot` listeners for instant delta updates.

---

## Project Structure

```text
SimpleChatApp/
├── App.js               # Application bootstrap, auth state observer, and root navigator
├── firebase.js          # Firebase app initialization, Auth, and Firestore configuration
├── styles.js            # Global layout rules and design tokens
├── package.json         # Dependency manifest and version locks
└── screens/
    ├── Login.js         # User authentication (Sign In / Sign Up) screen
    └── Chat.js          # Real-time messaging interface
```

---

## Dependencies

Key packages and pinned versions required for compatibility with Expo SDK 51:

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `expo` | `~51.0.0` | Core framework and runtime environment |
| `firebase` | `^10.12.0` | Authentication and Cloud Firestore real-time sync |
| `react-native-gifted-chat` | `2.4.0` | Conversational UI components |
| `@react-native-async-storage/async-storage` | `~1.23.1` | Local persistence for user auth sessions |
| `@react-navigation/native` | `^6.1.17` | Navigation state management |

> **Version Note:** `react-native-gifted-chat` is strictly pinned to `2.4.0` (without `^` or `~`). Upgrading to `2.8.x+` introduces peer dependency conflicts with underlying rendering libraries in Expo SDK 51.

---

## Getting Started

### 1. Clean & Install Dependencies

Run the following commands from the project root directory to ensure a clean dependency tree:

```bash
# Remove existing modules and lockfile
rm -rf node_modules package-lock.json

# Install dependencies using legacy peer resolution
npm install --legacy-peer-deps

# Validate and align Expo-compatible package versions
npx expo install --fix
```

### 2. Configure Firebase

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** and turn on the **Email/Password** sign-in provider.
3. Create a **Cloud Firestore** database (start in *Test Mode* for local development).
4. Register a Web App in your Firebase project settings and copy your configuration keys into `firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Run the Application

Start the local Metro bundler:

```bash
npx expo start
```

Open the **Expo Go** app on your physical iOS or Android device and scan the QR code displayed in the terminal.

---

## Production Security

Before deploying to production, replace Firestore's open Test Mode rules with authenticated access controls in your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chats/{messageId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Roadmap

- [ ] **Multi-Room Channels:** Migrate from a single flat `chats` collection to nested sub-collections (`channels/{channelId}/messages`) to support separate chat rooms.
- [ ] **Push Notifications:** Integrate `expo-notifications` with Firebase Cloud Messaging (FCM) for background message alerts.
- [ ] **Media Sharing:** Add Firebase Storage and `expo-image-picker` support to send images and attachments in chat.
