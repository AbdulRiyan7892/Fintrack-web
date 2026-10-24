import "./Navbar.css";

import { Menu, Bell, Search } from "lucide-react";

import { useSidebar } from "../context/SidebarContext";

export default function Navbar(){

const {toggleSidebar}=useSidebar();

return(

<div className="navbar">

<div style={{display:"flex",alignItems:"center",gap:18}}>

<button

className="icon-btn"

onClick={toggleSidebar}

>

<Menu size={18}/>

</button>

{/* <div className="search"> */}

{/* <Search size={18}/> */}

{/* <input */}

{/* placeholder="Search transactions..." */}

{/* /> */}

{/* </div> */}

{/* </div> */}

{/* <div className="right"> */}

{/* <button className="icon-btn"> */}

{/* <Bell size={18}/> */}

{/* </button> */}

</div>

</div>

)

}