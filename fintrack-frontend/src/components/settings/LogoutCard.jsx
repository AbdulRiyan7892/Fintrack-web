import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LogoutCard(){

const navigate=useNavigate();

const logout=()=>{

localStorage.removeItem("token");

navigate("/login");

};

return(

<div className="rounded-xl border border-red-200 bg-red-50 p-6">

<h2 className="text-lg font-semibold text-red-700">

Logout

</h2>

<p className="mt-2 text-sm text-red-600">

You will need to sign in again to access your account.

</p>

<button

onClick={logout}

className="mt-5 flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"

>

<LogOut
size={18}
className="mr-2"
/>

Logout

</button>

</div>

)

}

export default LogoutCard;