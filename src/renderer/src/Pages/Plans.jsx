/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react';
import Base from "../Components/Base/Base";

const Plans = () => {
    useEffect(() => {
        window.document.title = "Plans | Cloudguard";
    }, []);

    return (
        <Base title={'Plans'}>
            <div className="flex justify-center items-center gap-4 p-4">
                <div className="w-[354px] h-[490px] rounded-lg bg-gradient-to-b from-[#E6ECFF] to-[#5D99FF] shadow-lg"></div>
                <div className="w-[354px] h-[490px] rounded-lg bg-gradient-to-b from-[#FFE0EB] to-[#FF6498] shadow-lg"></div>
                <div className="w-[354px] h-[490px] rounded-lg bg-gradient-to-b from-[#FFF5D9] to-[#FFBB38] shadow-lg"></div>
            </div>
        </Base>
    );
}

export default Plans;
