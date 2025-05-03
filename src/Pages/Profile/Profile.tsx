import { Navigate } from "react-router";
import Spinner from "@/components/Spinner/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useShopContext } from "@/context/Context";

const Profile = () => {
  const { user, isLoading } = useShopContext();

  // Show spinner while data is loading
  if (isLoading) {
    return (
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Spinner size="100" color="orange" speed="1.75"></Spinner>
      </div>
    );
  }

  // Redirect to login page if user data is not available
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log(user, "user");
  // If user is fetched successfully, show profile page
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1 py-4 h-[calc(100vh-80px)] border-l">
        <div className="bg-amber-300 hover:bg-amber-400 rounded-r-2xl p-2 text-white cursor-pointer">
          Profile
        </div>
      </div>
      <div className="col-span-3 p-4">
        <div className="flex flex-col gap-4">
          <div>
            Welcome,{" "}
            <p className="font-bold inline-block">{user?.first_name}</p> to your
            Profile
          </div>
          <div className="flex gap-4 items-center bg-amber-50 border rounded-2xl p-4 cursor-pointer hover:shadow-2xl hover:scale-105 duration-300">
            <div>
              <Avatar className="w-20 h-20 border bg-white">
                <AvatarImage src={user?.picture} alt="User Profile" />
                <AvatarFallback>
                  {user?.first_name.slice(0, 1)}
                  {user?.last_name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p>Username: {user?.user_name}</p>
              <p>
                Full Name: {user?.first_name} {user?.last_name}
              </p>
              <p>Email: {user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
