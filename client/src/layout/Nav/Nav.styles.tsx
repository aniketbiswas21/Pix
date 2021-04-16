import styled from "styled-components";

export const NavContainer = styled.div`
  .nav {
    background-color: ${({ theme }) => theme.cardBackground};
    line-height: 1.34;
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  }

  .section-1 {
    width: 25%;
    padding: 0.5rem 1rem;
  }

  .section-2 {
    width: 75%;
  }

  .section-3 {
    width: 25%;
    padding: 0.5rem 1rem;
  }

  .logo {
    height: auto;
    width: 2.8rem;
    object-fit: contain;
  }

  .search-box {
    margin-left: 1rem;
  }

  .search {
    outline: none;
    align-self: stretch;
    border: none;
    border-radius: 0px 20px 20px 0px;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-size: 1.1rem;
  }

  .search-icon {
    background-color: ${({ theme }) => theme.body};
    border-radius: 20px 0px 0px 20px;
    padding: 0 1rem;
  }

  .icon {
    font-size: 1.25rem;
    object-fit: contain;
  }
`;
