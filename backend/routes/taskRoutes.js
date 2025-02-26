const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTodos);
router.post("/", protect, createTodo);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

module.exports = router;
