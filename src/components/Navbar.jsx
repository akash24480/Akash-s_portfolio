import dayjs from 'dayjs';

import { navLinks, navIcons } from '#constants';
import { useTheme } from '#context/ThemeContext.jsx';
import { useWindowStore } from '#store/window';


const Navbar = () => {
    const { toggleTheme } = useTheme();

    const {openWindow} = useWindowStore();

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className='font-bold'>Akash's Portfolio</p>

                <ul>
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} onClick = {() => openWindow(type)}>
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
                                className='icon-hover'
                                onClick={id === 4 ? toggleTheme : undefined}
                                style={id === 4 ? { cursor: 'pointer' } : {}}
                            />
                        </li>
                    ))}
                </ul>
                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    )
}

export default Navbar