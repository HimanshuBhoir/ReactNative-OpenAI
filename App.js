import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {useState} from 'react'
import axios from 'axios'

// Testing the post data..
let arr = [
    {type: "user", post: "Hello AI?"},
    {type: "bot", post: "Hello, how can I help you?"},
]

export default function App() {

  const [input, setInput] = useState("")
  const [post, setPost] = useState([])

  const onSubmit = () => {
    if(input.trim() == "")  return;
    updatePosts(input)
    updatePosts("loading...", false, true)
    setInput("")
    fetchBotResponse().then((res) => {
      console.log(res)
      updatePosts(res.bot.trim(), true)
    })
  }

  const fetchBotResponse = async () => {
    const { data } = await axios.post(
      "https://himai.onrender.com",
      { input },
      {
        headers:{
          "Content-Type":"application/json",
        },
      }
    );
    return data;
  }

  const autoTypingBotResponse = (text) => {
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            setPost((prevState) => {
                let lastItem = prevState.pop();
                if (lastItem.type !== "bot") {
                    prevState.push({
                        type: "bot",
                        post: text.charAt(index - 1),
                    });
                } else {
                    prevState.push({
                        type: "bot",
                        post: lastItem.post + text.charAt(index - 1),
                    });
                }
                return [...prevState];
            });
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20);
  };


  const updatePosts = (post, isBot, isLoading) => {
    if(isBot){
      autoTypingBotResponse(post)
    }else{
      setPost(prevState => {
        return [
          ...prevState,
          {type: isLoading ? "loading" : "user", post: post},
        ]
      })
    }
  }

  return (
    <View style={styles.container}>
      <View>
        {post.map((post,index) => (
          <View style={styles.posts}>
            {post.type == 'loading' ? 
            ("loading..")
            :
            (post.post)
            }
          </View>
        ))}
        
      </View>
      
      <View style={styles.inputView}>
        
        <TextInput style={styles.input}
        value={input}
        type='text'
        placeholder='Ask me, anything?' 
        onChange={(e) => {setInput(e.target.value)}}
        />

        <Button style={styles.send}
        onPress={onSubmit}
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
    width:'87%',
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
