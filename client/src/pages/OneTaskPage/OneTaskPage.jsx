import './OneTaskPage.css';
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import TaskApi from '../../entities/task/api/TaskApi';

export default function OneTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const { data, error } = await TaskApi.getTaskById(id);
      setTask(data);
    };
    fetchTask();
  }, [id]);

  return (
    <div className="app-container">
      <h2>{task.title}</h2>
      <p>{task.text}</p>

      <button onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
}
