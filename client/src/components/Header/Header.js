import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainContext from '../../context/MainContext'
import axios from 'axios'

import './Header.css'

const Header = () => {
    const { userInfo, setUserInfo, setAlert } = useContext(MainContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        axios.get('/api/users/logout/')
        .then(resp => {
            setUserInfo({})
            setAlert({
                message: resp.data,
                status: 'success'
            })

            navigate('/')
        })
    }

    return (
        <header className="p-3 text-bg-dark">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    {/* <img src={logo} alt="Beauty Parlor" style={{ maxWidth: '40px' }} /> */}
                    <div className="d-block ms-3 lh-1">
                        <h6 className="mb-0">RANDOM NAME 1</h6>
                        <span className="text-uppercase fs-7 fw-semibold">RANDMOM NAME 2</span>
                    </div>
                </a>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
               
              
                    {userInfo.role === 1 &&
                        <li>
                            <Link 
                            to="/admin" 
                            className="nav-link px-2"
                            >
                                Administratorius
                            </Link>
                 
                        </li>
                    }
                </ul>

                <div className="text-end">

                    
                    {userInfo.id ? 
                    <>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
                        <Link 
                                    to="/places/new" 
                                    className="nav-link "
                                    >
                                       Naujas ??ra??as 
                                    </Link>
                        <button onClick={handleLogout} className="btn btn-primary">Atsijungti</button>
                                    </ul>
                                    </>
                        :
                        <>

                      
                              
                        
                            <Link to="/login" className="btn btn-outline-light me-2">Prisijungimas</Link>
                            <Link to="/register" className="btn btn-primary">Registracija</Link>
             
                        </>
                    }
                </div>
            </div>
            </div>
        </header>
    )
}

export default Header