import { useState, useEffect } from 'react';

const Switch = ({ 
  label, 
  name, 
  checked = false, 
  onChange,
  className = ''
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (e) => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    
    // Create a synthetic event to match the expected onChange interface
    const syntheticEvent = {
      target: {
        name,
        type: 'checkbox',
        checked: newChecked
      }
    };
    
    onChange(syntheticEvent);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        className={`${
          isChecked ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        onClick={handleChange}
        role="switch"
        aria-checked={isChecked}
      >
        <span
          aria-hidden="true"
          className={`${
            isChecked ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
      {label && (
        <label htmlFor={name} className="ml-3 text-sm text-gray-700">
          {label}
        </label>
      )}
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={() => {}} // No-op since we're handling via button click
        className="sr-only"
      />
    </div>
  );
};

export default Switch;