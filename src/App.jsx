import {Navbar, Welcome, Dock, Home} from '#components'
import { Terminal, Resume, Finder, Text, Image, Contact, Photos } from '#windows';

import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable'
gsap.registerPlugin(Draggable);



const App = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
      
      <Home />
    </main>
  )
}
 
export default App