import App from "../App";
import { render, screen } from "@testing-library/react";


// Mock the Header component
// jest.mock('../components/Header', () => ({
//     Header: () => <div data-testid="header-mock">Mocked Header</div>,
// }));

jest.mock('../components/Header', () => ({
    __esModule: true,
    default: () => <div data-testid="header-mock">Mocked Header</div>,
}));

jest.mock('../components/Footer', () => ({
    __esModule: true,
    default: () => <div data-testid="footer-mock">Mocked Footer</div>,
}));

jest.mock('../routes/private/Menu', () => ({
    __esModule: true,
    default: () => <div data-testid="menu-mock">Mocked Menu</div>,
}));

describe("App component", () => {
    test("render component", async () => {
        render(<App />)
        const appRef = await screen.getByTestId("app")
        expect(appRef).toBeInTheDocument()
    })
    test(" render Heder , footer , menu component", async () => {
        render(<App />)
        const headerRef = await screen.getByTestId("header-mock")
        expect(headerRef.textContent).toBe("Mocked Header")
        const footerRef = await screen.getByTestId("footer-mock")
        expect(footerRef.textContent).toBe("Mocked Footer")
        const menuRef = await screen.getByTestId("menu-mock")
        expect(menuRef.textContent).toBe("Mocked Menu")
    })
})