import React, { useState, useEffect, FC } from 'react'

interface Task {
  id: number
  title: string
  description: string
  priority?: string // Priority is optional
}

interface NewTask {
  title: string
  description: string
  priority?: string
}

const TaskList: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const [newTask, setNewTask] = useState<NewTask>({ title: '', description: '', priority: 'Normal' })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewTask({ ...newTask, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1
    addTask({ ...newTask, id: newId })
    setNewTask({ title: '', description: '', priority: 'Normal' }) // Reset form
  }

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const updateTaskPriority = (id: number, newPriority: string) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, priority: newPriority } : task)
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
            <button onClick={() => deleteTask(task.id)}>Remove Task</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
