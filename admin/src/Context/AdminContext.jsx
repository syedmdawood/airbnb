import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [properties, setProperties] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllProperties = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-properties",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setProperties(data.propertyList);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const changeAvailability = async (propertyId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { propertyId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProperties();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-property",
        { propertyId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProperties();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    properties,
    setProperties,
    getAllProperties,
    changeAvailability,
    deleteProperty,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
