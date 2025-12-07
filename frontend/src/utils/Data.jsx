const Employees = [
    {
        "id": 1,
        "email": "e1@example.com",
        "password": "123",
        "tasks": [
            {
                "title": "Design login page",
                "description": "Create responsive login UI for employees",
                "status": "active",
                "date": "2025-06-20"
            },
            {
                "title": "Fix navbar issue",
                "description": "Navbar not responsive on mobile",
                "status": "new",
                "date": "2025-06-21"
            },
            {
                "title": "Push code to GitHub",
                "description": "Upload all project files",
                "status": "completed",
                "date": "2025-06-19"
            }
        ]
    },
    {
        "id": 2,
        "email": "e2@example.com",
        "password": "123",
        "tasks": [
            {
                "title": "Write documentation",
                "description": "Explain API usage and routes",
                "status": "new",
                "date": "2025-06-22"
            },
            {
                "title": "Create project README",
                "description": "Add instructions, images, and badges",
                "status": "completed",
                "date": "2025-06-18"
            },
            {
                "title": "Update user flow diagram",
                "description": "Reflect latest features",
                "status": "failed",
                "date": "2025-06-20"
            },
            {
                "title": "Clean up CSS",
                "description": "Remove unused classes",
                "status": "active",
                "date": "2025-06-23"
            }
        ]
    },
    {
        "id": 3,
        "email": "e3@example.com",
        "password": "123",
        "tasks": [
            {
                "title": "Optimize queries",
                "description": "Improve DB read speed",
                "status": "completed",
                "date": "2025-06-19"
            },
            {
                "title": "Integrate payment gateway",
                "description": "Setup Stripe API integration",
                "status": "active",
                "date": "2025-06-24"
            },
            {
                "title": "Fix deployment error",
                "description": "Resolve Vercel build issue",
                "status": "failed",
                "date": "2025-06-20"
            }
        ]
    },
    {
        "id": 4,
        "email": "e4@example.com",
        "password": "123",
        "tasks": [
            {
                "title": "Create dark mode",
                "description": "Add toggle and styling",
                "status": "new",
                "date": "2025-06-24"
            },
            {
                "title": "Fix mobile menu",
                "description": "Hamburger not opening",
                "status": "active",
                "date": "2025-06-23"
            },
            {
                "title": "Add animations",
                "description": "Use Framer Motion for transitions",
                "status": "completed",
                "date": "2025-06-18"
            },
            {
                "title": "Check responsiveness",
                "description": "Test layout on various screens",
                "status": "completed",
                "date": "2025-06-22"
            },
            {
                "title": "Refactor code",
                "description": "Break components properly",
                "status": "failed",
                "date": "2025-06-20"
            }
        ]
    },
    {
        "id": 5,
        "email": "e5@example.com",
        "password": "123",
        "tasks": [
            {
                "title": "Create admin dashboard",
                "description": "Stats, task table, filters",
                "status": "new",
                "date": "2025-06-24"
            },
            {
                "title": "Secure login",
                "description": "Add input validation and localStorage protection",
                "status": "active",
                "date": "2025-06-23"
            },
            {
                "title": "Test forms",
                "description": "Test Formspree integration",
                "status": "completed",
                "date": "2025-06-21"
            },
            {
                "title": "Bug: task assign issue",
                "description": "Fix assign-to-employee dropdown",
                "status": "failed",
                "date": "2025-06-20"
            }
        ]
    }
]

const Admin = {
    "id": 1,
    "email": "admin@example.com",
    "password": "123",
}

export {Employees,Admin}