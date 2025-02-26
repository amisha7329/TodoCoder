import { Paper, Typography, Avatar, Box, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import "@fontsource/nunito";
import "@fontsource/dangrek";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:900px)");

  return (
    <Paper
      elevation={5}
      sx={{
        p: isSmallScreen ? 2 : 5,
        px: isSmallScreen ? 2 : 3,
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 3,
        bgcolor: "transparent",
        background: "rgb(25, 25, 28)",
        textAlign: isSmallScreen ? "center" : "left",
      }}
    >
      <Typography
        sx={{
          fontFamily: "nunito, sans-serif",
          fontSize: isSmallScreen ? "1.5rem" : isMediumScreen ? "1.8rem" : "2rem",
          fontWeight: 600,
          color: "white",
          letterSpacing: "2.5px",
          textTransform: "capitalize",
        }}
      >
        Your Todo List
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          gap: isSmallScreen ? 1 : 3,
          mt: isSmallScreen ? 2 : 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isSmallScreen ? 0.5 : 1,
          }}
        >
          {user?.profilePic && (
            <Avatar
              src={user.profilePic}
              alt={user.name}
              sx={{
                width: isSmallScreen ? 35 : 48,
                height: isSmallScreen ? 35 : 48,
              }}
            />
          )}
          <Typography
            sx={{
              fontFamily: "Dangrek, sans-serif",
              fontSize: isSmallScreen ? "1rem" : "1.5rem",
              letterSpacing: "2px",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            {user?.name}
          </Typography>
        </Box>
        <PowerSettingsNewIcon
          sx={{
            fontSize: isSmallScreen ? "28px" : "35px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        />
      </Box>
    </Paper>
  );
};

export default Header;
