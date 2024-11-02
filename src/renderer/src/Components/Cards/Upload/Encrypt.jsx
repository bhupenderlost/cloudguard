import React from 'react';

const EncryptButton = ({ onClick, name = "", encryptionType = "" }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col text-lg font-semibold space-y-2">
        <p>{name}</p>
        <p>{encryptionType}</p>
      </div>
      <button
        onClick={onClick}
        className="px-6 py-2 bg-red text-white rounded-full"
      >
        Encrypt
      </button>
    </div>
  );
};

export default EncryptButton;

