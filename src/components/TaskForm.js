import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/features/tasksSlice';
import { toast } from 'react-toastify';
import { generateId } from '../utils/generatorFunctions';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priority, setPriority] = useState('medium');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!title.trim()) {
      setTitleError('Title cannot be empty.');
      valid = false;
    } else {
      setTitleError('');
    }

    if (!description.trim()) {
      setDescriptionError('Description cannot be empty.');
      valid = false;
    } else {
      setDescriptionError('');
    }

    if (valid) {
        dispatch(addTask({
            id: generateId(),
            title,
            description,
            priority,
            completed: false
        }));      
        setTitle('');
        setDescription('');
        setPriority('medium');
        toast.success("Task added successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError(''); 
          }}
          className="border-2 border-gray-300 p-2 w-full"
          placeholder="Add task title"
        />
        {titleError && <p className="text-red-500 text-xs italic">{titleError}</p>}
      </div>
      <div className="mb-2">
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setDescriptionError('');
          }}
          className="border-2 border-gray-300 p-2 w-full"
          placeholder="Add task description"
        />
        {descriptionError && <p className="text-red-500 text-xs italic">{descriptionError}</p>}
      </div>
      <div class="mb-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border-2 border-gray-300 p-2 w-full my-2"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Task
      </button>
        
    </form>
  );
}

export default TaskForm;
