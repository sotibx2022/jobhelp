import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserState } from "../types/userState";
export const useUserDetails = (userToken: string) => {
  const [userDetails, setUserDetails] = useState<UserState | null>(null);
  const userDetailsMutation = useMutation({
    mutationFn: async (token: string) => {
      const response = await axios.post('/api/usertoken', { userToken: token });
      return response.data;
    },
    onSuccess: (data) => {
      setUserDetails(data);
    },
    onError: () => {
      setUserDetails(null);
    },
  });
  // ✅ Only run when userToken changes, not every render
  useEffect(() => {
    if (userToken) {
      userDetailsMutation.mutate(userToken);
    } else {
      setUserDetails(null);
    }
  }, [userToken]); // runs once when userToken changes
  return { 
    isLoading: userDetailsMutation.isLoading, 
    userDetails 
  };
};
