import { GetStaticProps } from 'next';
import Head from 'next/head';
import { stripe } from '../services/stripe';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss'; 
import Image from 'next/image';


//chamadas api
// client-side
// server-side
// static site generation

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Romario.dev</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
          Para ter acesso ao conteúdo, é necessário estar autenticado.<br />
  
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image src="/images/background.png" width="499" height="600" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LZte2FBiWdxhePBFqGPOqXD')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}
