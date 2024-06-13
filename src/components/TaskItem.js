import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, editTask, toggleComplete } from '../redux/features/tasksSlice';
import { toast } from 'react-toastify';

function TaskItem({ id, title, description, priority, completed }) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newPriority, setNewPriority] = useState(priority);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const dispatch = useDispatch();


  const handleDelete = () => {
    dispatch(removeTask(id));
    toast.error("Task deleted!");
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
      dispatch(editTask({ id, title: newTitle, description: newDescription, priority: newPriority }));
      setEditMode(false);
      toast.success("Task updated successfully!");
    }
  };

  const handleCompletionToggle = () => {
    dispatch(toggleComplete(id));
    if (!completed){
      toast.success("Task Completed, you can see in completed tab");
    } else {
      toast.success("Task changed to not completed");

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
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2">
            Save
          </button>
          <button
            onClick={() => {
              setEditMode(false);
              setTitleError('');
              setDescriptionError('');
            }}
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className={`text-xl font-bold ${completed ? 'line-through' : ''}`}>{title}</h2>
          <p className={completed ? 'line-through' : ''}>{description}</p>
          <span className={`priority ${priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => {
                setEditMode(true);
                setTitleError('');
                setDescriptionError('');
              }}
              className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
              Delete
            </button>
            <button
              onClick={handleCompletionToggle}
              className={`bg-${completed ? 'blue' : 'gray'}-500 hover:bg-${completed ? 'blue' : 'gray'}-700 text-white py-2 px-4 rounded`}
            >
              {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
