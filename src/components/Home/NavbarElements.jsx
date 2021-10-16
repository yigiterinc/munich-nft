import styled from "styled-components";

export const Nav = styled.nav`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  heigth: 72px;
`;

export const Logo = styled.a``;

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #000;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const Menu = styled.div`
  display: flex;
  justift-countent: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
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
`;
