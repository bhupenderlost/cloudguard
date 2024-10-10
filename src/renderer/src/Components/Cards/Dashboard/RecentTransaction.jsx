import { 
    CreditCardIcon,
    WalletIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline'
const RecentTransaction = (props) => {
    return(
        <div className="relative w-[350px] h-[322px] bg-white rounded-[25px] hover:shadow-md transition-all hover:cursor-pointer dark:bg-darkbg2 flex flex-col justify-evenly items-center">
           {props.transactions.map((item) => {
                return(
                    <div className="flex flex-row items-center justify-around ">
                        <div className={`w-[50px] h-[50px] rounded-full 
                            ${item.paymentType === "card" ? 'bg-[#ffb93853]' : ''}
                            ${item.paymentType === "balance" ? 'bg-[#16dbcb65]' : ''}
                            ${item.paymentType === "paypal" ? 'bg-[#166bdb54]' : ''}
                        flex flex-row items-center justify-center mx-2`}>
                            { item.paymentType === 'balance' ? <CurrencyDollarIcon width={36} height={36} className="text-[#16DBCC] p-1" /> : ''}
                            { item.paymentType === 'card' ? <CreditCardIcon width={36} height={36} className="text-[#FFBB38] p-1" /> : '' }
                        </div>
                        <div className="w-[180px]">
                            <h1 className="text-[16px] font-semibold text-[#232323] mx-2 dark:text-textgrey">{item.type === 'debit' ? 'Balance' : ''} { item.type === 'credit' ? 'Deposit': ''}</h1>
                            <p className="text-textgrey mx-2">{item.date}</p>
                        </div>
                        <div>
                            <h1 className={`text-[16px] font-semibold ${item.type ==="credit" ? 'text-[#41D4A8]' : 'text-[#FF4B4A]'} mx-2`}>{item.type === 'debit' ? '-' : '+'} ${item.amount}</h1>
                        </div>
                    </div>
                )
           })}
        </div>
    )
}

export default RecentTransaction