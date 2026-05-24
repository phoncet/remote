import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [postedJobs, setPostedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Load user data kutoka localStorage wakati app inapata kuwa ready
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedPosted = localStorage.getItem("postedJobs");
    const savedApplied = localStorage.getItem("appliedJobs");

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedPosted) setPostedJobs(JSON.parse(savedPosted));
    if (savedApplied) setAppliedJobs(JSON.parse(savedApplied));
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

  const login = (phone, password) => {
    const newUser = { phone, name: "User", id: Date.now() };
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    setPostedJobs([]);
    setAppliedJobs([]);
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
    <UserContext.Provider value={{ currentUser, login, logout, postedJobs, appliedJobs, addPostedJob, addAppliedJob }}>
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
