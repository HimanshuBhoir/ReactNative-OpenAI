import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {useState} from 'react'

// Testing the post data..
let arr = [
    {type: "user", post: "Hello AI?"},
    {type: "bot", post: "Hello, how can I help you?"},
]

export default function App() {

  const [post, setPost] = useState(arr)

  return (
    <View style={styles.container}>
      <View>
        {post.map(item => (
          <View style={styles.posts}>
            {item.post}
          </View>
        ))}
        
      </View>
      
      <View style={styles.inputView}>
        <TextInput style={styles.input}
        placeholder='Ask me, anything?' />
        <Button style={styles.send} 
          
        />
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c25',
    alignItems: 'left',
    color: 'White',
    padding: '20px',
  },
  inputView: {
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2px 10px',
    paddingLeft: '17px',
    gap: '10px',
    width: '90%',
    height: '50px',
    backgroundColor: '#2b2b36',
    borderRadius: '10000px',
    color:'white',
    position:'fixed',
    bottom:'10px',
  },
  input: {
    padding: '0 5px',
    fontWeight: '400',
    font: '16px',
    lineHeight: '45px',
    color: '#ffffff',
    outline: '0',
    border: '0',
    width:'85%',
    backgroundColor: 'transparent',
    border:'none',
  },
  posts: {
    color: 'white',
    padding: '10px 20px',
    width: 'fit-content',
    maxWidth: '100%',
    minHeight: '40px',
    background: '#2b2b36',
    borderRadius: '22px',
    whiteSpace: 'pre-wrap',
  },
});
