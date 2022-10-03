import { trpc } from "../utils/trpc";
import styles from "../styles/Main.module.css";
import { useState } from "react";

export default function ActionBar() {
  const utils = trpc.useContext();
  const mutation = trpc["msg.add"].useMutation({
    onSuccess: async () => {
      await utils["msg.list"].invalidate();
    },
  });
  const [message, setMessage] = useState<string>("");

  const handlePress = async () => {
    await mutation.mutateAsync({ message });
    setMessage("");
  };

  return (
    <div className={styles.formContainer}>
      <input
        type="text"
        value={message}
        placeholder="Enter a message!"
        className={styles.messageInput}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.button} onClick={handlePress}>
        Send
      </button>
    </div>
  );
}
