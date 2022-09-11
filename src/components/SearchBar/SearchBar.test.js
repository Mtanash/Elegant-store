import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

describe("SearchBar component", () => {
  test("should render search bar", async () => {
    const history = createMemoryHistory();
    // render(
    //   <Router location={history.location} navigator={history}>
    //     <SearchBar />
    //   </Router>
    // );
    render(<SearchBar />, { wrapper: MemoryRouter });

    const user = userEvent.setup();
    await user.click(screen.getByTestId("searchbar-icon"));
    // screen.getByTestId("searchbar-input").val
    await user.keyboard("Enter");
    // expect(screen.getByTestId("searchbar-form")).toBeVisible();
    // expect(screen.getByTestId("searchbar-input")).not.toBeVisible();
    // expect(screen.getByTestId("searchbar-input")).toBeInTheDocument();
  });
});
