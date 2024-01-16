import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Blogs from './pages/Blogs.js';
import CreateBlog from './pages/CreateBlog.js';
import { useAuthContext } from './hooks/useAuthContext.js';
import ViewBlog from './components/ViewBlog.js';
import EditBlog from './pages/EditBlog.js';

const App = () => {
    const {user} = useAuthContext();
    return (
        <BrowserRouter>
        <div><Navbar /> </div>
            
            <div className='body'>
                <Routes>
                    <Route path='/' element={user?(<Home />):(<Navigate to="/user/login"/>)} />
                    <Route path='/user/login' element={!user?(<Login />):(<Navigate to="/"/>)} />
                    <Route path='/user/signup' element={!user ? (<Signup />):(<Navigate to="/"/>)} />
                    <Route path='/user/show_blogs' element={user?(<Blogs/>):(<Navigate to="/user/login" />)} />
                    <Route path='/user/create_blog' element={user?(<CreateBlog/>):(<Navigate to="/user/login" />)} />
                    <Route path='/user/view_blog/:id' element={user?(<ViewBlog/>):(<Navigate to="/user/login" />)} />
                    <Route path='/user/edit_blog/:id' element={user?(<EditBlog/>):(<Navigate to="/user/login" />)} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App