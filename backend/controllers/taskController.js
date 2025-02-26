const Tasks = require("../models/taskModel");

const getTodos = async (req, res) => {
  try {
    const todos = await Tasks.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { name, description } = req.body;
    const todo = new Tasks({ name, description, userId: req.user.id });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Tasks.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    await Tasks.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
