import { socials } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import React from 'react'
import { WindowControlls } from '#components'

const Contact = () => {
  return (
    <>
    <div id='window-header'>
      <WindowControlls target="contact" />
      <h2>Contact Me</h2>
       </div>

      <div className='p-5 space-y-5'>
         <img src="/images/akash.jpeg" alt="Akash" className='w-20 h-20 object-cover rounded-full' />

         <h3>Let's Connect</h3>
         <p>Whether it’s design, development, or debugging —I’m just one click away. Let’s connect.</p>
         <p>akash19g245@gmail.com</p>

         <ul>
          {socials.map(({id, bg, link, icon, text}) => (
            <li key={id} style={{backgroundColor:bg}}>
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