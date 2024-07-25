import { Link, useNavigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth";
import useUser from "./hooks/useUser";

const NavBar = () => {
    const Navigate = useNavigate();
    const { user } = useUser();
    return (
    <nav>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/profile'>Profile</Link>
            </li>
        </ul>
        <div className="nav-right">
            {user
             ? <button onClick={() => signOut(getAuth())}>Log Out</button>
             : <button onClick={() => Navigate('/login')}>Log in</button>}
        </div>
    </nav>
  )
}

export default NavBar;