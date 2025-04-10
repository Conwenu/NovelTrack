import BookItem from "./BookItem"

const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookItem key={Math.random()*400000} book={book} />
      ))}
    </div>
  )
}

export default BookList

