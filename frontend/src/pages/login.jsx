import { Button, Typography, Paper, Box } from "@mui/material";
import { Google } from "@mui/icons-material";

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(90deg, rgb(51, 78, 109), rgb(25, 25, 28))",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 5,
          borderRadius: 3,
          width: 350,
          textAlign: "center",
          bgcolor: "rgb(25, 25, 28)",
          color: "white",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Dangrek, sans-serif",
            fontSize: "2rem",
            letterSpacing: "1px",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          Login to Todo List
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handleGoogleLogin}
          sx={{
            mt: 5,
            background: "#f0f0f0",
            color: "black",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 500,
            borderRadius: "30px",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            padding: "10px 15px",
            "&:hover": { background: "white" },
          }}
        >
          <Google sx={{ color: "#4285F4", fontSize: "24px" }} />
          Sign in with Google
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
