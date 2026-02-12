import { useEffect, useState } from 'react';
import './TasksPage.css';
import TaskCard from '../../entities/task/ui/TaskCard/TaskCard';
import TaskApi from '../../entities/task/api/TaskApi';

export default function TasksPage({ user }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const { data, error } = await TaskApi.getAllTasks();

      if (error) {
        alert(error);
        return;
      }
      setTasks(data);
    }
    getTasks();
  }, []);
  // useEffect(() => {}, []) - в таком варианте callback выполнится  один раз при монтировании компонента

  // useEffect(() => {}) - в таком варианте callback будет выполняться каждый раз при любом изменении компонента

  // useEffect(() => {}, [state]) - в таком варианте callback выполнится каждый раз при изменении элемента, указанного в массиве зависимостей

  // useEffect(() => {
  //  return () => {}}, []) - в таком варианте мыожно выполнить определнную логику при размонтировании компонента (возвращаем функцию очистки \ cleanup function)

  const initialFormState = { title: '', text: '' };

  const [newTask, setNewTask] = useState(initialFormState);

  function inputChangeHandler(event) {
    const { name, value } = event.target;
    setNewTask((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function addNewTask(event) {
    event.preventDefault();

    const { data, error } = await TaskApi.createTask(newTask);
    setTasks((current) => [...current, data]);

    setNewTask(initialFormState);
  }

  async function deleteTask(id) {
    const response = await TaskApi.deleteTask(id);

    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <div className="app-container">
      <form onSubmit={addNewTask}>
        <input
          type="text"
          name="title"
          placeholder="Название задачи"
          onChange={inputChangeHandler}
          value={newTask.title}
        />
        <input
          type="text"
          name="text"
          placeholder="Описание задачи"
          onChange={inputChangeHandler}
          value={newTask.text}
        />
        <button>Создать</button>
      </form>
      <div className="todo-container">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            setTasks={setTasks}
            tasks={tasks}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
