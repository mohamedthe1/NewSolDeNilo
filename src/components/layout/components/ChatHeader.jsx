export default function ChatHeader({ onClose, theme }) {
  return (
    <div
      className={`font-bold p-3 rounded-t-xl flex justify-between items-center text-white ${theme.buttonPrimary}`}
    >
      <span>Waset Travel Support</span>
      <button
        onClick={onClose}
        style={{ cursor: "pointer" }}
        className="font-bold"
      >
        ✖
      </button>
    </div>
  );
}
