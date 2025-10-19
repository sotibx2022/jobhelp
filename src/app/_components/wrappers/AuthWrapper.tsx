"use client";
import {getAuthChannel } from "@/app/config/authChannel";
import { setToast } from "@/app/redux/toastSlice";
import { useLogin } from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const login = useLogin();
  const logout = useLogout();
  // Memoize the channel to keep reference stable
  const stableChannel = useMemo(() => getAuthChannel(), []);
  useEffect(() => {
    if (!stableChannel) return;
    const eventHandler = (event: MessageEvent) => {
  const message = event.data;
  if (!message) return;
  // Only trigger mutate if the message is NOT from this tab
  if (message === "login") {
    dispatch(setToast({ toastType: "info", message: "Logged in from another tab." }));
    login.mutate({ skipBroadcast: true });
  } else if (message === "logout") {
    dispatch(setToast({ toastType: "info", message: "Logged out from another tab." }));
    logout.mutate({ skipBroadcast: true });
  }
};
    stableChannel.addEventListener("message", eventHandler);
    return () => stableChannel.removeEventListener("message", eventHandler);
  }, [stableChannel, dispatch, login, logout]);
  return <>{children}</>;
};
export default AuthWrapper;
