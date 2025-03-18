import React from 'react'

const Dialogue = ({ showDialogue , setshowDialogue , text}) => {
  return (
    <>
    { text && showDialogue && <div className='fixed z-50 bg-white shadow-lg w-[30rem] h-[10rem] top-32 md:left-24 left-5 lg:left-[25rem]'>
        <div className='mx-5 my-5'>{text}</div>
        <button onClick={()=>{setshowDialogue(false)}} className='bg-orange-400 text-white text-lg font-medium px-8 mx-40'>close</button>

    </div>}
    </>
  )
}

export default Dialogue
