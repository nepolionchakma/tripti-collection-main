import { useShopContext } from "@/context/Context";
import Google from "/social-icons/google.svg";
import Spinner from "@/components/Spinner/Spinner";
import { Navigate } from "react-router";

const Login = () => {
  const url = import.meta.env.VITE_API_URL;
  const { user, isLoading } = useShopContext();

  if (isLoading) {
    return (
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Spinner size="100" color="orange" speed="1.75"></Spinner>
      </div>
    );
  }
  if (user?.email||user?.first_name||user?.id) {
    return <Navigate state={location.pathname} to="/" replace />;
  }
  const handleLogin = () => {
    window.location.href = `${url}/login/google`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-4 gap-2">
      <div
        onClick={handleLogin}
        className="flex flex-col gap-2 cursor-pointer w-10"
      >
        <img src={Google} alt="Google Image" />
      </div>
      <div>
        <h3>Login with Google</h3>
      </div>
    </div>
  );
};

export default Login;
