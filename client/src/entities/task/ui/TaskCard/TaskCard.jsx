import { useState } from "react";
import { useNavigate } from "react-router";
import "./TaskCard.css";
import { Trash, Pencil, ChevronRight, X, Check, Bot } from "lucide-react";
import { CLIENT_ROUTES } from "../../../../shared/consts/clientRoutes";
import TaskApi from "../../api/TaskApi";
import AiApi from "../../../../features/ai/api/AiApi";

export default function TaskCard({ task, tasks, setTasks, user }) {
  const navigate = useNavigate();

  const [plan, setPlan] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [editedTask, setEditedTask] = useState({
    title: task.title,
    text: task.text,
  });

  const inputHandler = (event) => {
    setEditedTask((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const generatePlan = async () => {
    const { statusCode, data } = await AiApi.generateText({
      title: task.title,
      text: task.text,
    });
    if (statusCode === 200) {
      setPlan(data);
    }
  };

  const updateTask = async (id) => {
    const { statusCode, data } = await TaskApi.updateTask(id, editedTask);

    if (statusCode === 200) {
      setTasks(tasks.map((task) => (task.id === id ? data : task)));
      setIsEditing(false);
      setEditedTask({ title: data.title, text: data.text });
    }
  };

  const deleteTask = async (id) => {
    const { statusCode } = await TaskApi.deleteTask(id);

    if (statusCode === 200) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="task">
      <div className="task-title">
        {isEditing ? (
          <input
            type="text"
            name="title"
            className="task-title-input"
            value={editedTask.title}
            onChange={inputHandler}
          />
        ) : (
          <h2 className="task-name">{task.title}</h2>
        )}
        <small>
          Добавлено: {new Date(task.createdAt).toLocaleString("ru-RU")}
        </small>
      </div>

      <div className="task-content">
        {isEditing ? (
          <textarea
            rows={2}
            cols={55}
            name="text"
            className="task-text-input"
            value={editedTask.text}
            onChange={inputHandler}
          />
        ) : (
          <p className="task-text">{task.text}</p>
        )}

        <div className="task-controls">
          {user?.id === task.user_id &&
            (isEditing ? (
              <>
                <button
                  className="task-control-button save-task-button"
                  title="Сохранить"
                  onClick={() => updateTask(task.id)}
                >
                  <Check color="white" />
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTask(task);
                  }}
                  className="task-control-button delete-task-button"
                  title="Отменить"
                >
                  <X color="white" />
                </button>
              </>
            ) : (
              <>
                <button
                  className="edit-task-button task-control-button"
                  title="Редактировать"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil color="white" />
                </button>
                <button
                  className="delete-task-button task-control-button"
                  onClick={() => deleteTask(task.id)}
                  title="Удалить"
                >
                  <Trash color="white" />
                </button>
              </>
            ))}
          <button
            className="task-control-button ai-button"
            onClick={generatePlan}
            title="Генерировать план выполнения задачи"
          >
            <Bot color="black" />
          </button>

          <button
            className="task-control-button details-button"
            onClick={() => navigate(`${CLIENT_ROUTES.TASKS}/${task.id}`)}
            title="Подробнее"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      {plan && (
        <div className="plan">
          <h3>План выполнения задачи</h3>
          <p>{plan}</p>
        </div>
      )}
    </div>
  );
}
