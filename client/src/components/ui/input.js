export default function Input({ id, type = "text", ...props }) {
    return (
      <input
        id={id}
        type={type}
        className="border border-gray-300 px-3 py-2 rounded-md"
        {...props}
      />
    );
  }
  