import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold underline my-4 text-center">
        Task Manager
      </h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
