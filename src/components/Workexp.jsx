import React, { useState } from "react";
import { Pencil, PlusCircle, Trash2, Check } from "lucide-react";

const Workexp = ({ workExperience, setWorkExperience }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedData, setEditedData] = useState(null);

  // Handle edit click
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedData({ ...workExperience[index] }); // Copy current data
  };

  // Handle input change
  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  // Save edited entry
  const saveEdit = (index) => {
    setWorkExperience((prev) =>
      prev.map((exp, i) => (i === index ? editedData : exp))
    );
    setEditingIndex(null);
  };
  

  // Add new experience
  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        id: workExperience.length + 1,
        position: "New Position",
        company: "New Company",
        duration: "Year - Year",
        description: "Job description...",
      },
    ]);
  };

  // Remove work experience
  const removeWorkExperience = (index) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mt-6">
      <h2 className="text-xl font-semibold flex justify-between items-center">
        Work Experience
        <PlusCircle size={20} className="cursor-pointer text-blue-500" onClick={addWorkExperience} />
      </h2>

      {workExperience.map((exp, index) => (
        <div key={exp.id} className="mt-4 p-4 border rounded-lg shadow-sm relative bg-gray-50">
          {editingIndex === index ? (
            <>
              <input
                className="block w-full border p-2 rounded mt-1"
                value={editedData.position}
                onChange={(e) => handleChange(e, "position")}
              />
              <input
                className="block w-full border p-2 rounded mt-1"
                value={editedData.company}
                onChange={(e) => handleChange(e, "company")}
              />
              <input
                className="block w-full border p-2 rounded mt-1"
                value={editedData.duration}
                onChange={(e) => handleChange(e, "duration")}
              />
              <textarea
                className="block w-full border p-2 rounded mt-1"
                value={editedData.description}
                onChange={(e) => handleChange(e, "description")}
              />
              <div className="flex justify-end mt-2">
                <Check size={20} className="text-green-500 cursor-pointer" onClick={() => saveEdit(index)} />
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold">{exp.position}</h3>
              <p className="text-gray-600">{exp.company} - {exp.duration}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
              <div className="flex justify-end mt-2 space-x-2">
                <Pencil size={18} className="text-blue-500 cursor-pointer" onClick={() => handleEditClick(index)} />
                <Trash2 size={18} className="text-red-500 cursor-pointer" onClick={() => removeWorkExperience(index)} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Workexp;
