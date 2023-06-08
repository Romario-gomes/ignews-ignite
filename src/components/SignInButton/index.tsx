import { FaGithub } from 'react-icons/fa';
import {  FiX } from 'react-icons/fi';
import styles from './styles.module.scss';
import { signIn, signOut, useSession } from "next-auth/react"

export function SignInButton () {
  const { status, data } = useSession();
  
  return status === 'authenticated' ? (
    <button 
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}

    >
      <FaGithub color="#7562E0" />
      <p className={styles.signInButtonText}>{data.user.name}</p>
        
        <FiX color="#737380" className={styles.closeIcon}  />
    </button>
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" />
      <p className={styles.signInButtonText}>Entrar com Github</p>
    </button>
  );
}