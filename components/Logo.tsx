import Image from 'next/image'
import React from 'react'

type Props = {
    src:string
    alt?:string
}

function Logo({src, alt}: Props) {
  return (
    <div className='h-8 w-8 rounded-full bg-blue-400 '>
        <Image src={src} alt={alt||'party logo'}/>
    </div>
  )
}

export default Logo