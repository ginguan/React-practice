// AddNewBook.tsx
import React, { useState } from 'react'
import { Author } from './type'

interface AddNewBookProps {
  onAddBook: (book: { title: string, author: Author, year: number }) => void
}

const AddNewBook: React.FC<AddNewBookProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [year, setYear] = useState<number | ''>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddBook({
      title,
      author: { firstName, lastName },
      year: year as number,
    })
    // Reset form
    setTitle('')
    setFirstName('')
    setLastName('')
    setYear('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Author's First Name" />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Author's Last Name" />
      <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10) || '')} placeholder="Year" />
      <button type="submit">Add Book</button>
    </form>
  )
}

export default AddNewBook
