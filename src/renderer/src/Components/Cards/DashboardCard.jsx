const DashboardCard = (props) => {
    return(
        <div className="relative w-[350px] h-[235px] bg-[#d1dbec] rounded-[25px] shadow-md hover:shadow-lg transition-all hover:cursor-pointer dark:bg-darkbg2">
            <div className="absolute top-[15px] left-7 [font-family:'Lato-Bold',Helvetica] font-bold text-white text-[22px] tracking-[0] leading-[normal] whitespace-nowrap">
                {props.title}
            </div>
        </div>
    )
}

export default DashboardCard