import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

function TaskList() {
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('');
  const [activeOperation, setActiveOperation] = useState('none');
  const tasks = useSelector(state => state.tasks.tasks);

  // Filtering tasks based on completion status
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'all':
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // Sorting tasks based on priority
  const sortedTasks = useMemo(() => {
    if (!sortOrder) return tasks;
    const priorityValue = { high: 3, medium: 2, low: 1 };
    return [...tasks].sort((a, b) => {
      return sortOrder === 'high_to_low'
        ? priorityValue[b.priority] - priorityValue[a.priority]
        : priorityValue[a.priority] - priorityValue[b.priority];
    });
  }, [tasks, sortOrder]);

  // Determine tasks to display based on active operation
  const tasksToDisplay = useMemo(() => {
    if (activeOperation === 'filter') {
      return filteredTasks;
    } else if (activeOperation === 'sort') {
      return sortedTasks;
    } else {
      return tasks;
    }
  }, [filteredTasks, sortedTasks, activeOperation]);

  return (
    <div>
      <div className="flex justify-around mb-4">
        <button onClick={() => { setFilter('all'); setActiveOperation('filter'); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          All
        </button>
        <button onClick={() => { setFilter('active'); setActiveOperation('filter'); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Active
        </button>
        <button onClick={() => { setFilter('completed'); setActiveOperation('filter'); }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Completed
        </button>
        <button onClick={() => { setSortOrder('high_to_low'); setActiveOperation('sort'); }} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          High to Low
        </button>
        <button onClick={() => { setSortOrder('low_to_high'); setActiveOperation('sort'); }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Low to High
        </button>
      </div>
      {tasksToDisplay.map(task => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
}

export default TaskList;