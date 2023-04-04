import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "@apollo/client";
import { client } from "@/lib/apolo";
import { format } from "date-fns";

import ptBR from "date-fns/locale/pt-BR";

import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { ElementNode } from "@graphcms/rich-text-types";
import Avatar from "@/components/Avatar";

const GET_POST = gql`
  query GetPost($slugPost: String) {
    post(where: { slug: $slugPost }) {
      id
      title
      content {
        json
      }
      author {
        name
        avatar {
          url
        }
      }
      createdAt
      coverImage {
        url
      }
    }
  }
`;

interface PostProps {
  post: {
    id: string;
    title: string;
    coverImage: {
      url: string;
    };
    author: {
      name: string;
      avatar: {
        url: string;
      }
    };
    createdAt: string;
    content: {
      json: ElementNode[];
    };
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <div className="w-full max-w-[1120px] flex flex-col mx-auto mt-6">
        <Header />

        <div className="w-full h-full flex flex-col mt-8">
          <div className="flex w-full h-56 sm:h-80 lg:h-[392px] relative rounded-2xl overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt=""
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="flex w-full flex-col mt-4 sm:mt-8">
          <h1 className="font-bold text-2xl sm:text-4xl lg:text-[40px] text-[#55003A]">
            {post.title}
          </h1>
          <div>
            <p className="text-zinc-600 text-sm mt-4">
              {format(new Date(post.createdAt), "dd 'de' MMM 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="mt-4 mb-12 sm:mt-8">
            <RichText
              content={post.content.json}
              renderers={{
                p: ({ children }) => (
                  <p className="text-zinc-600 text-sm sm:text-base text-justify lg:text-left mt-4">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        </div>
        <Avatar name={post.author.name} url={post.author.avatar.url} color="text-zinc-600"/>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;

  const { data } = await client.query({
    query: GET_POST,
    variables: {
      slugPost: slug,
    },
  });
  
  return {
    props: {
      post: data.post,
    },
    revalidate: 60 * 30, //30 min
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
