import React from "react";
import UserLikes from "./UserLikes";
import UserComments from "./UserComments";
import { useTheme } from "@/context/ThemeContext";

const UserDetails = ({ user, activeTab }) => {
  const { theme } = useTheme();

  return (
    <div className={`mt-4 p-3 rounded-md ${theme.cardSecondary}`}>
      {activeTab === "likes" && <UserLikes user={user} />}
      {activeTab === "comments" && <UserComments user={user} />}
    </div>
  );
};

export default UserDetails;
