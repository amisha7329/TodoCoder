import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addTask, updateTask } from "../redux/taskSlice";
import AddIcon from "@mui/icons-material/Add";

const TaskForm = ({ isEditing, setIsEditing }) => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({ name: "", description: "" });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    if (isEditing) {
      setTaskData({ name: isEditing.name, description: isEditing.description });
      setErrors({ name: "", description: "" });
    } else {
      setTaskData({ name: "", description: "" });
    }
  }, [isEditing]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!taskData.name.trim()) newErrors.name = "Task name is required!";
    else if (taskData.name.trim().length < 3)
      newErrors.name = "Must be at least 3 characters!";

    if (!taskData.description.trim())
      newErrors.description = "Description is required!";
    else if (taskData.description.trim().length < 3)
      newErrors.description = "Must be at least 3 characters!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("jwt");

    try {
      if (isEditing) {
        const response = await axios.put(
          `${API_BASE_URL}/api/todos/${isEditing._id}`,
          taskData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(updateTask(response.data));
        setIsEditing(null);
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/api/todos`,
          taskData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addTask(response.data));
      }
      setTaskData({ name: "", description: "" });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };
  const handleCancel = () => {
    setTaskData({ name: "", description: "" });
    setErrors({ name: "", description: "" });
    setIsEditing(null);
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        background: "linear-gradient(90deg, rgb(51, 78, 109), rgb(25, 25, 28))",
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        position: "relative",
      }}
    >
      {isEditing && (
        <IconButton
          onClick={() => setIsEditing(null)}
          sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      )}

      <Typography
        sx={{
          fontFamily: "Dangrek, sans-serif",
          fontSize: "2rem",
          letterSpacing: "1px",
          color: "white",
          textTransform: "capitalize",
        }}
      >
        {isEditing ? "Edit Task" : "Add Task"}
      </Typography>

      <TextField
        label="Task Name"
        name="name"
        value={taskData.name}
        onChange={handleChange}
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
        sx={{
          backgroundColor: "rgb(26, 39, 54)",
          borderRadius: "6px",
          "& .MuiInputBase-input": { color: "white", fontSize: "20px" },
          "& .MuiInputLabel-root": { color: "white" },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
          },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#999" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#666",
          },
        }}
      />

      <TextField
        label="Description"
        name="description"
        value={taskData.description}
        onChange={handleChange}
        fullWidth
        error={!!errors.description}
        helperText={errors.description}
        sx={{
          backgroundColor: "rgb(26, 39, 54)",
          borderRadius: "6px",
          "& .MuiInputBase-input": { color: "white", fontSize: "20px" },
          "& .MuiInputLabel-root": { color: "white" },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
          },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#999" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#666",
          },
        }}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          sx={{
            background: "rgb(26, 39, 54)",
            color: "white",
            "&:hover": { background: "rgb(93, 122, 154)" },
            flex: 1,
          }}
          onClick={handleSubmit}
        >
          <Typography
            sx={{
              fontFamily: "Dangrek, sans-serif",
              fontSize: "1.2rem",
              letterSpacing: "1px",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            {isEditing ? "Update Task" : "Add Task"}
          </Typography>
        </Button>

        <Button
          variant="outlined"
          sx={{
            background: "rgb(26, 39, 54)",
            color: "white",
            "&:hover": { background: "#d32f2f" },
            flex: 1,
          }}
          onClick={handleCancel}
        >
          <Typography
            sx={{
              fontFamily: "Dangrek, sans-serif",
              fontSize: "1.2rem",
              letterSpacing: "1px",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            Cancel
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
