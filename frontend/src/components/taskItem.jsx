import {
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import "@fontsource/nunito";
import "@fontsource/dangrek";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteTask } from "../redux/taskSlice";

const TaskItem = ({ task, setIsEditing }) => {
  const dispatch = useDispatch();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:900px)");
  const isLargeScreen = useMediaQuery("(max-width:1200px)");

  const handleDelete = async () => {
    const token = localStorage.getItem("jwt");
    try {
      await axios.delete(`${API_BASE_URL}/api/todos/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteTask(task._id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!task) return null;

  return (
    <Card
      elevation={5}
      sx={{
        borderRadius: 3,
        p: isSmallScreen ? 1 : 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(90deg, rgb(51, 78, 109), rgb(25, 25, 28))",
      }}
    >
      <Box
        sx={{
          width: isSmallScreen ? 35 : 50,
          height: isSmallScreen ? 35 : 50,
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, rgb(30, 30, 30), rgb(50, 50, 50))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: isSmallScreen ? "18px" : "25px",
        }}
      >
        {task.index}
      </Box>

      <CardContent sx={{ flex: 1, ml: isSmallScreen ? 1 : 2 }}>
        <Typography
          sx={{
            fontFamily: "Dangrek, sans-serif",
            fontSize: isSmallScreen
              ? "1.3rem"
              : isMediumScreen
              ? "1.7rem"
              : "2rem",
            letterSpacing: "1px",
            color: "white",
            textTransform: "capitalize",
            textShadow: "1px 1px 10px rgba(0,0,0,0.5)",
          }}
        >
          {task.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "nunito, sans-serif",
            fontSize: isSmallScreen
              ? "0.8rem"
              : isMediumScreen
              ? "0.9rem"
              : "1rem", // ✅ Reduce description size
            fontWeight: 600,
            color: "rgb(147, 147, 148)",
            textTransform: "capitalize",
          }}
        >
          {task.description}
        </Typography>
      </CardContent>

      <Box>
        <Edit
          sx={{
            fontSize: isSmallScreen ? "1.5rem" : "2rem",
            mx: 2,
            color: "#B0BEC5",
            cursor: "pointer",
          }}
          onClick={() => setIsEditing(task)}
          color="primary"
        />
        <Delete
          sx={{
            fontSize: isSmallScreen ? "1.5rem" : "2rem",
            cursor: "pointer",
          }}
          onClick={handleDelete}
          color="error"
        />
      </Box>
    </Card>
  );
};

export default TaskItem;
