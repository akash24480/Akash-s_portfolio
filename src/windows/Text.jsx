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
      <div id='window-header'>
        <WindowControlls target="txtfile" />
        <h2>{name}</h2>
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
