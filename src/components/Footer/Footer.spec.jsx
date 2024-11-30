import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";


describe("Footer component", () => {
    test('render component', async () => {
        render(<Footer />)
        const footer = await screen.findByTestId('footer')
        expect(footer).toBeInTheDocument();
    })
    test("check footer text", async () => {
        render(<Footer />)
        const footer = await screen.findByTestId('footer')
        expect(footer.textContent).toBe("© rights belongs to me.");
    })
})