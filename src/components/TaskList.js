import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

function TaskList() {
  const tasks = useSelector(state => state.tasks.tasks);

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
}

export default TaskList;
