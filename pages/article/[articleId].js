import Link from "next/link";

const ArticlePage = ({ article }) => {
  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href="/">Go back</Link>
    </>
  );
};

export default ArticlePage;

// export const getServerSideProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.articleId}`
//   );

//   const article = await res.json();

//   return {
//     props: {
//       article,
//     },
//   };
// };

export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.articleId}`
  );
  const article = await res.json();
  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const articles = await res.json();
  const ids = articles.map((article) => article.id.toString());
  return {
    paths: ids.map((id) => ({ params: { articleId: id } })),
    fallback: false,
  };
};