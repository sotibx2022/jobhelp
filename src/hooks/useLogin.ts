import { getAuthChannel } from "@/app/config/authChannel";
import { setToast } from "@/app/redux/toastSlice";
import { setUserDetails } from "@/app/redux/userDetailsSlice";
import { APIResponse, returnErrorObject } from "@/app/types/APIResponse";
import { UserState } from "@/app/types/userState";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
interface LoginVariables {
  skipBroadcast?: boolean;
}
export const useLogin = () => {
  const authChannel = getAuthChannel();
  const dispatch = useDispatch();
  return useMutation<APIResponse<UserState>, unknown, LoginVariables>({
    mutationFn: async () => {
      const response = await axios.get("/api/userId");
      return response.data;
    },
    onSuccess: (response: APIResponse<UserState>, variables?: LoginVariables) => {
      if (response.success) {
        dispatch(setUserDetails(response.data));
        // Only broadcast login if skipBroadcast is NOT true
        if (!variables?.skipBroadcast) {
          authChannel?.postMessage("login");
        }
      }
    },
    onError: (error) => {
      return returnErrorObject(error);
    },
  });
};
