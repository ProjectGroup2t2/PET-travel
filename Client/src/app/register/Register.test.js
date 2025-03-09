import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../register/page.jsx";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("axios");

describe("Register component", () => {
  test("displays error message when password and confirm password do not match", async () => {
    
    render(<Register />);

    await userEvent.type(screen.getByPlaceholderText("USERNAME"), "testuser");
    await userEvent.type(screen.getByPlaceholderText("EMAIL"), "test@example.com");
    await userEvent.type(screen.getByPlaceholderText("PASSWORD"), "password123");
    await userEvent.type(screen.getByPlaceholderText("CONFIRM PASSWORD"), "differentpassword");
    await userEvent.click(screen.getByText("REGISTER"));

    expect(screen.getByText("Passwords do not match!")).toBeInTheDocument();
  });
});