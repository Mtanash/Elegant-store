import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import { getUserOrders } from "../api/userApi";

const useUserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!user) return;
    const fetchUserOrders = async () => {
      setLoading(true);
      const response = await getUserOrders();
      if (response?.data) {
        setOrders(response?.data);
      } else {
        setOrders([]);
      }
      setLoading(false);
    };
    fetchUserOrders();
  }, [user]);

  return [orders, loading];
};

export default useUserOrders;
