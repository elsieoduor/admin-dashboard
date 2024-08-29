import React from 'react'

const Loader:React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-[100px]">
        <div className="loader">
            <div className="w-[40px] h-[40px] border-4  border-secondary: border-b-primary rounded-full animate-spin"></div>
        </div>
    </div>
  )
}

export default Loader