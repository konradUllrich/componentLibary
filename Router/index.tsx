import type { FC, PropsWithChildren } from "react";
import { Router as WRouter } from "wouter";
import { useAppRouteLocation, useAppRouteSearch } from "./appRouteLocation";
export { Route, Link } from "wouter";

export const Router: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WRouter hook={useAppRouteLocation} searchHook={useAppRouteSearch}>
      {children}
    </WRouter>
  );
};
