import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

// Admin credentials (in real app, this would be from backend)
const ADMIN_PASSWORD = "admin123";

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [postedJobs, setPostedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Load user data kutoka localStorage wakati app inapata kuwa ready
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedPosted = localStorage.getItem("postedJobs");
    const savedApplied = localStorage.getItem("appliedJobs");
    const savedAllUsers = localStorage.getItem("allUsers");

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedPosted) setPostedJobs(JSON.parse(savedPosted));
    if (savedApplied) setAppliedJobs(JSON.parse(savedApplied));
    if (savedAllUsers) setAllUsers(JSON.parse(savedAllUsers));
  }, []);

  // Save user data kila mara inabadilika
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("postedJobs", JSON.stringify(postedJobs));
  }, [postedJobs]);

  useEffect(() => {
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  useEffect(() => {
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
  }, [allUsers]);

  const login = (phone, password) => {
    const newUser = { phone, name: "User", id: Date.now(), role: "user" };
    setCurrentUser(newUser);
    // Track all users
    setAllUsers(prev => [...prev.filter(u => u.phone !== phone), newUser]);
    return newUser;
  };

  const adminLogin = (password) => {
    if (password !== ADMIN_PASSWORD) {
      throw new Error("Nenosiri si sahihi");
    }
    const adminUser = { phone: "admin", name: "Admin", id: 0, role: "admin" };
    setCurrentUser(adminUser);
    return adminUser;
  };

  const logout = () => {
    setCurrentUser(null);
    if (currentUser?.role !== "admin") {
      setPostedJobs([]);
      setAppliedJobs([]);
    }
  };

  const addPostedJob = (job) => {
    setPostedJobs(prev => [{ ...job, userId: currentUser.id }, ...prev]);
  };

  const addAppliedJob = (job, applicantData) => {
    setAppliedJobs(prev => [
      { ...job, applicantData, appliedAt: new Date().toISOString(), userId: currentUser.id },
      ...prev
    ]);
  };

  return (
    <UserContext.Provider value={{ currentUser, login, adminLogin, logout, postedJobs, appliedJobs, addPostedJob, addAppliedJob, allUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser lazima iwe ndani ya UserProvider");
  }
  return context;
}
