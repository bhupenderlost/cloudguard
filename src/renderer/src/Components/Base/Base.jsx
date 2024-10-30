import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/Media/logo.png'
import ProfilePicture from '../../Assets/Media/profile-picture.jpg'
import { 
    HomeIcon, 
    ClipboardIcon,
    WalletIcon,
    KeyIcon,
    CircleStackIcon,
    Cog6ToothIcon,
    MagnifyingGlassIcon,
    BellAlertIcon,
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/outline'

const Base = ({ children, title }) => {
    const [hide, setHide] = useState(false)
    const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark' ? true : false)
    const menuItems = [
        {
            _id: "1",
            link: "/dashboard",
            title: "Dashboard",
            active: location.hash == '#/dashboard' ? true : false,
            icon: <HomeIcon width={28} height={28} className={location.hash == '#/dashboard' ? 'text-[#FE5C73] my-1 mx-2' : 'text-[#B1B1B1] my-1 mx-2'} />
        },
        {
            _id: "2",
            link: "/projects",
            title: "Projects",
            active: location.hash == '#/projects' ? true : false,
            icon: <ClipboardIcon width={28} height={28} className={location.hash === '#/projects' ? 'text-[#FE5C73] my-1 mx-2' : 'text-[#B1B1B1] my-1 mx-2'} />
        },
        {
            _id: "3",
            link: "/wallet",
            title: "Wallet",
            active: location.hash == '#/wallet' ? true : false,
            icon: <WalletIcon width={28} height={28} className={location.hash === '#/wallet' ? 'text-[#FE5C73] my-1 mx-2' : 'text-[#B1B1B1] my-1 mx-2'} />
        },
        {
            _id: "4",
            link: "/keys",
            title: "Keys",
            active: location.hash == '#/keys' ? true : false,
            icon: <KeyIcon width={28} height={28} className={location.hash === '#/keys' ? 'text-[#FE5C73] my-1 mx-2' : 'text-[#B1B1B1] my-1 mx-2'} />
        },
        {
            _id: "5",
            link: "/plans",
            title: "Plans",
            active: location.hash == '#/plans' ? true : false,
            icon: <CircleStackIcon width={28} height={28} className={location.hash === '#/plans' ? 'text-[#FE5C73] my-1 mx-2' : 'text-[#B1B1B1] my-1 mx-2'} />
        },
        {
            _id: "6",
            link: "/settings",
            title: "Settings",
            active: location.hash == '#/settings' ? true : false,
            icon: <Cog6ToothIcon width={28} height={28} className={location.hash === '#/settings' ? 'text-[#FE5C73] my-1 mx-2' : 'text-[#B1B1B1] my-1 mx-2'} />
        }
    ]

    const changeTheme = () => {
        setDark(!dark)
        document.body.classList.toggle("dark")
        alert(localStorage.getItem('theme'))
        localStorage.getItem('theme') == 'light' ? localStorage.setItem('theme', 'dark') : null
        localStorage.getItem('theme') == 'dark' ? localStorage.setItem('theme', 'light')  : null
        
    }
    return(
        <div className="w-screen h-screen bg-grey flex flex-row dark:bg-darkbg2 dark:text-white">
            <div className="h-screen w-1/6  bg-[#fff] shadow-sm dark:bg-darkbg">
                <div className="flex flex-col justify-center items-center h-[80px]">
                    <img src={Logo} alt="Cloudguard Logo" className="p-2 dark:invert"  />
                </div>
                <div>
                    <ul className="flex flex-col mt-6">
                       { 
                        menuItems.map((item) => {
                            return(
                                <li className={`flex flex-row w-full text-xl h-[50px] rounded pl-4  ${item.active ? 'border-l-4 border-solid border-red text-red' : 'text-textgrey'}`} key={item._id}>
                                    { item.icon }
                                    <Link className="py-1 px-4 tracking-wide" to={`${item.link}`}>{item.title}</Link>
                                </li>
                            )
                        })
                       }
                    </ul>
                </div>
            </div>
            <div className="w-5/6">
                <div className="bg-[#fff] w-full h-[80px] shadow-sm flex flex-row items-center px-5 dark:bg-darkbg">
                    <div className="w-1/2">
                        <h1 className="text-[24px] font-semibold text-[#343C6A] dark:text-textgrey">{ title }</h1>
                    </div>
                    <div className="w-1/2 flex flex-row justify-evenly items-center dark:darkbg2">
                        <form action="#" className="flex flex-row dark:darkbg2">
                            { !hide ? <MagnifyingGlassIcon height={24} width={24} className="text-red mt-3 absolute ml-4" /> : ''}
                            <input onChange={(e) => e.target.value.length > 0 ? setHide(true) : setHide(false)} className="font-light w-[250px] h-[50px] bg-[#F5F7FA] text-darkblue rounded-full text-center p-2 shadow-inner shadow-sm focus:outline-none dark:bg-darkbg2 dark:text-textgrey dark:border-gray-800 dark:border-2" type="text" placeholder="Search for something" />
                        </form>
                        <div className="rounded-full w-[50px] h-[50px] bg-grey flex justify-center items-center shadow-inner shadow-sm dark:bg-darkbg dark:border-gray-800 dark:border-2">
                            <Cog6ToothIcon width={24} height={28} className="text-darkblue dark:text-textgrey" />
                        </div>
                        <div className="rounded-full w-[50px] h-[50px] bg-grey flex justify-center items-center shadow-inner shadow-sm dark:bg-darkbg dark:border-gray-800 dark:border-2">
                            <BellAlertIcon width={24} height={28} className="text-blue dark:text-textgrey" />
                        </div>
                        <div onClick={changeTheme} className="rounded-full w-[50px] h-[50px] bg-grey flex justify-center items-center shadow-inner shadow-sm hover:cursor-pointer dark:bg-darkbg dark:border-gray-800 dark:border-2" >
                            { localStorage.getItem('theme') === 'light' ? <MoonIcon width={24} height={28} className="text-darkblue " /> : ''}
                            { localStorage.getItem('theme') === 'dark' ? <SunIcon width={24} height={28} className="text-textgrey " /> : ''}
                        </div>
                        <div className="rounded-full w-[55px] h-[55px] bg-grey flex justify-center items-center dark:bg-darkbg dark:border-gray-800 dark:border-2">
                            <img src={ProfilePicture} alt="Profile Picture" className=" rounded-full dark:bg-darkbg"  />
                        </div>
                    </div>
                </div>
                <div className="py-8 px-8">
                    { children }
                </div>
            </div>
        </div>
    )

}

export default Base