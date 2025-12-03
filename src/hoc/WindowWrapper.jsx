import React, { useLayoutEffect, useRef } from 'react'
import { useWindowStore } from '#store/window.js';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

const WindowWrapper = (Component, windowKey) => {

    const Wrapped = (props) => {
        const {focusWindow, windows} = useWindowStore();
        const {isOpen, zIndex} = windows[windowKey];

        const ref = useRef(null);

        useGSAP(() => {
           const el = ref.current;
           if(!el || !isOpen) return;

           gsap.fromTo(el, {
            scale:0.8,
            opacity:0,
            y:40,
           },
           {
            scale:1,
            opacity:1,
            y:0,
            duration:0.4,
            ease:"power3.out"

           }
        )
            
        }, [isOpen])


        useGSAP(() => {
            const el = ref.current;
            if(!el) return;

          const [instance] =   Draggable.create(el, {
                onPress: () => focusWindow(windowKey)
            })

            return () => instance.kill();



        }, [])


        return (
            <>
            <section 
                id={windowKey} 
                ref={ref} 
                style={{zIndex}} 
                className={`absolute hidden md:block ${!isOpen ? '!hidden' : ''}`}
            >
            <Component {...props} />
        </section>


        <section id={`mobile-${windowKey}`} className={`md:hidden ${!isOpen ? '!hidden' : ''}`}>
            <Component {...props} />
        </section>
        </>
        )
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;

    return Wrapped;
}

export default WindowWrapper