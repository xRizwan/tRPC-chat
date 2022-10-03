import { trpc } from "../utils/trpc";
import styles from "../styles/Main.module.css";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "../components/Message";
import ActionBar from "../components/ActionBar";
import ParticleComponent from "../components/Particles";

export default function IndexPage() {
  const roomRef = useRef<HTMLDivElement | null>(null);
  const chatroom = trpc["msg.list"].useQuery();

  // making sure particles load first so there's no screen flikering issue.
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);

  // scrolls to the bottom of the chatroom there are a lot of messages
  const scrollDown = () => {
    if (roomRef && roomRef.current) {
      roomRef.current.scrollTo(0, roomRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    scrollDown();
  }, [roomRef.current, chatroom.data?.messages]);

  return (
    <>
      <ParticleComponent setIsLoaded={setIsLoaded} />
      {isLoaded && chatroom.data && (
        <div className={styles.container}>
          <div className={styles.roomContainer} ref={roomRef}>
            {chatroom.data.messages.map((message, index) => (
              <ChatMessage key={`${message}-${index}`} message={message} />
            ))}
          </div>
          <ActionBar />
        </div>
      )}
    </>
  );
}
