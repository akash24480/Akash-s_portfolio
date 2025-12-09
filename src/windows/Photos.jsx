import { WindowControlls } from '#components'
import { photosLinks } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import { useWindowStore } from '#store/window'
import React, { useState } from 'react'
import clsx from 'clsx'

const Photos = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(photosLinks[0]?.id);
  const { openWindow } = useWindowStore();

  const activeCategory = photosLinks.find(cat => cat.id === activeCategoryId) || photosLinks[0];

  const handlePhotoClick = (photo) => {
    // Open the Image window with the photo data
    openWindow('imgfile', {
      name: `Photo ${photo.id}`,
      imageUrl: photo.img
    });
  };

  return (
    <>
      <div id='window-header' className='hidden md:flex'>
        <WindowControlls target="photos" />
        <h2>Photos</h2>
      </div>

      <div id='mobile-window-header' className='flex justify-between items-center px-3 pb-3 md:hidden relative z-50 py-18'>
              <div className='flex-1 flex items-center gap-2'>
                  <WindowControlls target="photos"/>
              </div>
              <p className="flex-[1.5] text-lg font-georama text-black line-clamp-1">Photos</p>
             
          </div>   

      <div className='flex h-full'>
        {/* Sidebar */}
        <div className='sidebar'>
          <div>
            <h3>Albums</h3>
            <ul>
              {photosLinks.map((category) => (
                <li 
                  key={category.id} 
                  onClick={() => setActiveCategoryId(category.id)}
                  className={clsx(category.id === activeCategoryId ? 'active' : 'not-active')}
                >
                  <img src={category.icon} className='w-4' alt={category.title} />
                  <p className='text-sm font-medium truncate'>{category.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery Content */}
        <div className='flex-1 p-6 overflow-y-auto'>
          <h2 className='gallery-title'>{activeCategory?.title}</h2>
          
          {activeCategory?.photos && activeCategory.photos.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {activeCategory.photos.map((photo) => (
                <div 
                  key={photo.id}
                  onClick={() => handlePhotoClick(photo)}
                  className='cursor-pointer group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow'
                >
                  <img 
                    src={photo.img} 
                    alt={`Photo ${photo.id}`}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className='empty-state'>No photos in this album</p>
          )}
        </div>
      </div>
    </>
  )
}

const PhotosWindow = WindowWrapper(Photos, 'photos')

export default PhotosWindow