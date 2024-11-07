import React, { useEffect, useState } from 'react';
import Base from "../Components/Base/Base";

const Keys = () => {
    const [copyMessage, setCopyMessage] = useState('');
    const [copiedKeyIndex, setCopiedKeyIndex] = useState(null); // To highlight copied key row

    useEffect(() => {
        window.document.title = "Keys | Cloudguard";
    }, []);

    const data = [
        { slNo: '01', project: 'Project A', date: '2024-11-05', encryption: 'AES', key: 'abcd1234' },
        { slNo: '02', project: 'Project B', date: '2024-11-05', encryption: 'RSA', key: 'efgh5678' },
        { slNo: '03', project: 'Project C', date: '2024-11-05', encryption: 'SHA-256', key: 'ijkl9101' },
        { slNo: '04', project: 'Project D', date: '2024-11-05', encryption: 'Blowfish', key: 'mnop1121' },
        { slNo: '05', project: 'Project E', date: '2024-11-05', encryption: 'AES', key: 'qrst3141' },
        { slNo: '06', project: 'Project F', date: '2024-11-05', encryption: 'RSA', key: 'uvwx5161' },
        { slNo: '07', project: 'Project G', date: '2024-11-05', encryption: 'SHA-256', key: 'yzab7181' },
        { slNo: '08', project: 'Project H', date: '2024-11-05', encryption: 'Blowfish', key: 'cdef9201' },
    ];

    const copyToClipboard = (key, index) => {
        navigator.clipboard.writeText(key)
            .then(() => {
                setCopyMessage(`Key "${key}" copied to clipboard!`);
                setCopiedKeyIndex(index); // Highlight the copied row
                setTimeout(() => {
                    setCopyMessage('');
                    setCopiedKeyIndex(null); // Remove highlight after timeout
                }, 1000); // Message disappears after 2 seconds
            })
            .catch(err => console.error('Could not copy text: ', err));
    };

    return (
        <Base title={'Keys'}>
            <div className="w-[1072px] p-8 bg-white rounded-xl relative dark:bg-darkbg2">
                {/* Centered copy message */}
                {copyMessage && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
                        <div className="bg-white text-blue-700 px-6 py-4 rounded shadow-lg text-center">
                            {copyMessage}
                        </div>
                    </div>
                )}
                
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className="border-b border-gray-300 text-grey2">
                            <th className="px-4 py-2 text-left">Sl No</th>
                            <th className="px-4 py-2 text-left">Project</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Encryption</th>
                            <th className="px-4 py-2 text-left">Key</th>
                            <th className="px-4 py-2 text-center">Copy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className={`border-b border-[#e6e6e6] ${copiedKeyIndex === index ? 'bg-blue-50' : ''}`}
                            >
                                <td className="px-4 py-3 text-left">{item.slNo}</td>
                                <td className="px-4 py-3 text-left">{item.project}</td>
                                <td className="px-4 py-3 text-left">{item.date}</td>
                                <td className="px-4 py-3 text-left">{item.encryption}</td>
                                <td className="px-4 py-3 text-left">{item.key}</td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => copyToClipboard(item.key, index)}
                                        className="w-[102.10px] h-[38.37px] border border-blue text-blue rounded-full hover:bg-[#dfe6fc]"
                                    >
                                        Copy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Base>
    );
}

export default Keys;
