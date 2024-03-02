import React, { useState, useEffect, FC } from 'react'
import tasksData from './task.json'

interface Task {
  id: number
  title: string
  description: string
  priority?: string // Added priority attribute
}

// Extend NewTask interface for the form
interface NewTask {
  title: string
  description: string
  priority?: string
}

const TaskList: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // Assuming tasksData now includes priorities
    setTasks(tasksData)
  }, [])

  const [newTask, setNewTask] = useState<NewTask>({ title: '', description: '', priority: 'Normal' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewTask({ ...newTask, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1
    setTasks([...tasks, { ...newTask, id: newId }])
    setNewTask({ title: '', description: '', priority: 'Unknown' })
  }

  // Function to remove a task
  const handleRemove = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTaskPriority = (id: number, newPriority: string) => {
    // Create a new array of tasks with the updated priority for the specified task
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        // Found the task, update its priority
        return { ...task, priority: newPriority }
      }
      // Return the task unchanged if it's not the one we're updating
      return task
    })
    // Update the state with the new array of tasks
    setTasks(updatedTasks)
  }
  

  return (
    <div className="task-list">
      <h2>Backlog Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleChange}
        />
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Priority:
              <select
                value={task.priority}
                onChange={(e) => updateTaskPriority(task.id, e.target.value)}
              >
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </p>
            <button onClick={() => handleRemove(task.id)}>Remove Task</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default TaskList
