import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from './componenets/button';
function App() {
  return (
    <div className=" bg-black h-screen flex  w-full">
      <div className="flex flex-col mx-auto mt-16 gap-4 items-center">
        <h1 className='text-white text-5xl text-bold max-w-lg text-center'>
          Are you cooked for your <span className='underline text-6xl'>exam?</span>
        </h1>
        <h2 className='text-gray-300 text-3xl '>
            fill out this simple form below to find out
        </h2>
        <div className='bg-white w-72 h-96 p-8 rounded-lg'>
          <form className='w-full'>
            <label className='px-1 text-md'>Input Field</label>
            <input className="flex h-8 w-full rounded-lg border border-input border bg-transparent px-4 py-2 text-black shadow-md" placeholder='hi'/> 
          </form>
        </div>
        </div>
        
    </div>
  );
}

export default App;
