import React from 'react'
import { useWindowStore } from '#store/window.js';
import { ChevronLeft } from 'lucide-react';

const WindowControlls = ({target, onMobileBack}) => {
    const {closeWindow} = useWindowStore();
    
    const handleMobileBack = () => {
        if (onMobileBack) {
            onMobileBack();
        } else {
            closeWindow(target);
        }
    };
    
  return (
    <>
    <div id='window-controls' className='hidden md:flex'>
        <div className='close' onClick={() => closeWindow(target)}></div>
        <div className='minimize'></div>
        <div className='maximize'></div>
    </div>

    <div className='mobile-controls md:hidden bg-whtie cursor-pointer p-2 relative z-50' onClick={handleMobileBack}>
      <div className='flex items-center gap-2'>
        <ChevronLeft size={15} className='text-black' />
        <p className='text-blue-500 mb-0 '>Go Back</p>
      </div>
    </div>
    </>
  )
}

export default WindowControlls