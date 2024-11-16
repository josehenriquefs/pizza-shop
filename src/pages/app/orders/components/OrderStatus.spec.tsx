import { render } from "@testing-library/react";
import { OrderStatus } from "./OrderStatus";

describe("OrderStatus", () => {
  it("should display Pendente", () => {
    /* Pendente*/
    const wrapper = render(<OrderStatus status="pending" />);

    const statusText = wrapper.getByText("Pendente");
    const badgeElement = wrapper.getByTestId("badge");

    console.log(badgeElement.outerHTML);

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-foreground");
  });

  it("should display Cancelado", () => {
    /* Cancelado*/
    const wrapper = render(<OrderStatus status="canceled" />);

    const statusText = wrapper.getByText("Cancelado");
    const badgeElement = wrapper.getByTestId("badge");

    console.log(badgeElement.outerHTML);

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-rose-500");
  });

  it("should display Em preparo", () => {
    /* Em preparo */
    const wrapper = render(<OrderStatus status="processing" />);

    const statusText = wrapper.getByText("Em preparo");
    const badgeElement = wrapper.getByTestId("badge");

    console.log(badgeElement.outerHTML);

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  it("should display Em entrega", () => {
    /* Em entrega*/
    const wrapper = render(<OrderStatus status="delivering" />);

    const statusText = wrapper.getByText("Em entrega");
    const badgeElement = wrapper.getByTestId("badge");

    console.log(badgeElement.outerHTML);

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-blue-500");
  });

  it("should display Entregue", () => {
    /* Entregue*/
    const wrapper = render(<OrderStatus status="delivered" />);

    const statusText = wrapper.getByText("Entregue");
    const badgeElement = wrapper.getByTestId("badge");

    console.log(badgeElement.outerHTML);

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });
});
