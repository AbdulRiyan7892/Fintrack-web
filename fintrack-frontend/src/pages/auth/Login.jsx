import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

          const response = await loginUser({
              email,
              password,
          });

          console.log(response.data);

          // Save JWT
          localStorage.setItem("token", response.data.token);

          toast.success(response.data.message);

          navigate("/dashboard");

      } catch (error) {

          toast.error(
              error.response?.data?.message || "Login Failed"
          );

      } finally {

          setLoading(false);

      }

  };

  return (
    <AuthLayout>

      <Card>

        <div className="mb-8">

          <h2 className="text-4xl font-bold text-slate-800">
            Welcome Back
          </h2>

          <p className="mt-2 text-slate-500">
            Login to continue to your account
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <Input
            icon={<Mail size={20} />}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={<Lock size={20} />}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            togglePassword={() =>
              setShowPassword(!showPassword)
            }
          />

          <Button
            type="submit"
            loading={loading}
          >
            Login
          </Button>

        </form>

        <div className="mt-8 text-center">

          <span className="text-slate-500">
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
          >
            Register
          </Link>

        </div>

      </Card>

    </AuthLayout>
  );
}

export default Login;