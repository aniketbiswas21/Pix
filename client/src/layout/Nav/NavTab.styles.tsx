import styled from "styled-components";

interface ITab {
  active: boolean;
}

export const TabWrapper = styled.div<ITab>`
  .tab {
    height: 60px;
    border-bottom: ${({ theme, active }) =>
      active && `3px solid ${theme.secondaryColor}`};
    cursor: pointer;
    svg {
      font-size: 1.6rem;
      object-fit: contain;
      align-self: center;
      margin-top: 1rem;
      fill: ${(props) => props.active === true && props.theme.secondaryColor};
    }

    &:hover {
      background-color: rgba(211, 211, 211, 0.2);
      border-radius: 5px;
    }
  }
`;
