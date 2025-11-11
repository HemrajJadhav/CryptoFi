const NeoInput = ({ label, placeholder, type = "text", id }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full rounded-lg py-3 px-4 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
    />
  </div>
);

export default NeoInput;
