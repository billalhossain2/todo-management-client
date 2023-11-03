import { useContext, useEffect, useState } from "react";
import { authContext } from "../../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
    const {user:loggedUser} = useContext(authContext)
    const [user, setUser] = useState('')
    useEffect(()=>{
        axios.get(`https://user-management-server-sand.vercel.app/users/${loggedUser?.email}`)
        .then(res => setUser(res.data))
    }, [loggedUser])
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md mx-auto p-8 bg-white rounded shadow-md">
          <div className="text-center">
            <img
              src={user?.photo}
              alt={user?.name}
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
  
          <div className="mt-8">
            <h3 className="text-lg font-semibold">About Me</h3>
            <p>"Passionate about productivity and organization. I'm here to conquer my to-do lists and achieve my goals. Task management enthusiast, aspiring project manager, and a strong believer in the power of small wins. Let's make each day count!"</p>
          </div>
          <Link to="/todo"><button className="btn btn-info mt-3">Go Back</button></Link>
        </div>
      </div>
    );
  }
  
  export default Profile;
  