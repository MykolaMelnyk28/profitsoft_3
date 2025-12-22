import Stack from "components/Stack";
import Typography from "components/Typography";

function Property({ label, value }) {
    return (
        <>
            <Stack
                direction="row"
                spacing={2}
            >
                <Typography variant="default">
                    {label}:
                </Typography>
                <Typography variant="default" color="text.secondary">
                    {value}
                </Typography>
            </Stack>
        </>
    );
}

export default Property;