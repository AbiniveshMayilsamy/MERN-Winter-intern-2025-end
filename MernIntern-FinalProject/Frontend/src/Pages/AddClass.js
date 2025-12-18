import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Styles/Admin.css";

function AddClass() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    const classes = JSON.parse(localStorage.getItem("classes")) || [];
    const newClass = {
      id: classes.length + 1,
      name: data.className,
      students: [],
      quizzes: [],
      createdAt: new Date().toISOString(),
    };
    classes.push(newClass);
    localStorage.setItem("classes", JSON.stringify(classes));
    alert("Class created successfully!");
    reset();
    navigate("/quiz/admin");
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2 className="admin-header">Add New Class</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("className", { required: true })}
            placeholder="Class Name"
            className="admin-input"
          />
          <button type="submit" className="create-quiz-btn">
            Create Class
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddClass;
