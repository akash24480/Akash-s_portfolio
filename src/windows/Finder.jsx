import { WindowControlls } from '#components'
import { locations } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import {useLocationStore} from '#store/location.js'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import clsx from 'clsx'
import { useWindowStore } from '#store/window'

const Finder = () => {

    const {activeLocation, setActiveLocation} = useLocationStore();
    const {openWindow, closeWindow} = useWindowStore();
    
    // State for mobile view - using a navigation stack to support nested folders
    const [navigationStack, setNavigationStack] = useState([]);

    const handleMobileBack = () => {
        // If we have items in the navigation stack, go back one level
        if (navigationStack.length > 0) {
            setNavigationStack(prev => prev.slice(0, -1));
        } else {
            // Otherwise close the window
            closeWindow('finder');
        }
    };

    const openItem = (item) => {
        if(item.fileType === 'pdf') return openWindow("resume", item)
        if(item.kind === 'folder') return setActiveLocation(item);
        if(['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, "_blank")

            openWindow(`${item.fileType}${item.kind}`, item)
    }

    const handleMobileItemClick = (item) => {
        // If item has a custom onClick (for navigating to children), use that
        if (item.onClick) {
            item.onClick();
        } else if (item.kind === 'folder' && item.children && item.children.length > 0) {
            // If it's a folder with children, navigate into it
            setNavigationStack(prev => [...prev, item]);
        } else if (item.kind === 'file') {
            // If it's a file, open it
            openItem(item);
        } else {
            // Otherwise use the default setActiveLocation
            setActiveLocation(item);
        }
    }

    // Get the current location based on navigation stack
    const currentMobileLocation = navigationStack.length > 0 
        ? navigationStack[navigationStack.length - 1] 
        : null;

    const renderList = (name, items, onItemClick = handleMobileItemClick) => (

        <div>
            <h3>{name}</h3>
        <ul className='px-11 py-4 grid grid-cols-3 gap-6 md:px-0 md:py-0 md:block'>

            {
                items.map((item) => (
                        <li key={item.id} onClick = {() => onItemClick(item)} className={clsx(item.id === activeLocation.id ? 'active flex flex-col md:flex-row items-center' : 'not-active flex flex-col md:flex-row items-center')}>
                            <img src={item.icon} className='w-4 hidden md:block' alt={item.name} />
                            <img src={item.mobileIcon} className='w-16 md:hidden' alt={item.name} />
                            <p className='text-xs md:text-sm font-medium text-center md:text-left  line-clamp-2 md:line-clamp-1'>{item.name} </p>
                        </li>
                    ))
                
            }
        </ul>
        </div>
    )

  return (
    <>
    <div id="window-header" className='hidden md:flex'>
        <WindowControlls target="finder" />
        <Search className='icon' />
    </div> 

        <div id='mobile-window-header' className='flex justify-between items-center px-3 pb-3 md:hidden relative z-50 py-18'>
        <div className='flex-1 flex items-center gap-2'>
            <WindowControlls target="finder" onMobileBack={handleMobileBack} />
        </div>
        <p className="flex-[1.5] text-lg font-georama text-black line-clamp-1">{currentMobileLocation ? currentMobileLocation.name : 'Portfolio'}</p>
       
    </div>     

    <div className='flex h-full hidden md:flex'>
        <div className='sidebar'>

                    {renderList("Favourites",Object.values(locations), setActiveLocation)}
                    {renderList("Work",locations.work.children, setActiveLocation)}
        </div>

         <ul className='content'>
        {activeLocation?.children.map((item) => (
            <li key={item.id} className={item.position} onClick = {() => openItem(item) }>
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
            </li>
        ))}
    </ul>
    </div>

    <div className='md:hidden'>
        {navigationStack.length === 0 ? (
            // Show root level folders (Work, About, Resume, Trash)
            <div>
                {renderList("", Object.values(locations).map(loc => ({
                    ...loc,
                    onClick: () => {
                        setNavigationStack([loc]);
                    }
                })))}
            </div>
        ) : (
            // Show children of current location
            <div>
                {renderList("", currentMobileLocation?.children || [])}
            </div>
        )}
    </div>

    

   
    </>
  )
}

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;