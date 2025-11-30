import {Navbar, Welcome, Dock} from '#components'
import { Terminal, Resume, Finder, Text, Image } from '#windows';

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
    </main>
  )
}
 
export default App