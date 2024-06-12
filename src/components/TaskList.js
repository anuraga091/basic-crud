import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

function TaskList() {
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('');
  const [activeTab, setActiveTab] = useState('filter');
  const tasks = useSelector(state => state.tasks.tasks);

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

  const sortedTasks = useMemo(() => {
    if (!sortOrder) return filteredTasks;
    const priorityValue = { high: 3, medium: 2, low: 1 };
    return [...filteredTasks].sort((a, b) => {
      return sortOrder === 'high_to_low'
        ? priorityValue[b.priority] - priorityValue[a.priority]
        : priorityValue[a.priority] - priorityValue[b.priority];
    });
  }, [filteredTasks, sortOrder]);

  return (
    <div className="p-4">
      <div className=" p-2  mb-4">
        <div className="flex mb-2 space-x-2">
          <button
            onClick={() => setActiveTab('filter')}
            className={`px-3 py-1 font-semibold rounded-md ${activeTab === 'filter' ? 'bg-white border-t border-l border-r border-gray-300' : 'bg-gray-200'}`}
          >
            Filter
          </button>
          <button
            onClick={() => setActiveTab('sort')}
            className={`px-3 py-1 font-semibold rounded-md ${activeTab === 'sort' ? 'bg-white border-t border-l border-r border-gray-300' : 'bg-gray-200'}`}
          >
            Sort
          </button>
        </div>
        <div className="bg-white p-3 rounded-md border border-gray-300">
          {activeTab === 'filter' ? (
            <div>
              <div className="space-y-1">
                <label className="flex items-center text-gray-700">
                  <input type="radio" name="filter" value="all" checked={filter === 'all'} onChange={() => setFilter('all')} className="mr-2" />
                  All
                </label>
                <label className="flex items-center text-gray-700">
                  <input type="radio" name="filter" value="active" checked={filter === 'active'} onChange={() => setFilter('active')} className="mr-2" />
                  Active
                </label>
                <label className="flex items-center text-gray-700">
                  <input type="radio" name="filter" value="completed" checked={filter === 'completed'} onChange={() => setFilter('completed')} className="mr-2" />
                  Completed
                </label>
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-1">
                <label className="flex items-center text-gray-700">
                  <input type="radio" name="sortOrder" value="high_to_low" checked={sortOrder === 'high_to_low'} onChange={() => setSortOrder('high_to_low')} className="mr-2" />
                  High to Low
                </label>
                <label className="flex items-center text-gray-700">
                  <input type="radio" name="sortOrder" value="low_to_high" checked={sortOrder === 'low_to_high'} onChange={() => setSortOrder('low_to_high')} className="mr-2" />
                  Low to High
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {sortedTasks.map(task => (
          <TaskItem key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;