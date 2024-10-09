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
    BellAlertIcon
    
} from '@heroicons/react/24/outline'

const Base = ({ children, title }) => {
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
    return(
        <div className="w-screen h-screen bg-[#F5F7FA] flex flex-row">
            <div className="h-screen w-1/6  bg-[#fff] shadow-sm">
                <div className="flex flex-col justify-center items-center h-[80px] bg-[#fff]">
                    <img src={Logo} alt="Cloudguard Logo" className="p-2"  />
                </div>
                <div>
                    <ul className="flex flex-col mt-6">
                       { 
                        menuItems.map((item) => {
                            return(
                                <li className={`flex flex-row w-full text-xl border-l-4 h-[50px] rounded pl-4  ${item.active ? 'border-solid border-[#FE5C73] text-[#FE5C73]' : 'text-[#B1B1B1]'}`} key={item._id}>
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
                <div className="bg-[#fff] w-full h-[80px] shadow-sm flex flex-row items-center px-5">
                    <div className="w-1/2">
                        <h1 className="text-xl font-semibold">{ title }</h1>
                    </div>
                    <div className="w-1/2 flex flex-row justify-evenly">
                        <form action="#" className="flex flex-row">
                            <MagnifyingGlassIcon height={24} width={24} className="text-[#FE5C73] mt-3 absolute ml-4" />
                            <input className="font-light w-[250px] h-[50px] bg-[#F5F7FA] text-[#343C6A] rounded-full text-center p-2 focus:outline-none" type="text" placeholder="Search for something" />
                        </form>
                        <div className="rounded-full w-[50px] h-[50px] bg-[#F5F7FA] flex justify-center items-center">
                            <Cog6ToothIcon width={24} height={28} className="text-[#343C6A]" />
                        </div>
                        <div className="rounded-full w-[50px] h-[50px] bg-[#F5F7FA] flex justify-center items-center">
                            <BellAlertIcon width={24} height={28} className="text-[#2D60FF]" />
                        </div>
                        <div className="rounded-full w-[50px] h-[50px] bg-[#F5F7FA] flex justify-center items-center">
                            <img src={ProfilePicture} alt="Profile Picture" className=""  />
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