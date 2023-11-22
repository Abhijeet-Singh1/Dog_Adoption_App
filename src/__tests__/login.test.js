import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Login from "../components/Login/login";
import { useNavigate } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Login component", () => {
  it("renders without crashing", () => {
    render(<Login />);
  });

  it("submits the form with valid data", async () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    const { getByPlaceholderText, getByText } = render(<Login />);
    const nameInput = getByPlaceholderText("Name");
    const emailInput = getByPlaceholderText("Email");
    const loginButton = getByText("Login");

    fetch.mockResolvedValueOnce({
      ok: true,
    });

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Abhijeet" } });
      fireEvent.change(emailInput, { target: { value: "abhijeet@gmail.com" } });
      fireEvent.click(loginButton);
      await Promise.resolve();
    });

    expect(navigateMock).toHaveBeenCalledWith("/home");
    fetch.mockReset();
  });
});
