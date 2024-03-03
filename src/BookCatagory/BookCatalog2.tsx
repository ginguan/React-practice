import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import booksData from './bookData.json'

interface Author {
    firstName: string
    lastName: string
}

interface Book {
    id: string
    title: string
    author: Author
    year: number
}

interface BooksData {
    [key: string]: Book[]
}

const BookCatalog = () => {
    // const [books, setBooks] = useState<BooksData>(booksData)
    const [newBook, setNewBook] = useState<Book>({
        id: '',
        title: '',
        author: { firstName: '', lastName: '' },
        year: new Date().getFullYear()
    })
    const [filterYear, setFilterYear] = useState<number | null>(null)
    const [books, setBooks] = useState<BooksData>({}) // Initialize books as an empty object
    const [displayedBooks, setDisplayedBooks] = useState<BooksData>({}) // Initialize displayedBooks as an empty object
    // ... (Other states stay the same)
    
    // Fetch books data from the API
    useEffect(() => {
        fetch('YOUR_API_ENDPOINT') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                setBooks(data)
                setDisplayedBooks(data)
            })
            .catch(error => console.error('Error fetching books:', error))
    }, []) // Dependency array is empty, so the effect runs only once after the initial render

    // ... (Rest of the component stays the same, including handleChange, handleSubmit, and handleFilterApply)
    
    // Collect all unique years from the displayedBooks for the YearFilter component
    const availableYears = Array.from(new Set(Object.values(displayedBooks).flatMap(letterGroup => letterGroup.map(book => book.year))))

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setNewBook(prevState => ({
            ...prevState,
            [name]: name === 'year' ? parseInt(value) : value,
            author: name === 'firstName' || name === 'lastName' ? {
                ...prevState.author,
                [name]: value
            } : prevState.author
        }))
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const newBookId = uuidv4()
        const firstLetterOfLastName = newBook.author.lastName.charAt(0).toUpperCase()
        const updatedBooks = {
            ...books,
            [firstLetterOfLastName]: [...(books[firstLetterOfLastName] || []), { ...newBook, id: newBookId }]
        }
        setBooks(updatedBooks)
        setNewBook({
            id: '',
            title: '',
            author: { firstName: '', lastName: '' },
            year: new Date().getFullYear()
        })
    }

    const handleFilterToggle = () => {
        // Example: Toggle for the year 2020, change as needed
        setFilterYear(filterYear === 2020 ? null : 2020)
    }

    return (
        <div className="book-catalog">
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={newBook.title} onChange={handleChange} placeholder="Title" required />
                <input type="text" name="firstName" value={newBook.author.firstName} onChange={handleChange} placeholder="Author's First Name" required />
                <input type="text" name="lastName" value={newBook.author.lastName} onChange={handleChange} placeholder="Author's Last Name" required />
                <input type="number" name="year" value={newBook.year.toString()} onChange={handleChange} placeholder="Year" required />
                <button type="submit">Add Book</button>
            </form>

            <button onClick={handleFilterToggle}>Toggle 2020 Filter</button>

            {Object.keys(books).sort().map(letter => (
                <div key={letter}>
                    <h2>{letter}</h2>
                    {books[letter].sort((a, b) => a.author.lastName.localeCompare(b.author.lastName)).filter(book => !filterYear || book.year === filterYear).map(book => (
                        <div key={book.id} className="book-card">
                            <h3>{book.title}</h3>
                            <p>Author: {book.author.firstName} {book.author.lastName}</p>
                            <p>Year: {book.year}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default BookCatalog
