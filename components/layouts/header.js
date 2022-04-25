import styled, { css } from "styled-components";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const node = useRef();
  const [hideDropdown, setHideDropdown] = useState(true);
  const [shadow, setShadow] = useState(true);
  const employee = useSelector((state) => state["employee"]);

  useEffect(() => {
    if (router.pathname == "/trending") {
      setShadow(false);
    } else {
      setShadow(true);
    }
  }, [router]);

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
      <Nav className={`nav`} shadow={shadow}>
        <Link href="/">
          <a>
            <Svg
              width="62"
              height="54"
              viewBox="0 0 62 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6_14)">
                <path
                  d="M32.3404 53.2982V0H0.413303V5.7254H25.9343V23.7344H2.06649V29.4598H25.9343V47.5728H0V53.2982H32.3404Z"
                  fill="#2777C1"
                />
                <path
                  d="M26.1466 53.2982V26.6491V0H44.0216C48.1718 0 51.5643 0.754711 54.199 2.26413C56.851 3.75621 58.8142 5.77745 60.0885 8.32785C61.3628 10.8783 62 13.7236 62 16.8639C62 20.0042 61.3628 22.8582 60.0885 25.426C58.8314 27.9937 56.8855 30.041 54.2507 31.5678C51.6159 33.0772 48.2407 33.8319 44.1249 33.8319H31.3128V28.1065H43.9183C46.7597 28.1065 49.0414 27.612 50.7635 26.6231C52.4856 25.6342 53.7341 24.2982 54.509 22.6153C55.3012 20.915 55.6972 18.9979 55.6972 16.8639C55.6972 14.7299 55.3012 12.8214 54.509 11.1385C53.7341 9.45558 52.477 8.137 50.7377 7.18277C48.9984 6.21119 46.6908 5.7254 43.815 5.7254H32.5526V53.2982H26.1466Z"
                  fill="#2777C1"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_14">
                  <rect width="62" height="54" fill="white" />
                </clipPath>
              </defs>
            </Svg>
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
                  padding: "15px 20px",
                  fontSize: "15px",
                }}
              >
                Welcome <strong>{employee.name}</strong>
              </div>
            </Link>
            <div
              style={{
                padding: "22px 20px 12px",
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
                padding: "12px 20px 22px",
              }}
            >
              <Link href="trending">
                <Li link={true}>Trending</Li>
              </Link>
            </div>
            <div
              style={{
                borderTop: "1px solid #DDD",
                padding: "15px 20px",
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
const Svg = styled.svg`
  width: 35px;

  :hover {
    path {
      fill: #2268a9;
    }
  }
`;

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
  display: ${(props) => (props.hideDropdown ? "none" : "flex")};
  opacity: ${(props) => (props.hideDropdown ? "0" : "1")};
  width: 270px;
  position: absolute;
  right: 4%;
  top: 4.2rem;
  z-index: 1000;
  text-align: left;
  border-radius: 8px;
  font-weight: 400;
  @media (max-width: 897px) {
    width: 240px;
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
  z-index: 500;
  width: 90%;
  background-color: #fcfcfc;

  color: #333;
  height: 4.5rem;
  padding: 0 5%;
  ${(props) =>
    props.shadow &&
    css`
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); ;
    `}
`;

export default Navbar;
