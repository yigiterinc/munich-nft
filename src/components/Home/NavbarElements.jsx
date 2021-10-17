import styled from "styled-components";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";

export const Nav = styled.nav`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  heigth: 72px;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
`;

export const Title = styled.h2`
  margin-left: 17.5px;
`;

export const SearchBar = styled.div`
  position: relative;
  border-radius: 8px;
  border-style: solid;
  border-width: 2px;
  border-color: #d0d0d0;
  margin-left: auto;
  margin-right: 2rem;
`;

export const CustomInputBase = styled(InputBase)`
  color: inherit;
  width: 400px;
  padding: 0.5rem;
  padding-left: 10px;
`;

export const NavMenu = styled.div`
  display: flex;
  justift-countent: space-between;
  align-items: center;
  position: relative;
`;

export const NavMobileMenu = styled(Menu)`
  flex-direction: column;
`;

export const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #000;
  font-size: 0.9rem;
`;

export const ConnectButton = styled.button`
  background-color: #000;
  width: 150px;
  height: 51px;
  border: none;
  border-radius: 8px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;

  &:hover {
    color: #a9a9a9;
  }

  &:active {
    color: #fff;
    opacity: 1;
    transition: 0s;
  }
`;
