import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import Logout from "../components/Logout/logout";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it("navigates to '/' after successful logout", async () => {
  const { getByText } = render(<Logout />);
  const logoutButton = getByText("Logout");

  await act(async () => {
    fireEvent.click(logoutButton);
  });

  expect(require("react-router-dom").useNavigate).toHaveBeenCalledWith();
});

it("navigates to '/' after successful logout", async () => {
  const { getByText } = render(<Logout />);
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
  });

  const logoutButton = getByText("Logout");

  await act(async () => {
    fireEvent.click(logoutButton);
  });

  expect(require("react-router-dom").useNavigate).toHaveBeenCalledWith();
});
