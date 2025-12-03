import { WindowControlls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { useWindowStore } from '#store/window'
import React from 'react'

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  // If no data, return null
  if (!data) return null;

  const {name, image, subtitle, description} = data;

  return (
    <>
      <div id='window-header' className='hidden md:flex'>
        <WindowControlls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div id='mobile-window-header' className='flex justify-between items-center px-3 pb-3 md:hidden relative z-50 mt-16'>
        <div className='flex-1 flex items-center gap-2'>
          <WindowControlls target="txtfile" />
        </div>
        <p className="flex-[1.5] text-lg font-georama text-black line-clamp-1">{name}</p>
      </div>

      <div className='p-6 h-full overflow-y-auto'>
        {/* Optional image */}
        {image && (
          <div className='mb-6'>
            <img 
              src={image} 
              alt={name} 
              className='w-full max-w-md rounded-lg shadow-md'
            />
          </div>
        )}

        {/* Optional subtitle */}
        {subtitle && (
          <h3 className='subtitle'>
            {subtitle}
          </h3>
        )}

        {/* Description paragraphs */}
        {description && description.length > 0 && (
          <div className='space-y-4'>
            {description.map((paragraph, index) => (
              <p key={index} className='leading-relaxed'>
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

const TextWindow = WindowWrapper(Text, 'txtfile')

export default TextWindow
