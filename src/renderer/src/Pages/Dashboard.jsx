import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Base from "../Components/Base/Base"
import DashboardCard from '../Components/Cards/Dashboard/DashboardCard'
import RecentTransaction from '../Components/Cards/Dashboard/RecentTransaction'
import WeeklyActivity from '../Components/Cards/Dashboard/WeeklyActivity'


const Dashboard = () => {

    const [projects, setProjects] = useState([
        {
            _id: "1",
            title: "Project 1"
        },
         {
            _id: "2",
            title: "Project 2"
        },
         {
            _id: "3",
            title: "Project 3"
        }
    ])

    const [transactions, setTransactions] = useState([
        {
            type: "debit",
            amount: 500,
            paymentType: 'balance',
            date: '10 October 2024'
        },
        {
            type: "credit",
            amount: 200,
            paymentType: 'paypal',
            date: '08 October 2024'

        },
        {
            type: "credit",
            amount: 500,
            paymentType: 'card',
            date: '05 October 2024'
        },
        {
            type: "credit",
            amount: 500,
            paymentType: 'card',
            date: '05 October 2024'
        }
    ])

    useEffect(() => {
        window.document.title = "Dashboard | Cloudguard"
    })
    return(
        <Base title={'Dashboard'}>
            <div className="flex flex-row justify-evenly h-1/2 w-full justify-evenly">
                <div className="w-2/3 my-2">
                    <h1 className="text-xl ml-4 py-4 text-[#343C6A] font-semibold dark:text-textgrey">Weekly Activity</h1>
                    <WeeklyActivity />
                </div>
                <div className="w-1/3 my-2">
                    <h1 className="text-xl ml-4 py-4 text-[#343C6A] font-semibold dark:text-textgrey">Recent Transactions</h1>
                    <RecentTransaction transactions={transactions ? transactions : []} />
                </div>
            </div>
            <div className="h-1/2 w-full -px-4">
                <div className="flex flex-row justify-between w-full">
                    <h1 className="text-xl ml-4 py-4 text-[#343C6A] font-semibold dark:text-textgrey">Recent Projects</h1>
                    <Link className="text-[#343C6A] py-4 font-semibold hover:underline transition-all dark:text-textgrey" to="/projects">View All</Link>
                </div>
                <div className="flex flex-row justify-evenly items-center">
                    {
                        projects.map((item) => {
                            return <DashboardCard title={item.title} key={item._id} />
                        })
                    }
                </div>
            </div>
        </Base>
    )

}

export default Dashboard