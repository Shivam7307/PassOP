import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  return (
    <nav className='bg-blue-950 text-white flex justify-around items-center px-4 h-14'>
      <div className="font-bold"><h1 className='font-bold text-xl'>
        <span className='text-blue-500'>&lt;</span>Pass<span className='text-blue-500'>OP</span><span className='text-blue-500'>/&gt;</span></h1></div>
      {/* <ul>
        <li className='flex gap-4'>
          <a href="#" className='hover:font-bold'>Home</a>
          <a href="#" className='hover:font-bold'>About</a>
          <a href="#" className='hover:font-bold'>Contact</a>
        </li>
      </ul> */}

      <a href="https://github.com/Shivam7307" target='_blank'>
      <button className='flex items-center gap-2 bg-blue-900 p-2 rounded-full border border-slate-300 hover:bg-blue-950'>
        <i className="fa-brands fa-github text-2xl"></i>
        Github
      </button>
      </a>

    </nav>
  )
}

export default Navbar
