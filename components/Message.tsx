import styles from "../styles/Main.module.css";
import formatDate from "../utils/formatDate";
import { Message } from "../lib/schema";
import { OptionalId } from "mongodb";
import { useEffect, useState } from "react";

type MessageProps = {
  message: OptionalId<Message>;
};

export default function ChatMessage({ message }: MessageProps) {
  const [timestamp, setTimestamp] = useState<string>("");

  // using state to prevent hydration error due to timestamp seconds being different when rendered
  useEffect(() => {
    setTimestamp(formatDate(message.date));
  }, []);

  return (
    <div className={styles.messageContainer}>
      <div className={styles.message}>{message.message}</div>
      <div className={styles.timeContainer}>{timestamp}</div>
    </div>
  );
}
