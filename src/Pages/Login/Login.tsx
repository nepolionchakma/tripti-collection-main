import Google from "/social-icons/google.svg";

const Login = () => {
  const url = import.meta.env.VITE_API_URL;

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
