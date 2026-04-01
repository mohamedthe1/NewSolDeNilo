export default function ChatHeader({ activeUser, theme, themeName }) {
  return (
    <div
      className={`p-3 border-b ${theme.border} font-bold ${
        themeName === "dark"
          ? "text-yellow-400 capitalize"
          : "bg-gray-100 text-gray-800 capitalize"
      }`}
    >
      
      {activeUser ? `Chat with ${activeUser.name}` : "Select a user"}
    </div>
  );
}
