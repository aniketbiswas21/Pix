import React from "react";
import { Tooltip } from "@material-ui/core";
import { FlexCol } from "common/Components";
import { useHistory } from "react-router";

import { TabWrapper } from "./NavTab.styles";

interface IProps {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  href: string;
  title: string;
}

const NavTab: React.FC<IProps> = ({
  icon: Icon,
  activeIcon: ActiveComponent,
  href,
  title,
}) => {
  const {
    location: { pathname },
    push,
  } = useHistory();
  return (
    <Tooltip title={title}>
      <TabWrapper active={pathname === href ? true : false}>
        <FlexCol
          height="100%"
          width="110px"
          className="tab"
          alignItems="center"
          justifyContent="stretch"
          onClick={() => {
            push(href);
          }}
        >
          {pathname === href ? ActiveComponent : Icon}
        </FlexCol>
      </TabWrapper>
    </Tooltip>
  );
};

export default NavTab;
