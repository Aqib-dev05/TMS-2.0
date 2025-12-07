import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const sampleTasks = {
  "e1@example.com": [
    {
      title: "Design login page",
      description: "Create responsive login UI for employees",
      status: "active",
      dueDate: "2025-06-20",
    },
    {
      title: "Fix navbar issue",
      description: "Navbar not responsive on mobile",
      status: "new",
      dueDate: "2025-06-21",
    },
    {
      title: "Push code to GitHub",
      description: "Upload all project files",
      status: "completed",
      dueDate: "2025-06-19",
    },
  ],
  "e2@example.com": [
    {
      title: "Write documentation",
      description: "Explain API usage and routes",
      status: "new",
      dueDate: "2025-06-22",
    },
    {
      title: "Create project README",
      description: "Add instructions, images, and badges",
      status: "completed",
      dueDate: "2025-06-18",
    },
    {
      title: "Update user flow diagram",
      description: "Reflect latest features",
      status: "failed",
      dueDate: "2025-06-20",
    },
    {
      title: "Clean up CSS",
      description: "Remove unused classes",
      status: "active",
      dueDate: "2025-06-23",
    },
  ],
  "e3@example.com": [
    {
      title: "Optimize queries",
      description: "Improve DB read speed",
      status: "completed",
      dueDate: "2025-06-19",
    },
    {
      title: "Integrate payment gateway",
      description: "Setup Stripe API integration",
      status: "active",
      dueDate: "2025-06-24",
    },
    {
      title: "Fix deployment error",
      description: "Resolve Vercel build issue",
      status: "failed",
      dueDate: "2025-06-20",
    },
  ],
  "e4@example.com": [
    {
      title: "Create dark mode",
      description: "Add toggle and styling",
      status: "new",
      dueDate: "2025-06-24",
    },
    {
      title: "Fix mobile menu",
      description: "Hamburger not opening",
      status: "active",
      dueDate: "2025-06-23",
    },
    {
      title: "Add animations",
      description: "Use Framer Motion for transitions",
      status: "completed",
      dueDate: "2025-06-18",
    },
    {
      title: "Check responsiveness",
      description: "Test layout on various screens",
      status: "completed",
      dueDate: "2025-06-22",
    },
    {
      title: "Refactor code",
      description: "Break components properly",
      status: "failed",
      dueDate: "2025-06-20",
    },
  ],
  "e5@example.com": [
    {
      title: "Create admin dashboard",
      description: "Stats, task table, filters",
      status: "new",
      dueDate: "2025-06-24",
    },
    {
      title: "Secure login",
      description: "Add input validation and localStorage protection",
      status: "active",
      dueDate: "2025-06-23",
    },
    {
      title: "Test forms",
      description: "Test Formspree integration",
      status: "completed",
      dueDate: "2025-06-21",
    },
    {
      title: "Bug: task assign issue",
      description: "Fix assign-to-employee dropdown",
      status: "failed",
      dueDate: "2025-06-20",
    },
  ],
};

const rawUsers = [
  { email: "admin@example.com", role: "admin", name: "Admin" },
  ...Array.from({ length: 5 }, (_, idx) => ({
    email: `e${idx + 1}@example.com`,
    role: "employee",
    name: `Employee ${idx + 1}`,
  })),
];

const seedUsers = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await User.deleteMany();

    const password =
      process.env.SEED_ADMIN_PASSWORD ||
      process.env.DEFAULT_USER_PASSWORD ||
      "123";

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultSecretKey = "secret123";

    const usersToInsert = rawUsers.map((user) => ({
      name: user.name,
      email: user.email,
      role: user.role,
      password: hashedPassword,
      secretKey: defaultSecretKey,
      tasks: sampleTasks[user.email] || [],
    }));

    await User.insertMany(usersToInsert);
    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedUsers();

