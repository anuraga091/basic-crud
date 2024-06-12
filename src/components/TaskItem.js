import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, editTask } from '../redux/features/tasksSlice';
import { toast } from 'react-toastify';

function TaskItem({ id, title, description }) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeTask(id));
  };

  const handleEdit = () => {
    let valid = true;
    if (!newTitle.trim()) {
      setTitleError('Title cannot be empty.');
      valid = false;
    } else {
      setTitleError('');
    }

    if (!newDescription.trim()) {
      setDescriptionError('Description cannot be empty.');
      valid = false;
    } else {
      setDescriptionError('');
    }

    if (valid) {
        dispatch(editTask({ id, title: newTitle, description: newDescription }));
        setEditMode(false);  
        toast.success("Task updated successfully!");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-2">
      {editMode ? (
        <>
          <input
            className="text-xl font-bold p-2 border border-gray-300 rounded mb-2"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
              setTitleError(''); 
            }}
          />
          {titleError && <p className="text-red-500 text-xs italic">{titleError}</p>}
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={newDescription}
            onChange={(e) => {
              setNewDescription(e.target.value);
              setDescriptionError('');
            }}
          />
          {descriptionError && <p className="text-red-500 text-xs italic">{descriptionError}</p>}
          <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2">
            Save
          </button>
          <button onClick={() => {
            setEditMode(false);
            setTitleError('');
            setDescriptionError(''); 
          }} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">{title}</h2>
          <p>{description}</p>
          <button onClick={() => {
            setEditMode(true);
            setTitleError('');
            setDescriptionError(''); 
          }} className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded mr-2">
            Edit
          </button>
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
            Delete
          </button>
        </>
      )}
    </div>
  );
}


export default TaskItem;
