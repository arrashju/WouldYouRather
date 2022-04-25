import styled from "styled-components";

const Logo = () => {
  return (
    <>
      <Svg
        width="62"
        height="54"
        viewBox="0 0 62 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_6_14)">
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

export default Logo;
