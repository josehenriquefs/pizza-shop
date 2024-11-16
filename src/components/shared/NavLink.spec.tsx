import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavLink } from "./NavLink";

describe("Navlink", () => {
  it("should highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/orders">Pedidos</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/orders"]}>{children}</MemoryRouter>
          );
        },
      },
    );

    expect(wrapper.getByText("Dashboard").dataset.current).toEqual("false");
    expect(wrapper.getByText("Pedidos").dataset.current).toEqual("true");

    wrapper.debug();
  });
});
