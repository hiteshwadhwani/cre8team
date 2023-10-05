"use client";

import { User } from "@prisma/client";
import { Session, User as SupaUser } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
type userContextType = {
  profile: User | null;
  session: Session | null;
  user: SupaUser | null;
};

export const UserContext = createContext<userContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        setSession(session);
        setUser(session.user);
        const data = {
          authId: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata["name"],
          imageUrl: session.user.user_metadata["avatar_url"],
        };
        const res = await axios.post("/api/get-user", data);
        if (res.status === 200) {
          setProfile(res.data);
        }
      }
    });
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
        setProfile(null);
        setUser(null);
      } else if (event === "SIGNED_IN") {
        try {
          const data = {
            authId: session?.user.id,
            email: session?.user.email,
            name: session?.user.user_metadata["name"],
            imageUrl: session?.user.user_metadata["avatar_url"],
          };
          const res = await axios.post("/api/get-user", data);
          if (res.status === 200) {
            setProfile(res.data);
          }
        } catch (error) {
          setUser(null);
        }
      }
    });
  }, [supabase.auth]);
  const value = { user, session, profile };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const userData = useContext(UserContext);
  return userData;
};
