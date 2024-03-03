import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import JobBoard from './JobBoard/JobBoard'
import TaskList from './Task/TaskList'
import './App.css' 
import BookCatalog from './BookCatagory/BookCatalog'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/job-board">Job Board</Link>
            </li>
            <li>
              <Link to="/task-list">Task List</Link>
            </li>
            <li>
              <Link to="/book-cat">Book Catalog</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/job-board" element={<JobBoard />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/book-cat" element={<BookCatalog />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
