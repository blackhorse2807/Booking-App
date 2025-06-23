"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

// For debugging purposes
const logWithTimestamp = (message: string, data?: unknown) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, data ? data : '');
};

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Log when the SessionWrapper mounts
  useEffect(() => {
    logWithTimestamp("SessionWrapper mounted");
    
    // Log any auth-related items in localStorage for debugging
    const authItems = Object.keys(localStorage)
      .filter(key => key.includes('next-auth'))
      .reduce((obj, key) => {
        obj[key] = 'present';
        return obj;
      }, {} as Record<string, string>);
    
    if (Object.keys(authItems).length > 0) {
      logWithTimestamp("Auth items in localStorage:", authItems);
    } else {
      logWithTimestamp("No auth items found in localStorage");
    }
    
    return () => {
      logWithTimestamp("SessionWrapper unmounted");
    };
  }, []);

  return (
    <SessionProvider 
      refetchInterval={5 * 60} // Refetch session every 5 minutes
      refetchOnWindowFocus={true} // Refetch when window gets focus
    >
      {children}
    </SessionProvider>
  );
}
