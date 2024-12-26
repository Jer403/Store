import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserButton } from './UserButton';
import { HLine } from './HLine';
import { useEffect } from 'react';
import { useLogged } from '../hooks/useLogged';
import { POSITIONS } from '../consts';
import { useLineLeft } from '../hooks/useLineLeft';




export function Navbar() {
  const {lineLeft, setLineLeftProperties} = useLineLeft()
  const {logged} = useLogged()

  
  useEffect(()=>{
    if(location.pathname == "/") setLineLeftProperties(POSITIONS.Home);
    if(location.pathname == "/login") setLineLeftProperties(POSITIONS.User);
    if(location.pathname == "/store") setLineLeftProperties(POSITIONS.Store);
    if(location.pathname == "/checkout") setLineLeftProperties(POSITIONS.Store);
    if(location.pathname.startsWith("/product")) setLineLeftProperties(POSITIONS.Store);
    if(location.pathname == "/about") setLineLeftProperties(POSITIONS.About);
    if(location.pathname == "/contact") setLineLeftProperties(POSITIONS.Contact);
  }, [])

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-evenly items-center h-16">
          <Link to="/" className="font-bold text-xl text-indigo-600">
            DigitalMarket
          </Link>
          
          <div className="hidden md:flex items-center relative space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600" onClick={()=>setLineLeftProperties(POSITIONS.Home)}>Home</Link>
            <Link to="/store" className="text-gray-700 hover:text-indigo-600" onClick={()=>setLineLeftProperties(POSITIONS.Store)}>Store</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600" onClick={()=>setLineLeftProperties(POSITIONS.About)}>About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600" onClick={()=>setLineLeftProperties(POSITIONS.Contact)}>Contact</Link>
            <HLine style={lineLeft} />
          </div>

          <div className="flex items-center space-x-4">
            {/* <Link to="/dashboard" className="md:hidden text-gray-700 hover:text-indigo-600">
              <User className="h-6 w-6" />
            </Link> */}
            <UserButton logged={logged} onClickEvent={()=>setLineLeftProperties(POSITIONS.User)}/>
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}