import Button from "components/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from "components/Stack";
import Divider from "components/Divider";
import { useLocation, useNavigate } from "react-router-dom";

function BackButtonPageContainer({ children, _defaultPage = '/' }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleBack = () => {
        const from = location.state?.from;
        navigate(from ?? _defaultPage);
    };

    return (
        <Stack spacing={2} >
            <Button onClick={handleBack}>
                <ArrowBackIcon />
            </Button>

            <Divider />

            {children}
        </Stack>
    );
}

export default BackButtonPageContainer;