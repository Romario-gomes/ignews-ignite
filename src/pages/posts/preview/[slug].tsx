import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { getSession, useSession, signIn } from "next-auth/react";
import { RichText } from "prismic-dom";

import Head from "next/head"
import { getPrismicClient } from "../../../services/prismic";
import styles from "../post.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
interface PostPreviewProps{
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if(session?.user) {
        router.push(`/posts`)
    }
  }, [session])


  async function handleSubscribe() {
    signIn('github')
    return;
  }

  return (
   <>
    <Head>
      <title>{post.title} | Romario.dev</title>
    </Head>

    <main className={styles.container}>
      <article className={styles.post}>
        <h1>{post.title}</h1>
        <time>{post.updatedAt}</time>
        <div 
          className={`${styles.postContent} ${styles.previewContent}`}
        dangerouslySetInnerHTML={{ __html: post.content}} />
        <div className={styles.continueReading}>
          Gostaria de continuar lendo?
          <Link href="/">
            <a onClick={handleSubscribe}>Entre com github 😃</a>
          </Link> 
          
        </div>
      </article>
    </main>
   </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
 
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  }
  return {
    props: {
      post,
    },
    redirect: 60 * 30, // 30 minutes
  }
}