import { Box,Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TaskItem from "./taskItem"; 
import Grid from '@mui/material/Grid2';

const TaskList = ({setIsEditing}) => {
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <Box sx={{
      maxHeight: "70vh",
      overflowY: "auto",
      pr: 1,
    
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "rgba(100, 100, 100, 0.3)",
        borderRadius: "10px",
      },
      "&:hover::-webkit-scrollbar-thumb": {
        background: "rgba(118, 116, 116, 0.6)",
      },
    }}>
      {tasks.length === 0 ? (
        <Typography
        sx={{
          fontFamily: "Dangrek, sans-serif",
          fontSize: "2rem",
          letterSpacing: "1px",
          color: "white",
          textTransform: "capitalize",
          textShadow: "1px 1px 10px rgba(0,0,0,0.5)" ,
          display:"flex",
          justifyContent:"center",
        }}
      >No tasks found.</Typography>
      ) : (
        <Grid container spacing={2.5} >
          {tasks.map((task, index) => (
            <Grid size={{ xs: 12, md: 12, lg:12 }} key={task._id}>
              <TaskItem setIsEditing={setIsEditing} task={{ ...task, index: index + 1 }} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TaskList;
