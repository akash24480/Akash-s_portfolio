import dayjs from "dayjs";

import { navLinks, navIcons } from "#constants";
import { useTheme } from "#context/ThemeContext.jsx";
import { useWindowStore } from "#store/window";

const Navbar = () => {
  const { toggleTheme } = useTheme();

  const { openWindow } = useWindowStore();

  return (
    <>
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Akash's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img
                src={img}
                alt={`icon-${id}`}
                className="icon-hover"
                onClick={id === 4 ? toggleTheme : undefined}
                style={id === 4 ? { cursor: "pointer" } : {}}
              />
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>

      
    </nav>
    <section
        id="mobile-navbar"
        className="flex justify-between items-center py-3 px-5 gap-5 sm:hidden relative z-10000"
      >
        <time>{dayjs().format("h:mm A")}</time>
        <div className="bg-black flex-1 rounded-full px-2 py-5"></div>
        <ul className="flex items-center gap-2">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-wifi icon"
              aria-hidden="true"
            >
              <path d="M12 20h.01"></path>
              <path d="M2 8.82a15 15 0 0 1 20 0"></path>
              <path d="M5 12.859a10 10 0 0 1 14 0"></path>
              <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-battery icon"
              aria-hidden="true"
            >
              <path d="M 22 14 L 22 10"></path>
              <rect x="2" y="6" width="16" height="12" rx="2"></rect>
            </svg>
          </li>
        </ul>
      </section>
    </>

    
  );
};

export default Navbar;
