import React from "react";
import { FaUsers } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const UserCard = ({ user }) => {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-3">
      {user?.avatar ? (
        <img src={user?.avatar} alt={user?.name} className="w-12 h-12 rounded-full object-cover border" />
      ) : (
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          <FaUsers />
        </div>
      )}
      <div>
        <p className={`font-semibold capitalize ${theme.textAccent}`}>{user?.name}</p>
        <p className="text-sm opacity-70">{user?.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
