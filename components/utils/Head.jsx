import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={`${process.env.appName} es una sofisticada aplicación de administración`} />
    <link rel="icon" href="images/favicon.ico" />
  </NextHead>
)

Head.propTypes = {
  title: string
}

export default Head
