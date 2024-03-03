import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import booksData from './bookData.json'
import YearFilter from './YearFilter' // Import the YearFilter component
// BookCatalog.tsx

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
    const [books, setBooks] = useState<BooksData>(booksData) // All books
    const [displayedBooks, setDisplayedBooks] = useState<BooksData>(booksData) // Books to display, can be filtered
    const [newBook, setNewBook] = useState<Book>({
        id: '',
        title: '',
        author: { firstName: '', lastName: '' },
        year: new Date().getFullYear()
    })
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
    const [filterYear, setFilterYear] = useState<number | null>(null) // Currently applied filter year

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
        setBooks(updatedBooks) // Update all books
        setDisplayedBooks(updatedBooks) // Update displayed books
        setNewBook({
            id: '',
            title: '',
            author: { firstName: '', lastName: '' },
            year: new Date().getFullYear()
        })
    }

    const handleFilterApply = () => {
        if (filterYear === selectedYear) {
            // If the same year is selected again, remove the filter
            setDisplayedBooks(books)
            setFilterYear(null) // Reset the filterYear state
        } else {
            // Apply the filter
            const filteredBooks: BooksData = {}
            for (const key in books) {
                if (books.hasOwnProperty(key)) {
                    filteredBooks[key] = books[key].filter(book => book.year === selectedYear)
                }
            }
            setDisplayedBooks(filteredBooks) // Update the displayedBooks state with the filtered data
            setFilterYear(selectedYear) // Update the filterYear to the currently selected year
        }
    }

    // Collect all unique years from the books data for the YearFilter component
    const availableYears = Array.from(new Set(Object.values(books).flatMap(letterGroup => letterGroup.map(book => book.year))))

    return (
        <div className="book-catalog">
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={newBook.title} onChange={handleChange} placeholder="Title" required />
                <input type="text" name="firstName" value={newBook.author.firstName} onChange={handleChange} placeholder="Author's First Name" required />
                <input type="text" name="lastName" value={newBook.author.lastName} onChange={handleChange} placeholder="Author's Last Name" required />
                <input type="number" name="year" value={newBook.year.toString()} onChange={handleChange} placeholder="Year" required />
                <button type="submit">Add Book</button>
            </form>

            <YearFilter
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                onFilterApply={handleFilterApply}
                availableYears={availableYears}
            />

            {Object.keys(displayedBooks).sort().map(letter => (
                <div key={letter}>
                    <h2>{letter}</h2>
                    {displayedBooks[letter].sort((a, b) => a.author.lastName.localeCompare(b.author.lastName)).map(book => (
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
