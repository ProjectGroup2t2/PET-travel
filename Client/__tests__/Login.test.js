import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Page", () => {
  test("แสดงฟอร์ม Login และสามารถกรอกข้อมูลได้", async () => {
    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("USERNAME");
    const passwordInput = screen.getByPlaceholderText("PASSWORD");
    const loginButton = screen.getByText("LOGIN");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    await userEvent.type(usernameInput, "yim");
    await userEvent.type(passwordInput, "123456");

    expect(usernameInput.value).toBe("yim");
    expect(passwordInput.value).toBe("123456");
  });

  test("Login สำเร็จและเปลี่ยนเส้นทางไปหน้าแรก", async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            jwt: "fake-jwt-token",
            user: { username: "yim" },
          }),
      })
    );

    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("USERNAME");
    const passwordInput = screen.getByPlaceholderText("PASSWORD");
    const loginButton = screen.getByText("LOGIN");

    await userEvent.type(usernameInput, "yim");
    await userEvent.type(passwordInput, "123456");

    fireEvent.click(loginButton);

    expect(fetch).toHaveBeenCalledWith("http://localhost:1337/api/auth/local", expect.any(Object));

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
