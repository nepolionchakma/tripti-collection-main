import Google from "/social-icons/google.svg";

const Login = () => {
  const url = import.meta.env.VITE_API_URL;

  const handleLogin = () => {
    window.location.href = `${url}/login/google`;
  };

  return (
    <div className="flex justify-center items-center mt-4 gap-4">
      <div onClick={handleLogin} className="cursor-pointer w-10">
        <img src={Google} alt="Google Image" /> <h3>Login</h3>
      </div>
    </div>
  );
};

export default Login;
