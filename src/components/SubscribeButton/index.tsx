import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss"

export function SubscribeButton() {
  const { status } = useSession();
  async function handleSubscribe() {
    if(status !== 'authenticated'){
      signIn('github')
      return;
    }
  }
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Entrar com Github
    </button>
  )
}