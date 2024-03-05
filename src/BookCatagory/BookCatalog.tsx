import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import booksData from './bookData.json'
import YearFilter from './YearFilter' // Import the YearFilter component
import AddNewBook from './AddNewBook' // Adjust the import path as necessary
import { BooksData, Book, Author } from './type'



const BookCatalog = () => {
    const [books, setBooks] = useState<BooksData>(booksData) // All books
    const [displayedBooks, setDisplayedBooks] = useState<BooksData>(booksData) // Books to display, can be filtered
    // const [newBook, setNewBook] = useState<Book>({
    //     id: '',
    //     title: '',
    //     author: { firstName: '', lastName: '' },
    //     year: new Date().getFullYear()
    // })
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
    const [filterYear, setFilterYear] = useState<number | null>(null) // Currently applied filter year
    console.log('books', books)
    const handleAddBook = (newBook: { title: string, author: Author, year: number }) => {
        const id = uuidv4()
        const letter = newBook.author?.lastName[0].toUpperCase()
        if (!books[letter]) {
            const updatedBooks: any = {
                ...books,
                [letter]: [{ ...newBook, id: id }],
            }
            setBooks(updatedBooks)
            setDisplayedBooks(updatedBooks)
        }
        else {
            // books[letter].push({...newBook, id:id})
            const updatedBooks: any = {
                ...books,
                [letter]: [...books[letter], { ...newBook, id: id }],
            }
            setBooks(updatedBooks)
            setDisplayedBooks(updatedBooks)
        }
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
    const availableYears = Array.from(new Set(Object.values(books).flatMap(letterGroup => {
        return letterGroup?.map(item => item.year)
    })))

    return (
        <div className="book-catalog">
            <AddNewBook onAddBook={handleAddBook} />
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
