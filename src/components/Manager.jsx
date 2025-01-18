import React from 'react'
import { useRef, useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const passRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);



    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])


    const showPassword = () => {
        // alert("Show the password........");
        if (ref.current.src.includes("hidden.png")) {
            ref.current.src = "eye.png"
            passRef.current.type = "text"
        } else {
            ref.current.src = "hidden.png"
            passRef.current.type = "password"
        }
    }



    const savePassword = () => {

        if (form.site.length > 4 && form.username.length > 4 && form.password.length > 4) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            toast.success('Password Saved!', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setForm({ site: "", username: "", password: "" });
        } else {
            toast.error('Length of each entry must be more than 4!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        // console.log([...passwordArray, {...form, id: uuidv4()}]);
    }


    const handleChange = (e) => {
        (setForm({ ...form, [e.target.name]: e.target.value }));
    }


    const editPassword = (id) => {

        console.log(id);
        setForm(passwordArray.filter(i => i.id === id)[0]);
        setPasswordArray(passwordArray.filter(item => item.id !== id));

    }


    const deletePassword = (id) => {

        let c = confirm("Do you really want to delete this password?");
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast.success('Password Deleted!', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }


    return (
        <>
            {/* <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div> */}
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="container mx-auto text-center text-white max-w-4xl">
                <h1 className='font-bold text-2xl pt-5'>
                    <span className='text-blue-500'>&lt;</span>Pass<span className='text-blue-500'>OP</span><span className='text-blue-500'>/&gt;</span></h1>
                <p className='pb-3'>Your own password manager.</p>

                <div className='text-white flex flex-col p-4'>
                    <input id='site' name='site' onChange={handleChange} type="text" value={form.site} placeholder='Enter Website URL' className='h-8 px-3 rounded-full text-black' />
                    <div className="flex flex-col md:flex-row py-4 w-full mx-auto justify-between gap-4">
                        <input id='username' name='username' onChange={handleChange} value={form.username} placeholder='Enter Username' className='px-3 h-8 rounded-full w-full text-black' type="text" />
                        <div className="relative w-full">
                            <input id='password' name='password' onChange={handleChange} value={form.password} ref={passRef} placeholder='Enter Password' className='px-3 h-8 rounded-full w-full text-black' type="password" />
                            <span className='absolute right-2 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={23} src="hidden.png" alt="hidden" />
                            </span>
                        </div>
                    </div>
                </div>
                <button className='bg-blue-700 flex justify-center items-center mx-auto px-4 hover:bg-blue-800 w-fit rounded-full text-center text-white' onClick={savePassword}>
                    <span className='text-center pr-1 items-center justify-center'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                    </span>
                    Save</button>



                <h2 className='flex font-bold mx-10 my-2 mt-10'>Your Passwords :</h2>

                {passwordArray.length === 0 && <div>Your passwords will appear here.</div>}
                {passwordArray.length != 0 &&
                    <div className='rounded-xl overflow-hidden'>
                        <table className="table-auto w-full bg-blue-700 mb-8 rounded-xl overflow-hidden">
                            <thead className=''>
                                <tr className='rounded-xl'>
                                    <th>Site</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-blue-100 text-blue-900 font-medium'>
                                {passwordArray.map((item) => {
                                    return <tr className='border border-black'>
                                        <td className='hover:underline'><a href={item.site} target='_blank'>{item.site}</a></td>
                                        <td>{item.username}
                                            <span className='cursor-pointer' onClick={()=>copyText(item.username)}> &nbsp; <lord-icon
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover"
                                                style={{ "width": "20px", "height": "20px", "paddingTop": "2px" }}>
                                            </lord-icon></span>
                                        </td>
                                        <td className='justify-center items-center'>{item.password}
                                            <span className='cursor-pointer' onClick={()=>copyText(item.password)}> &nbsp; <lord-icon
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover"
                                                style={{ "width": "20px", "height": "20px", "paddingTop": "2px" }}>
                                            </lord-icon></span>
                                        </td>
                                        <td>
                                            <span className='cursor-pointer' onClick={() => editPassword(item.id)}>
                                                <i className="pr-4 text-black fa-solid fa-pen-to-square hover:animate-bounce text-[17px]"></i>
                                            </span>
                                            <span className='cursor-pointer' onClick={() => deletePassword(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>

                    </div>
                }
            </div>
        </>
    )
}

export default Manager
