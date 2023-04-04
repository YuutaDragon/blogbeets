import { GetServerSideProps } from "next";
import { client } from "@/lib/apolo";
import { gql } from "@apollo/client";
import { format } from "date-fns"

import ptBR from "date-fns/locale/pt-BR"

import CardPost from "@/components/CardPost";
import Header from "@/components/Header";

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      slug
      title
      createdAt
      coverImage {
        url
      }
      author {
        name
        avatar {
          url
        }
      }
    }
  }
`;

interface AllPosts {
  posts: {
    id: string;
    slug: string;
    subtitle: string;
    title: string;
    createdAt: string;
    coverImage: {
      url: string;
    };
    author: {
      name: string;
      avatar: {
        url: string;
      }
    };
  }[];
}

export default function Home({ posts }: AllPosts) {
  return (
    <>
      <div className="bg-gradient-to-r from-[#4D0034] to-[#111] flex flex-col justify-between">
        <div className="w-full max-w-[1120px] mx-auto mt-6">
          <Header />
        </div>
        <div className="min-h-[720px] flex flex-col items-center justify-center">
          <div className="min-w-[700px] min-h-[230px] flex flex-col items-center justify-center">
            <h1 className="text-center text-5xl text-white font-bold mb-4">
              Blog Beets Jr
            </h1>
            <p className="text-center text-2xl text-white max-w-[920px]">
              Junta-se a nós devs e descubra um novo mundo de possíbilidades.
              Compartilhe seus objetivos e vamos juntos embarcar em uma jornada
              de evolução contínua atráves das melhores tecnologias
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-[#111]">
        <div className="w-full max-w-[1120px] mx-auto grid grid-cols-3 grid-rows-2 gap-12 pt-6">
          {posts ? (
            posts.map((post) => {
                return (
                  <CardPost
                    key={post.id}
                    title={post.title}
                    author={post.author.name}
                    createdAt={format(new Date(post.createdAt), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                    urlImage={post.coverImage.url}
                    urlAvatar={post.author.avatar.url}
                    slug={post.slug}
                  />
                );
            })
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
      <footer className="min-h-[200px] bg-black flex flex-col items-center justify-center gap-4">
        <div className="text-white">Icons</div>
        <p className="text-white">
          Blog da Beets Jr © 2023 • Publicado com Next Js
        </p>
      </footer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await client.query({ query: GET_ALL_POSTS });
  
  return {
    props: {
      posts: data.posts,
    },
  };
};
