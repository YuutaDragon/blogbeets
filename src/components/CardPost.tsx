import Image from "next/image"
import Link from "next/link"
// import { format } from "date-fns"
// import ptBR from "date-fns/locale/pt-BR"

interface CardPostProps {
  title: string;
  author: string;
  createdAt: string;
  urlImage: string;
  slug: string;
}

export default function CardPost({ author, createdAt, title, urlImage, slug }: CardPostProps) {
  return (
    <Link 
      href={`/post/${slug}`}
      className="bg-[#111] drop-shadow-2xl rounded-2xl w-full sm:max-w-[352px] h-full flex flex-col items-center justify-between gap-2 sm:gap-4 hover:brightness-75 transition-all"
    >
      <div className='flex w-full h-[200px] sm:h-[234px] relative rounded-2xl overflow-hidden'>
        <Image 
          src={urlImage}
          alt=""
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className='flex w-full min-h-[180px] flex-1 flex-col justify-between gap-1 p-2 sm:gap-2'>
        <p className='text-white text-xs md:text-sm'>{createdAt}</p>
        <h1 className='font-bold text-lg sm:text-xl text-white'>{title}</h1>
        <div>
          <p className='font-bold text-white text-sm md:text-base'>{author}</p>
        </div>
      </div>
    </Link>
  )
}