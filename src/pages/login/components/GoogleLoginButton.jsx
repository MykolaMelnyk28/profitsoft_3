import IconButton from "components/IconButton";
import GoogleIcon from "@mui/icons-material/Google";
import config from "config";

export function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = config.OAUTH2_GOOGLE_AUTHORIZATION_URL;
  };

  return (
    <IconButton
      onClick={handleLogin}
      sx={{
        width: 72,
        height: 72,
        border: "1px solid",
        borderColor: "grey.300",
        backgroundColor: "#fff",
        boxShadow: 2,
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "grey.100",
          transform: "scale(1.05)",
        },
      }}
    >
      <GoogleIcon sx={{ fontSize: 40, color: "#DB4437" }} />
    </IconButton>
  );
}
