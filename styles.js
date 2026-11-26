import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#0284c7',
  secondary: '#f1f5f9',
  danger: '#ef4444',
  white: '#fff',
  textDark: '#000',
};

export default StyleSheet.create({
  //App.js Styles
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Login Screen Styles
  loginContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 100,
    paddingHorizontal: 24,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    alignSelf: 'center',
    marginBottom: 40,
  },
  loginInput: {
    backgroundColor: colors.secondary,
    height: 52,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
  },
  loginButton: {
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 18,
  },
  loginButtonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: 15,
  },
  loginButtonSecondaryText: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 18,
  },

  // Chat Screen Styles
  chatLogoutButton: {
    marginRight: 15,
  },
  chatLogoutText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
    width: '100%',
  },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  bubbleLeft: {
    backgroundColor: '#f1f5f9',
    borderBottomLeftRadius: 4,
  },
  bubbleRight: {
    backgroundColor: '#0284c7',
    borderBottomRightRadius: 4,
  },
  senderText: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: 'bold'
  },
  textLeft: { color: '#000', fontSize: 16 },
  textRight: { color: '#fff', fontSize: 16 },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#f8fafc',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1'
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#0284c7',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});