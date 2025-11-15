import { getAuthChannel } from "@/app/config/authChannel";
import { clearRoadMapItems } from "@/app/redux/roadmapSlice";
import { setToast } from "@/app/redux/toastSlice";
import { clearUserDetails } from "@/app/redux/userDetailsSlice";
import { APIResponse, returnErrorObject } from "@/app/types/APIResponse";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Router } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
interface LogoutVariables {
    skipBroadcast?: boolean;
}
export const useLogout = () => {
    const path = usePathname()
    const authChannel = getAuthChannel();
    const dispatch = useDispatch();
    const router = useRouter()
    return useMutation<APIResponse<undefined>, unknown, LogoutVariables>({
        mutationFn: async () => {
            const response = await axios.get("/api/logout");
            return response.data;
        },
        onSuccess: (response: APIResponse<undefined>, variables: LogoutVariables) => {
            if (response.success) {
                // Clear all relevant Redux state
                dispatch(clearUserDetails());
                dispatch(clearRoadMapItems());
                // Broadcast logout to other tabs if needed
                if (!variables.skipBroadcast) {
                    authChannel?.postMessage("logout");
                }
                // Show success toast
                dispatch(
                    setToast({
                        toastType: "success",
                        message: response.message || "Logged out successfully",
                    })
                );
                if (path.includes("/profile")) {
                    router.push('/')
                }
            } else {
                // Show error toast if logout failed
                dispatch(
                    setToast({
                        toastType: "error",
                        message: response.message || "Logout failed",
                    })
                );
            }
        },
        onError: (error) => {
            // Return structured error object
            return returnErrorObject(error);
        },
    });
};
