import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogOut.js'
import { useAuthContext } from '../hooks/useAuthContext.js'

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLougout = () => {
        logout();
    }
    return (
        <header>
            <nav className="navbar navbar-default navbar-expand-lg navbar-fixed-top bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" >blogg</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {
                                user ? (
                                    <>
                                        <Link to="/user/show_blogs" className="nav-link">My blogs</Link>
                                        <Link to="/user/create_blog" className="nav-link">Create blog</Link>
                                        <Link to="/user/profile" className='nav-link'>Profile</Link>
                                        <button className="nav-link" onClick={handleLougout}>Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/user/login" className="nav-link">Login</Link>
                                        <Link to="/user/signup" className="nav-link">Signup</Link>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Navbar