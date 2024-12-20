import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserButton } from './UserButton';
import { HLine } from './HLine';
import { useEffect, useState } from 'react';

interface NavbarProps {
  logged: boolean;
}

const POSITIONS = {
  Home:{left:"0px", width:"43"},
  Store:{left:"75px", width:"37"},
  About:{left:"142px", width:"48"},
  Contact:{left:"219px", width:"56"},
  User:{left:"300px", width:"0"},
}


export function Navbar({logged}:NavbarProps) {
  const [lineLeft, setLineLeft] = useState({left:"0px", width:"43"})
  
  useEffect(()=>{
    if(location.pathname == "/login") setLineLeft(POSITIONS.User);
    if(location.pathname == "/checkout") setLineLeft(POSITIONS.Store);
  }, [])

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-evenly items-center h-16">
          <Link to="/" className="font-bold text-xl text-indigo-600">
            DigitalMarket
          </Link>
          
          <div className="hidden md:flex items-center relative space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600" onClick={()=>setLineLeft(POSITIONS.Home)}>Home</Link>
            <Link to="/store" className="text-gray-700 hover:text-indigo-600" onClick={()=>setLineLeft(POSITIONS.Store)}>Store</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600" onClick={()=>setLineLeft(POSITIONS.About)}>About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600" onClick={()=>setLineLeft(POSITIONS.Contact)}>Contact</Link>
            <HLine style={lineLeft} />
          </div>

          <div className="flex items-center space-x-4">
            {/* <Link to="/dashboard" className="md:hidden text-gray-700 hover:text-indigo-600">
              <User className="h-6 w-6" />
            </Link> */}
            <UserButton logged={logged} onClickEvent={()=>setLineLeft(POSITIONS.User)}/>
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}