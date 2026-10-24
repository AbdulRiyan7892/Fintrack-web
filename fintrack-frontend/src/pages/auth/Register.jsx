import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { registerUser } from "../../api/authApi";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

   const handleRegister = async(e)=>{

       e.preventDefault();

       setLoading(true);

       try{

           await registerUser({

               name,
               email,
               password

           });

           toast.success("Registration Successful");

           navigate("/login");

       }

       catch(error){

           toast.error(
               error.response?.data?.message ||
               "Registration Failed"
           );

       }

       finally{

           setLoading(false);

       }

   };

    return (

        <AuthLayout>

            <Card>

                <div className="mb-8">

                    <h2 className="text-4xl font-bold text-slate-800">

                        Create Account

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Start managing your finances today

                    </p>

                </div>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    <Input
                        icon={<User size={20}/>}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />

                    <Input
                        icon={<Mail size={20}/>}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <Input
                        icon={<Lock size={20}/>}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        showPassword={showPassword}
                        togglePassword={()=>setShowPassword(!showPassword)}
                    />

                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Register
                    </Button>

                </form>

                <p className="mt-8 text-center">

                    Already have an account?

                    <Link
                        className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
                        to="/"
                    >

                        Login

                    </Link>

                </p>

            </Card>

        </AuthLayout>

    );

}

export default Register;