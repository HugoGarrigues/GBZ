// src/components/header.tsx
import React from "react";
import { useLogout, useGetIdentity } from "@refinedev/core";

export const Header = () => {
  const { mutate: logout, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2>
        Bienvenue{identity?.name ? `, ${identity.name}` : ""} !
      </h2>
      <button type="button" disabled={isLoading} onClick={() => logout()}>
        Logout
      </button>
    </header>
  );
};
