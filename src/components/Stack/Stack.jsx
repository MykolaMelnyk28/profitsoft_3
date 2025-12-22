import StackMUI from "@mui/material/Stack";

function Stack({
    children,
    direction,
    justifyContent,
    alignItems,
    spacing,
}) {
    return (
        <StackMUI
            direction={direction}
            justifyContent={justifyContent}
            alignItems={alignItems}
            spacing={spacing}
        >
            {children}
        </StackMUI>
    );
}

export default Stack;