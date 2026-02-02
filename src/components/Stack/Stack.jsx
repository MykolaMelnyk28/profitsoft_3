import StackMUI from "@mui/material/Stack";

function Stack({
    children,
    direction,
    justifyContent,
    alignItems,
    spacing,
    sx,
}) {
    return (
        <StackMUI
            direction={direction}
            justifyContent={justifyContent}
            alignItems={alignItems}
            spacing={spacing}
            sx={sx}
        >
            {children}
        </StackMUI>
    );
}

export default Stack;