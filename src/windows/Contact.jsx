import { socials } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import React from 'react'
import { WindowControlls } from '#components'

const Contact = () => {
  return (
    <>
    <div id='window-header' className='hidden md:flex'>
      <WindowControlls target="contact" />
      <h2>Contact Me</h2>
       </div>

       <div id='mobile-window-header' className='flex justify-between items-center px-3 pb-3 md:hidden relative z-50 py-18'>
               <div className='flex-1 flex items-center gap-2'>
                   <WindowControlls target="contact" />
               </div>
               <p className="flex-[1.5] text-lg font-georama text-black line-clamp-1">Contact Me</p>
              
           </div> 

      <div className='p-5 space-y-5 flex flex-col justify-center items-center md:block '>
         <img src="/images/akash.jpeg" alt="Akash" className='w-20 h-20 object-cover rounded-full' />

         <h3>Let's Connect</h3>
         <p>Whether it’s design, development, or debugging —I’m just one click away. Let’s connect.</p>
         <p className='hidden md:block'>akash19g245@gmail.com</p>

         <ul className='flex flex-col md:flex-row w-full'>
          {socials.map(({id, bg, link, icon, text}) => (
            <li className='w-[100%]' key={id} style={{backgroundColor:bg}}>
              <a href={link} target="_blank" rel="noopener noreferrer" title='text'>
                <img src={icon} alt={text} className='size-5' />
                <p>{text}</p>
              </a>
            </li>
          ))}
         </ul>
      </div>
   
    </>
  )
}


const ContactWindow = WindowWrapper(Contact, 'contact')

export default ContactWindow