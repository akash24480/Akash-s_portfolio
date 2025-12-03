import { WindowControlls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { useWindowStore } from '#store/window'
import React from 'react'

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  // If no data, return null
  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id='window-header' className='hidden md:flex'>
        <WindowControlls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div id='mobile-window-header' className='flex justify-between items-center px-3 pb-3 md:hidden relative z-50 mt-16'>
        <div className='flex-1 flex items-center gap-2'>
          <WindowControlls target="imgfile" />
        </div>
        <p className="flex-[1.5] text-lg font-georama text-black line-clamp-1">{name}</p>
      </div>

      <div className='p-6 h-full overflow-y-auto flex items-center justify-center'>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={name} 
            className='max-w-full max-h-full object-contain rounded-lg shadow-md'
          />
        )}
      </div>
    </>
  )
}

const ImageWindow = WindowWrapper(Image, 'imgfile')

export default ImageWindow
