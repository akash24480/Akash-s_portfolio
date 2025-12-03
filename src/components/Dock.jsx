import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";

import { dockApps } from "#constants";
import { useGSAP } from "@gsap/react";
import { useWindowStore } from "#store/window.js";

const Dock = () => {

    const {openWindow, closeWindow, windows } = useWindowStore();

  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return () => {};

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);

        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        })
      );

    // Touch event handlers for mobile
    const handleTouchStart = (e) => {
      const target = e.target.closest('.dock-icon');
      if (target) {
        gsap.to(target, {
          scale: 1.25,
          y: -15,
          duration: 0.1,
          ease: "power1.out",
        });

        // Auto-reset after 400ms
        setTimeout(() => {
          gsap.to(target, {
            scale: 1,
            y: 0,
            duration: 0,
            ease: "power1.out",
          });
        }, 400);
      }
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    dock.addEventListener("touchstart", handleTouchStart);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
      dock.removeEventListener("touchstart", handleTouchStart);
    };

  }, []);



  const toggleApp = (app) => {
    if(!app.canOpen) return;

    const window = windows[app.id]

    if(window.isOpen) {
        closeWindow(app.id);
    } else {
        openWindow(app.id);
    }

    console.log(windows);
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }, index) => (
          <div 
            key={id} 
            className={`relative flex jusify-center ${index === dockApps.length - 1 ? 'hidden sm:flex' : ''}`}
          >
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tootip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-50"}
              />
            </button>
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
