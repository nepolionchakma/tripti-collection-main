import { useShopContext } from "@/context/Context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useShopContext();
  const navigate = useNavigate();
  console.log(user, "user");
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }
  console.log(user, "user");
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
                <AvatarImage src={user.picture} alt="User Profile" />
                <AvatarFallback>
                  {user.first_name.slice(0, 1)}
                  {user.last_name.slice(0, 1)}
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
