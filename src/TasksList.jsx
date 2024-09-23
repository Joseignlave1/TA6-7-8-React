import { useState } from "react";

// TAS 6, 7, 8 
const TasksList = () => {
    const tasks = [];
    const [taskList, setTaskList] = useState(tasks);
    const [inputValue, setInputValue] = useState("");
    const [editTaskInputValue, setEditTaskInputValue] = useState("");
    const [openEditInput, setOpenEditInput] = useState(false);
    const [taskToEditIndex, setTaskToEditIndex] = useState(null);

    const handleOpen = () => setOpenEditInput(true);
    const handleClose = () => setOpenEditInput(false);

    const addTask = () => {
        if(inputValue.trim()) {
            setTaskList([...taskList, inputValue])
            setInputValue("");
        } 
    }

    const removeTask = (indexItem) => {
        setTaskList((prevState) => {
            return prevState.filter((item, index) => index !== indexItem)
        })
    }

    const updateTask = (indexItem) => {
        setTaskToEditIndex(indexItem);
        handleOpen();
        const taskToEdit = taskList[indexItem];
        setEditTaskInputValue(taskToEdit); //Hacemos que el input aparezca con el elemento actual del array
    }
    const saveEditTask = () => {
        setTaskList((prevState) => {
          return prevState.map((item, index) => {
             if(index === taskToEditIndex) {
              return editTaskInputValue;
             } 
             return item;
         })
     });
     handleClose();
  }
    return (
        <div>
            <label htmlFor="">Añade tus tareas</label>
            <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Añade su tarea"
            />
            <ul className="task-list">
                {taskList.map((item, index) => (
                        <div key={index}>
                                {openEditInput && taskToEditIndex === index ? (
                            <div>
                                <input 
                                    type="text"
                                    value={editTaskInputValue}
                                    onChange={(e) => setEditTaskInputValue(e.target.value)}
                                />
                                <button onClick={saveEditTask}>Guardar</button>
                                <button onClick={handleClose}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                <p>{item}</p>
                                <button id="button-delete-task" onClick={() => removeTask(index)}>Eliminar Tarea</button>
                                <button id="button-edit-task" onClick={() => updateTask(index)}>Edita la tarea</button>
                            </div>
                        )}
                        </div>
                    
                ))}
            </ul>

            <button onClick={addTask}>Añadir tarea</button>

        </div>
    )
}

export default TasksList;