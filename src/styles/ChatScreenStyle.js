import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
  },

  // Message styles
  messageContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    maxWidth: '80%',
  },
  currentUserAlign: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherUserAlign: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currentUserBubble: {
    backgroundColor: '#DCF8C6',
  },
  otherUserBubble: {
    backgroundColor: '#e5e5ea',
  },
  messageText: {
    fontSize: 16,
  },
  senderName: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  iconSetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,

    backgroundColor: '#f2f2f2',
  },
  icon: {
    fontSize: 24,
    marginHorizontal: 6,
  },
});

export default styles;
