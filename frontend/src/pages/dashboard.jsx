import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTasks } from "../redux/taskSlice";
import { loginSuccess } from "../redux/authSlice";
import Header from "../components/header";
import TaskList from "../components/taskList";
import TaskForm from "../components/taskForm";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PropagateLoader } from "react-spinners";

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const jwt = useSelector((state) => state.auth.jwt);

  const fetchTasks = async (token) => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setTasks(response.data));
    } catch (error) {
      console.error("Error fetching tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userString = params.get("user");

    if (token && userString) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userString));
        dispatch(loginSuccess({ user: parsedUser, token }));
        window.history.replaceState({}, document.title, "/dashboard");
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/");
      }
    } else {
      if (!jwt || !user) {
        navigate("/");
        return;
      }
    }

    if (jwt) {
      fetchTasks(jwt);
    }
  }, [dispatch, navigate, jwt, user]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Grid container spacing={0.5} sx={{ mt: 0.5, flexGrow: 1 }}>
        <Grid size={{ xs: 12, md: 8, lg: 8 }} sx={{ display: "flex", flexDirection: "column" }}>
          {/* <Box
            sx={{
              background: "linear-gradient(90deg, rgb(44, 47, 51), rgb(25, 25, 28))",
              borderRadius: "12px",
              p: 3,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              flex: 1,
              minHeight: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          > */}
            {isLoading ? (
              <Box
              sx={{
                background: "linear-gradient(90deg, rgb(44, 47, 51), rgb(25, 25, 28))",
                borderRadius: "12px",
                p: 3,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                flex: 1,
                minHeight: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PropagateLoader color="rgb(51, 78, 109)" size={15} />
          </Box>

            ) : (
              <Box
            sx={{
              background:
                "linear-gradient(90deg, rgb(44, 47, 51), rgb(25, 25, 28))",
              borderRadius: "12px",
              p: 3,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              flex: 1,
            }}
          >
              <TaskList setIsEditing={setIsEditing} />
          </Box>
            
            )}
          {/* </Box> */}
        </Grid>

        <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              background: "linear-gradient(90deg, rgb(44, 47, 51), rgb(25, 25, 28))",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              flex: 1,
              display: "flex",
              p: 3,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TaskForm isEditing={isEditing} setIsEditing={setIsEditing} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
