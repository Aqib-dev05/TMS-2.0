/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../utils/api";
import {
  clearAuthLocally,
  getAuthLocally,
  setAuthLocally,
} from "../utils/LocalStore";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [initialAuth] = useState(() => getAuthLocally());
  const [user, setUser] = useState(initialAuth?.user ?? null);
  const [token, setToken] = useState(initialAuth?.token ?? null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [teamSnapshot, setTeamSnapshot] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [creatingTask, setCreatingTask] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState("");

  const persistAuth = useCallback((payload) => {
    if (!payload) {
      setUser(null);
      setToken(null);
      clearAuthLocally();
      return;
    }
    setUser(payload.user);
    setToken(payload.token);
    setAuthLocally(payload);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await api.get("/auth/me");
      persistAuth({ user: data.user, token });
    } catch (error) {
      console.error("Session validation failed", error);
      persistAuth(null);
    }
  }, [persistAuth, token]);

  const fetchTasks = useCallback(async () => {
    if (!token && !getAuthLocally()?.token) return;
    setTasksLoading(true);
    try {
      const { data } = await api.get("/tasks");
      setTasks(data.tasks ?? []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setTasksLoading(false);
    }
  }, [token]);

  const fetchTeamSnapshot = useCallback(async () => {
    if (!token && !getAuthLocally()?.token) return;
    setTeamLoading(true);
    try {
      const { data } = await api.get("/tasks/team/snapshot");
      setTeamSnapshot(data.team ?? []);
    } catch (error) {
      console.error("Failed to fetch team snapshot", error);
    } finally {
      setTeamLoading(false);
    }
  }, [token]);

  const handleFormSubmittion = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const { data } = await api.post("/auth/login", formData);
      persistAuth(data);
      setFormData({ email: "", password: "" });

      if (data.user.role === "employee") {
        await fetchTasks();
      } else {
        await fetchTeamSnapshot();
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Check credentials.";
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    persistAuth(null);
    setTasks([]);
    setTeamSnapshot([]);
  };

  const createTask = async ({ employeeId, title, description, dueDate }) => {
    if (!employeeId || !title) return;
    setCreatingTask(true);
    try {
      await api.post("/tasks", {
        employeeId,
        title,
        description,
        dueDate,
      });
      await fetchTeamSnapshot();
    } catch (error) {
      console.error("Failed to create task", error);
      throw error;
    } finally {
      setCreatingTask(false);
    }
  };

  const updateProfile = async (updates) => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    const payload = {};
    if (typeof updates.name === "string" && updates.name.trim()) {
      payload.name = updates.name.trim();
    }
    if (typeof updates.email === "string" && updates.email.trim()) {
      payload.email = updates.email.trim();
    }
    if (typeof updates.password === "string" && updates.password.trim()) {
      payload.password = updates.password;
    }

    if (!Object.keys(payload).length) {
      throw new Error("No changes to update");
    }

    const { data } = await api.put("/auth/me", payload);
    persistAuth({ user: data.user, token });
    return data.user;
  };

  const updateTaskStatus = async (taskId, status) => {
    if (!taskId || !status) return;
    setUpdatingTaskId(taskId);
    try {
      await api.patch(`/tasks/${taskId}`, { status });
      await fetchTasks();
    } catch (error) {
      console.error("Failed to update task status", error);
    } finally {
      setUpdatingTaskId("");
    }
  };

  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [fetchProfile, token, user]);

  useEffect(() => {
    if (!token || !user?.role) return;

    if (user.role === "employee") {
      fetchTasks();
    }

    if (user.role === "admin") {
      fetchTeamSnapshot();
    }
  }, [fetchTasks, fetchTeamSnapshot, token, user?.role]);

  const employees = useMemo(
    () =>
      teamSnapshot.map((member) => ({
        id: member.userId,
        label: member.name ? `${member.name} (${member.email})` : member.email,
        name: member.name,
      })),
    [teamSnapshot]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        formData,
        tasks,
        tasksLoading,
        teamSnapshot,
        teamLoading,
        employees,
        authError,
        authLoading,
        creatingTask,
        updatingTaskId,
        handleInputChange,
        handleFormSubmittion,
        logout,
        fetchTasks,
        fetchTeamSnapshot,
        createTask,
        updateTaskStatus,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
