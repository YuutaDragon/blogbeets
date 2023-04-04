import Image from 'next/image'

import BeetsBlogLogo from '../../Public/Beets_Blog_logo.svg' 

export default function Header() {
  return (
    <header className='bg-[#55003A] shadow-lg h-20 rounded-md flex items-center px-10'>
      <Image src={BeetsBlogLogo} width={65} alt="Dois texto, um título com Beets e um subtitulo com Blog" priority={true}/>
    </header>
  )
}