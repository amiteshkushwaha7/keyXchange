import { useState } from 'react';

const FileUpload = ({ label, name, onFileChange, preview, className = '' }) => {
  const [filePreview, setFilePreview] = useState(preview);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
      onFileChange(file);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="mt-1 flex items-center">
        {filePreview && (
          <img
            src={filePreview}
            alt="Preview"
            className="w-16 h-16 object-cover rounded mr-4"
          />
        )}
        <div className="flex items-center">
          <label
            htmlFor={name}
            className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Choose File
          </label>
          <input
            id={name}
            name={name}
            type="file"
            className="sr-only"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;