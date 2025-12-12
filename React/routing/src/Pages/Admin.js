import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import "../Styles/Admin.css";

function Admin() {
  const [showAddClass, setShowAddClass] = useState(false);
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      className: "",
      timeLimit: 30,
      cloudinary_cloud_name: "demo",
      questions: [{ question: "", options: ["", "", "", ""], answer: 0, imageId: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({ control, name: "questions" });

  const { register: registerClass, handleSubmit: handleSubmitClass, reset: resetClass } = useForm();

  function onSubmitQuiz(data) {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const newQuiz = {
      id: Date.now(),
      title: data.title,
      className: data.className,
      timeLimit: parseInt(data.timeLimit),
      cloudinary_cloud_name: data.cloudinary_cloud_name,
      questions: data.questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: parseInt(q.answer),
        imageId: q.imageId
      }))
    };
    quizzes.push(newQuiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    alert("Quiz created successfully!");
    reset();
  }

  function onSubmitClass(data) {
    const classes = JSON.parse(localStorage.getItem("classes")) || [];
    const newClass = {
      id: Date.now(),
      name: data.className.toUpperCase(),
      createdAt: new Date().toISOString()
    };
    classes.push(newClass);
    localStorage.setItem("classes", JSON.stringify(classes));
    alert("Class created successfully!");
    resetClass();
    setShowAddClass(false);
  }

  const classes = JSON.parse(localStorage.getItem("classes")) || [];

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2 className="admin-header">Admin Dashboard</h2>
        
        <button 
          onClick={() => setShowAddClass(!showAddClass)} 
          className="add-question-btn"
          style={{ marginBottom: "20px" }}
        >
          {showAddClass ? "Hide Add Class" : "Add New Class"}
        </button>

        {showAddClass && (
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
            <h3>Add New Class</h3>
            <form onSubmit={handleSubmitClass(onSubmitClass)}>
              <input
                {...registerClass("className", { required: true })}
                placeholder="Class Name (e.g., CSE, ECE, IT)"
                className="admin-input"
              />
              <button type="submit" className="create-quiz-btn">Create Class</button>
            </form>
          </div>
        )}

        <h3 style={{ marginTop: "30px" }}>Create Quiz</h3>
        <form onSubmit={handleSubmit(onSubmitQuiz)}>
          <input {...register("title", { required: true })} placeholder="Quiz Title" className="admin-input" />
          
          <select {...register("className", { required: true })} className="admin-input">
            <option value="">Select Class</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.name}>{cls.name}</option>
            ))}
          </select>

          <input {...register("timeLimit", { required: true })} type="number" placeholder="Time Limit (seconds per question)" className="admin-input" />
          
          <input {...register("cloudinary_cloud_name")} placeholder="Cloudinary Cloud Name (default: demo)" className="admin-input" />

          {fields.map((field, qIdx) => (
            <div key={field.id} className="question-box">
              <h4>Question {qIdx + 1}</h4>
              <input {...register(`questions.${qIdx}.question`, { required: true })} placeholder="Question" className="admin-input" />
              <input {...register(`questions.${qIdx}.imageId`)} placeholder="Cloudinary Image ID (optional)" className="admin-input" />
              {[0, 1, 2, 3].map(oIdx => (
                <input key={oIdx} {...register(`questions.${qIdx}.options.${oIdx}`, { required: true })} placeholder={`Option ${oIdx + 1}`} className="admin-input" />
              ))}
              <select {...register(`questions.${qIdx}.answer`, { required: true })} className="admin-input">
                <option value={0}>Option 1</option>
                <option value={1}>Option 2</option>
                <option value={2}>Option 3</option>
                <option value={3}>Option 4</option>
              </select>
              {fields.length > 1 && <button type="button" onClick={() => remove(qIdx)} className="add-question-btn">Remove</button>}
            </div>
          ))}
          <button type="button" onClick={() => append({ question: "", options: ["", "", "", ""], answer: 0, imageId: "" })} className="add-question-btn">Add Question</button>
          <button type="submit" className="create-quiz-btn">Create Quiz</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
