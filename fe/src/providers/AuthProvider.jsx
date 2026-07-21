import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { setupApi } from "../services/setupApi";

export default function AuthProvider({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    setupApi(getToken);
  }, [getToken]);

  return children;
}
