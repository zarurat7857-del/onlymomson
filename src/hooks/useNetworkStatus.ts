"use client";
import { useState, useEffect } from "react";

export function useNetworkStatus() {
  const [isLowDataMode, setIsLowDataMode] = useState(false);

  useEffect(() => {
    // Check if the browser supports the Network Information API
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;

      const updateConnectionStatus = () => {
        // "save-data" mode OR slow connection (2g/3g)
        const isSlow = 
          connection.saveData === true || 
          connection.effectiveType === "2g" || 
          connection.effectiveType === "3g";
        
        setIsLowDataMode(isSlow);
      };

      // Initial check
      updateConnectionStatus();

      // Listen for changes (e.g., user switches from WiFi to Data)
      connection.addEventListener("change", updateConnectionStatus);

      return () => {
        connection.removeEventListener("change", updateConnectionStatus);
      };
    }
  }, []);

  return { isLowDataMode };
}