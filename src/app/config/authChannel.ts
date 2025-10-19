let _authChannel: BroadcastChannel | null = null;
export const getAuthChannel = () => {
  if (typeof window === "undefined") {
    return null;
  }
  if (!_authChannel) {
    _authChannel = new BroadcastChannel("auth");
  }
  return _authChannel;
};
