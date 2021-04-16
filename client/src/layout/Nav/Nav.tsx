import React from "react";
import { FlexRow } from "common/Components";
import { BiSearch } from "react-icons/bi";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { MdOndemandVideo, MdExplore } from "react-icons/md";
import { BsPeopleFill, BsPeople } from "react-icons/bs";

import CameraIcon from "../../assets/camera.svg";
import { NavContainer } from "./Nav.styles";
import NavTab from "./NavTab";

const Nav: React.FC = () => {
  return (
    <NavContainer>
      <FlexRow className="nav" alignItems="center" height="60px">
        <FlexRow alignItems="center" height="100%" className="section-1">
          <img className="logo" src={CameraIcon} alt="pix-logo" />
          <FlexRow alignItems="center" height="100%" className="search-box">
            <FlexRow alignItems="center" className="search-icon" height="100%">
              <BiSearch className="icon" />
            </FlexRow>
            <input className="search" placeholder="Search Pix" />
          </FlexRow>
        </FlexRow>
        <FlexRow
          alignItems="center"
          justifyContent="center"
          height="100%"
          className="section-2"
        >
          <FlexRow alignItems="stretch">
            <NavTab
              icon={<AiOutlineHome />}
              activeIcon={<AiFillHome />}
              href={"/home"}
              title="Home"
            />
            <NavTab
              icon={<BsPeople />}
              activeIcon={<BsPeopleFill />}
              href={"/"}
              title="Followers"
            />
            <NavTab
              icon={<MdOndemandVideo />}
              activeIcon={<MdOndemandVideo />}
              href={"/"}
              title="Reels"
            />
            <NavTab
              icon={<MdExplore />}
              activeIcon={<MdExplore />}
              href={"/"}
              title="Explore"
            />
          </FlexRow>
        </FlexRow>
        <FlexRow
          alignItems="center"
          justifyContent="flex-end"
          className="section-3"
        >
          flex
        </FlexRow>
      </FlexRow>
    </NavContainer>
  );
};

export default Nav;
