import Image from 'next/image'

interface AvatarProps {
  name: string
  url: string
  color: string
}

export default function Avatar({ name, url, color}: AvatarProps) {
  return (
    <div className='flex h-32 items-center gap-4'>
      <Image src={url} width={50} height={50} alt="Avatar" className="w-10 rounded-full shadow-lg"/>
      <h2 className={`font-bold text-lg ${color}`}>{name}</h2>
    </div>
  )
}