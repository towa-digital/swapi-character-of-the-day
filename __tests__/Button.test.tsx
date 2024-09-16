import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/ui/Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  test("renders with provided label and icon", () => {
    const label = "Test Button";
    const iconText = "Icon";
    const icon = <span data-testid="icon">{iconText}</span>;

    render(<Button label={label} icon={icon} />);

    // Verify that the label is rendered (considering screen-reader-only classes)
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();

    // Verify that the icon is rendered
    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveTextContent(iconText);
  });

  test("calls onPress handler when Button is clicked", () => {
    const handlePress = jest.fn();
    const label = "Click Me";
    const icon = <span>Icon</span>;

    render(<Button label={label} icon={icon} onPress={handlePress} />);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
