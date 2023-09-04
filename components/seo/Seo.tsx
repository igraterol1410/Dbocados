import Head from 'next/head'
import React from 'react'

interface SeoProps {
    children: React.ReactNode
    title: string;
    description: string;
}

const Seo = ({children, title, description}:SeoProps) => {
  return (
    <>
      <Head>
        <title>{`D'Bocados ${title && `- ${title}`}`}</title>
        <meta name="description" content={description || "D'Bocados Cake Shop web site"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {children}
      </main>
    </>
  )
}

export default Seo
