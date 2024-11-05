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
                {/* Monthly Plan Card */}
                <div className="w-[354px] h-[490px] rounded-lg bg-gradient-to-b from-[#E6ECFF] to-[#5D99FF] shadow-lg p-6 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mt-12">Monthly Plan</h2>
                    <p className="text-4xl font-extrabold text-blue-700 mt-4">$10</p>
                    <p className="text-gray-600 mt-2">per month</p>
                    <ul className="mt-6 space-y-3 text-gray-700">
                        <li>✔ Access to basic features</li>
                        <li>✔ 5 GB storage</li>
                        <li>✔ Email support</li>
                    </ul>
                    <button className="mt-auto bg-blue text-white py-2 px-6 rounded-lg hover:bg-blue-700">
                        Select
                    </button>
                </div>

                {/* Quarterly Plan Card */}
                <div className="w-[354px] h-[490px] rounded-lg bg-gradient-to-b from-[#FFE0EB] to-[#FF6498] shadow-lg p-6 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold mt-12">Quarterly Plan</h2>
                    <p className="text-4xl font-extrabold  mt-4">$27</p>
                    <p className="text-gray-600 mt-2">per 3 months</p>
                    <ul className="mt-6 space-y-3 text-gray-700">
                        <li>✔ Access to premium features</li>
                        <li>✔ 20 GB storage</li>
                        <li>✔ Priority email support</li>
                    </ul>
                    <button className="mt-auto bg-pink-600 text-white py-2 px-6 rounded-lg ">
                        Select
                    </button>
                </div>

                {/* Yearly Plan Card */}
                <div className="w-[354px] h-[490px] rounded-lg bg-gradient-to-b from-[#FFF5D9] to-[#FFBB38] shadow-lg p-6 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold text-yellow-900 mt-12">Yearly Plan</h2>
                    <p className="text-4xl font-extrabold text-yellow-700 mt-4">$100</p>
                    <p className="text-gray-600 mt-2">per year</p>
                    <ul className="mt-6 space-y-3 text-gray-700">
                        <li>✔ Access to all features</li>
                        <li>✔ 100 GB storage</li>
                        <li>✔ 24/7 support</li>
                    </ul>
                    <button className="mt-auto bg-[#edab32] text-white py-2 px-6 rounded-lg ">
                        Select
                    </button>
                </div>
            </div>
        </Base>
    );
}

export default Plans;
