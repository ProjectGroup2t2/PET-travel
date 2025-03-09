import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "../components/Login";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Page", () => {
  let setItemSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    setItemSpy = jest.spyOn(Storage.prototype, "setItem"); // ✅ ใช้ spyOn แทน mock
  });

  test("แสดงฟอร์ม Login และสามารถกรอกข้อมูลได้", async () => {
    await act(async () => {
      render(<Login />);
    });

    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const loginButton = screen.getByTestId("login-button");

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
            user: { username: "yim", roles: "User" },
          }),
      })
    );

    await act(async () => {
      render(<Login />);
    });

    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const loginButton = screen.getByTestId("login-button");

    await act(async () => {
      await userEvent.type(usernameInput, "yim");
      await userEvent.type(passwordInput, "123456");
    });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    console.log("FETCH CALLS:", fetch.mock.calls);

    expect(fetch).toHaveBeenCalledWith("http://localhost:1337/api/auth/local", expect.any(Object));

    await act(async () => new Promise((resolve) => setTimeout(resolve, 100)));

    console.log("LOCAL STORAGE CALLS:", setItemSpy.mock.calls);

    expect(setItemSpy).toHaveBeenCalledWith("jwt", "fake-jwt-token");
    expect(setItemSpy).toHaveBeenCalledWith(
      "user",
      JSON.stringify({ username: "yim", roles: "User" })
    );

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  test("Login ล้มเหลวและแสดง error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            error: { message: "Invalid credentials" },
          }),
      })
    );

    await act(async () => {
      render(<Login />);
    });

    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const loginButton = screen.getByTestId("login-button");

    await act(async () => {
      await userEvent.type(usernameInput, "yim");
      await userEvent.type(passwordInput, "wrongpass");
    });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    await act(async () => new Promise((resolve) => setTimeout(resolve, 100)));

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });
});
