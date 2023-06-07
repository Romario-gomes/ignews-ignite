import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss'; 
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Romario.dev</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Olá, bem vindo!</span>
          <h1>Artigos sobre o mundo <span>Javascript</span></h1>
          <p>
            Para ter acesso ao conteúdo, é necessário estar autenticado.<br />
          </p>
          <SubscribeButton />
        </section>
        <Image src="/images/background.png" width="499" height="600" alt="Girl coding" />
      </main>
    </>
  )
}

