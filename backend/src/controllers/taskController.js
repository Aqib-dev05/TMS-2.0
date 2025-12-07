import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";

const publicUserFields = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const getTasks = asyncHandler(async (req, res) => {
  const { role, _id } = req.user;
  const { userId } = req.query;

  const targetUserId = role === "admin" && userId ? userId : _id;
  const user = await User.findById(targetUserId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    owner: publicUserFields(user),
    tasks: user.tasks,
  });
});

export const createTask = asyncHandler(async (req, res) => {
  const { employeeId, title, description = "", dueDate, status = "new" } =
    req.body;

  if (!employeeId || !title) {
    res.status(400);
    throw new Error("Employee and title are required");
  }

  const employee = await User.findById(employeeId);
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  const task = {
    title,
    description,
    dueDate,
    status,
  };

  employee.tasks.push(task);
  await employee.save();

  res.status(201).json({
    message: "Task created",
    task: employee.tasks.at(-1),
  });
});

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { role, _id } = req.user;
  const { status, employeeId } = req.body;
  const { taskId } = req.params;

  if (!status) {
    res.status(400);
    throw new Error("Status is required");
  }

  const targetUserId = role === "admin" && employeeId ? employeeId : _id;
  const user = await User.findById(targetUserId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const task = user.tasks.id(taskId);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  task.status = status;
  await user.save();

  res.json({ message: "Task status updated", task });
});

export const getTeamSnapshot = asyncHandler(async (req, res) => {
  const employees = await User.find({ role: "employee" });

  const summary = employees.map((employee) => {
    const counts = employee.tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      { new: 0, active: 0, completed: 0, failed: 0 }
    );

    const fallbackName = employee.email.split("@")[0];
    const name = employee.name || fallbackName;

    return {
      name,
      email: employee.email,
      userId: employee._id,
      newTask: counts.new,
      active: counts.active,
      completed: counts.completed,
      failed: counts.failed,
    };
  });

  res.json({ team: summary });
});

