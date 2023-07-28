"use client"

import { useEffect, useState, useRef } from 'react'

import Image from 'next/image'
import styles from '../styles/chat.module.scss'

import useIsMobile from '../hooks/useIsMobile'
import useKeyPress from '../hooks/useKeyPress';


import { useAppSelector, useAppDispatch } from '../hooks/useRedux'
import {
  refreshUser, selectUser
} from '../store/userStore/userSlice'
import { chat, selectChat, updateChatInput} from '../store/chatStore/chatSlice'


export default function Home() {


  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const chatState = useAppSelector(selectChat);
  
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  const isMobile = useIsMobile();
  

  const enterPressed = useKeyPress("Enter");

  const chatHistoryRef = useRef(null);

  useEffect(() => {
    console.log(alreadyRequested);
    if(!alreadyRequested){
      setAlreadyRequested(true);
      dispatch(chat(""))
    }
  }, [alreadyRequested]);


  useEffect(() => {
    if(enterPressed){
      clickSendChat();
    }
  }, [enterPressed]);

  const clickSendChat = () => {
    dispatch(chat(chatState.input));
  }

  const changeTyping = (e: any) => {
    // setChatInput(e.target.value);
    dispatch(updateChatInput(e.target.value));
  }

  const formatMessage = (message:string) => {
    const wordList = message.split(" ")
    const linkIndexes = [];
    const finalWords = []

    for (let i = 0; i < wordList.length; i++) {
      const word = wordList[i];
      let w: any = word;
      if(word.indexOf("https://cociner.io") >= 0){
        linkIndexes.push(i);
        w = <a key={word} href={word} target='_blank'>{word}</a>
      }
      finalWords.push(w);
    }
    const finalList = [];

    let currentLargeString = "";
    for (let i = 0; i < finalWords.length; i++) {
      const element = finalWords[i];
      if(typeof(element) === 'string'){
        currentLargeString += element + " ";
      } else {
        finalList.push(currentLargeString);
        finalList.push(element);
        currentLargeString = ""
      }
    }
    finalList.push(currentLargeString);

    return <div key={message[0]}>{finalList}</div>
  }


  return (
    <main className="flex min-h-screen flex-col justify-between w-full">
      <div className="flex flex-col w-full justify-center">

        <h1 className="text-3xl font-bold text-center p-8">
          tamagotch<span style={{color:'rgb(0, 255, 0)'}}>.</span>io
        </h1>
        <div id="chatContainer" className={styles.chatContainer}>
          <div id="chatWrapper" className={styles.chatWrapper}>

            <div className={styles.chatHistoryWrapper} ref={chatHistoryRef}>
              {chatState.history.map((c:any, idx:any)=>{
                if(c){
                return <div id={"message-"+idx} className={`${styles.baseChatStyle} ${c.human ? styles.humanChat : styles.robotChat}`} key={idx}>
                  <div className={`${styles.baseChatStyleCell} ${c.human ? styles.humanChatStyle : styles.robotChatStyle}`}>
                    {c.messages.map((m:any, mIdx:any) => {
                      return <div className={styles.chatMessageText} key={mIdx}>{formatMessage(m)}</div>
                    })}
                  </div>
                </div>
                } else {
                  return <div key={idx}>no chat</div>
                }
              })}
            </div>
            
            <div id="chatLog" className={styles.chatLog}>
            </div>
          </div>
          <div id="chatInput" className={styles.chatReplyWrapper}>
            <div className={styles.chatInputWrapper}>
              <textarea 
                  name="chatInput" 
                  cols={40} rows={5} 
                  autoFocus 
                  disabled={chatState.status == 'loading'} 
                  className={styles.chatInput} 
                  onInput={changeTyping} 
                  placeholder="Type a message..."
                  value={chatState.input} />
            </div>
            <div>
              <button id="chatSubmit" className={styles.chatSend}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
