import styled, { css } from "styled-components";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const node = useRef();
  const [hideDropdown, setHideDropdown] = useState(true);
  const employee = useSelector((state) => state["employee"]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleAvatar = (e) => {
    e.preventDefault();

    setHideDropdown(!hideDropdown);
  };

  const handleOutsideClick = (e) => {
    if (
      node.current &&
      //@ts-ignore
      typeof node.current.contains === "function" &&
      node &&
      //@ts-ignore
      !node.current.contains(e.target)
    ) {
      setHideDropdown(true);
    }
  };

  return (
    <>
      <Nav className={`nav`}>
        <Link href="/">
          <a>
            <Image src="/logo.svg" width={35} height={35} />
          </a>
        </Link>
        <NavAuth ref={node}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "14px",
              pointer: "cursor",
            }}
            onClick={handleAvatar}
          >
            <Avatar>
              <Image
                src={`/avatars/${employee.name}.webp`}
                width={24}
                height={24}
              />
            </Avatar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: "30px",
                lineHeight: "0",
                minHeight: "18px",
              }}
            >
              Me
              <Carrot style={{ marginBottom: "3px" }}>
                <Image src="/carrot.svg" width={11} height={8} />
              </Carrot>
            </div>
          </div>
          <DropDown hideDropdown={hideDropdown}>
            <Link href="/">
              <div
                style={{
                  textAlign: "center",
                  color: "#666",
                  padding: "13px 20px",
                  fontSize: "15px",
                }}
              >
                Welcome <strong>{employee.name}</strong>
              </div>
            </Link>
            <div
              style={{
                padding: "19px 20px 12px",
                borderTop: "1px solid #DDD",
              }}
            >
              <Link href="add">
                <Li link={true}>Create Poll</Li>
              </Link>
            </div>
            <div
              style={{
                padding: "12px 20px 12px",
              }}
            >
              <Link href="leaderboard">
                <Li link={true}>Leaderboard</Li>
              </Link>
            </div>
            <div
              style={{
                padding: "12px 20px 19px",
              }}
            >
              <Link href="trending">
                <Li link={true}>Trending</Li>
              </Link>
            </div>
            <div
              style={{
                borderTop: "1px solid #DDD",
                padding: "13px 20px",
              }}
            >
              <Link href="signIn">
                <Li
                  style={{
                    textAlign: "center",
                    color: "#777",
                    fontSize: "15px",
                  }}
                  link={true}
                >
                  Employee Select
                </Li>
              </Link>
            </div>
          </DropDown>
        </NavAuth>
      </Nav>
    </>
  );
};

const Avatar = styled.div`
  pointer: cursor;
  border-radius: 100%;
  width: 26px;
  height: 26px;
`;

const Carrot = styled.div`
  cursor: pointer;
  border-radius: 50%;
  margin-left: 2px;
`;

const Li = styled.div`
  background: none;
  border: none;
  text-transform: none;
  color: #666;
  ${(props) =>
    props.link &&
    css`
      cursor: pointer;

      :hover {
        text-decoration: underline;
      }
    `}
  text-align: left;
  ${(props) => {
    props.active && "font-weight: 500;";
  }}
`;

const DropDown = styled.div`
  background-color: white;
  filter: drop-shadow(0px 2px 6px rgba(136, 136, 136, 0.35));
  color: #555;
  display: ${(props) => (props.hideDropdown ? "none" : "flex")};
  opacity: ${(props) => (props.hideDropdown ? "0" : "1")};
  width: 270px;
  position: absolute;
  right: 4%;
  top: 4.2rem;
  z-index: 1001;
  text-align: left;
  border-radius: 8px;
  font-weight: 400;
  @media (max-width: 897px) {
    width: 175px;
  }
  -webkit-transition: opacity 0.15s ease-out;
  -moz-transition: opacity 0.15s ease-out;
  -o-transition: opacity 0.15s ease-out;
  transition: opacity 0.15s ease-out;
  min-height: 140px;
  justify-content: space-between;
  flex-direction: column;
`;

const NavAuth = styled.div`
  align-items: center;
  flex-direction: row;
  display: flex;
`;

const Nav = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  width: 90%;
  background-color: #fcfcfc;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  color: #333;
  height: 4.5rem;
  padding: 0 5%;
`;

export default Navbar;
