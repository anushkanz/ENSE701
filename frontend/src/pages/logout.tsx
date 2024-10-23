import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie"; // Import this if you are using cookies


const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulating logout by clearing session storage or cookies
    // You can replace this with your actual logout logic
    localStorage.removeItem("token");

    // If you're using cookies
    Cookies.remove("token"); // Remove the token stored in cookies
    
    // Redirect to home page after logout
    router.push('/');
  }, [router]);

  return (
    <div>
      <h1>Logging you out...</h1>
    </div>
  );
};

export default Logout;