import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-bold underline my-4 text-center">
          Task Manager
        </h1>
        <TaskForm />
        <TaskList />
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            
            
        />
      </div>
    </Provider>
    
  );
}

export default App;
