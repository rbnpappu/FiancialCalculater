import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [credentials, setCredentials] = useState({
    id: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded?.id && decoded?.role) {
          setCredentials({
            id: decoded.id,
            role: decoded.role,
          });
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (credentials.id && credentials.role) {
          const res = await axios.get(
            `${backendUrl}/getsallusers?id=${credentials.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (res.data && Array.isArray(res.data.data)) {
            setData(res.data.data);
          } else {
            alert(res.data.message || "No data found.");
          }
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        alert("Error fetching users");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [backendUrl, credentials]);

  const handleStatusChange = async (id, status) => {
    try {
      if(status==="block"){
           await axios.post(`${backendUrl}/blockbyuid`,
          {
            id: id
          }
        ); 
      }

      if(status==="open"){
        await axios.post(`${backendUrl}/unblocked`,
       {
         id: id
       }
     ); 
   }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#97e6cb] p-[1rem]">
      <div
        className="flex rounded-[1rem] flex-col items-center justify-center"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "1rem",
        }}
      >
        <label className="text-2xl font-bold font-serif text-white text-[2rem] mb-[1rem]">
          Welcome to Admin
        </label>

        <table
          className="rounded-[1rem]"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            padding: "1rem",
          }}
        >
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Access</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4">
                <div className="border-t border-white my-2"></div>
              </td>
            </tr>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-none">
                  <td className="border px-4 py-2 border-none">{item.name}</td>
                  <td className="border px-4 py-2 border-none">{item.role}</td>
                  <td className="border px-4 py-2 border-none">{item.email}</td>
                  <td className="border px-4 py-2 border-none">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id || item._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="open">Open</option>
                      <option value="block">Block</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-red-600 font-semibold"
                >
                  No user data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
