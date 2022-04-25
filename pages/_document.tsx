import Document, {
  DocumentContext,
  DocumentInitialProps,
  Main,
  NextScript,
  Head,
  Html,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
          <meta
            name="description"
            content="Compassionate · Confidential · Objective"
          ></meta>
          <meta name="keywords" content="Therapy, Life Coaching"></meta>
          <meta name="robots" content="all" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:200,300,400,500,600"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600"
            rel="stylesheet"
          />
          <link
            rel="canonical"
            key="canonical"
            href="https://www.needtalk.com/to/DrDeb"
          />
          <link
            rel="canonical"
            key="canonical"
            href="https://www.needtalk.com/schedule/DrDeb"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
