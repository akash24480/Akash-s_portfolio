import { techStack } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import { Check, Flag } from 'lucide-react'
import React from 'react'
import WindowControlls from '#components/WindowControlls'
const Terminal = () => {
  return (
    <>
    <div id='window-header' className='hidden md:flex'>
        <WindowControlls target='terminal' />
         <h2>Tech Stack</h2>
    </div>

    <div id='mobile-window-header' className='flex justify-between items-center px-3 pb-3 md:hidden relative z-50 py-18'>
        <div className='flex-1 flex items-center gap-2'>
            <WindowControlls target="terminal" />
        </div>
        <p className="flex-[1.5] text-lg font-georama text-black line-clamp-1">Tech Stack</p>
       
    </div> 

    <div className='techstack'>
        <p>
            <span className='font-bold'>@akash %</span>
            show tech stack
        </p>

        <div className='label hidden md:flex'>
            <p className='w-32'>Category</p>
            <p>Technologies</p>
        </div>

        <ul className='content'>
            {techStack.map(({category, items}) => (
                <li key={category} className='flex flex-col items-start mb-4 md:mb-0 md:flex-row md:items-center'>
                    <Check className='check hidden md:flex' size={20} />
                    <h3 className='mb-3 md:mb-0'>{category}</h3>

                    <ul className='flex flex-col md:flex-row items-start'>
                        {items.map((item, i) => (
                            <li key={i} className=''>{item}{i < items.length - 1 ? "," : ""}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>

        <div className='footnote'>
            <p>
                <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
            </p>

            <p className='render-time'>
                <Flag size={15} />
                Render time: 6ms 
            </p>
        </div>
    </div>
    </>
  )
}


const TerminalWindow = WindowWrapper(Terminal, 'terminal')

export default TerminalWindow