import React from "react";
import { LayoutContainer } from "./Layout.styles";
import Nav from "layout/Nav/Nav";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <div className="nav">
        <Nav />
      </div>
      <div className="main">{children}</div>
    </LayoutContainer>
  );
};

export default Layout;
