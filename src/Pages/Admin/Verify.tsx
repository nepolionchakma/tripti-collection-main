import Spinner from "@/components/Spinner/Spinner";
import { useShopContext } from "@/context/Context";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Layout from "./Layout/Layout";

const Verify = () => {
  const { user, isLoading } = useShopContext();
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  // Show spinner while data is loading
  useEffect(() => {
    if (isLoading) return; // Don't check user status while loading

    // Redirect to login if no user is found or user is not an admin
    if (!user || user.profile_type !== "admin") {
      navigate("/login", { replace: true }); // Programmatically navigate to /login
      toast(`Account is not verified as admin`);
    }
  }, [user, isLoading, navigate]);

  // If loading, show spinner
  if (isLoading) {
    return (
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Spinner size="100" color="orange" speed="1.75"></Spinner>
      </div>
    );
  }

  // Once the user is verified as admin, render the actual component content
  return (
    <div>
      <Layout />
    </div>
  );
};

export default Verify;
