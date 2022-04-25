import { render } from "@testing-library/react";
import Home from "../pages/index";

describe("Renders home page", () => {
  it("home render should match snapshot", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
