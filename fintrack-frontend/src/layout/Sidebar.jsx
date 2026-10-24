import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

import {

LayoutDashboard,

Receipt,

Wallet,

PieChart,

ChartColumn,

Settings,

LogOut

} from "lucide-react";

const menus=[

{title:"Dashboard",icon:LayoutDashboard,path:"/dashboard"},

{title:"Transactions",icon:Receipt,path:"/transactions"},

{title:"Budget",icon:Wallet,path:"/budget"},

{title:"Analytics",icon:PieChart,path:"/analytics"},

{title:"Reports",icon:ChartColumn,path:"/reports"},

{title:"Settings",icon:Settings,path:"/settings"}

];

export default function Sidebar(){

const {collapsed}=useSidebar();

return(

<div className={`sidebar ${collapsed?"collapsed":""}`}>

<div>

<div className="sidebar-header">

{collapsed?"F":"FinTrack"}

</div>

<div className="sidebar-menu">

{

menus.map(item=>{

const Icon=item.icon;

return(

<NavLink

to={item.path}

key={item.title}

className={({isActive})=>`sidebar-item ${isActive?"active":""}`}

>

<Icon size={20}/>

{!collapsed&&<span>{item.title}</span>}

</NavLink>

)

})

}

</div>

</div>

<div className="sidebar-footer">

<div className="user-card">

<div className="avatar">

A

</div>

{

!collapsed&&

<div>

<div style={{fontWeight:600}}>Abdul</div>

<div style={{fontSize:13,color:"#6B7280"}}>

View Profile

</div>

</div>

}

</div>

</div>

</div>

)

}