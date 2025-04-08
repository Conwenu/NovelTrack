import BookCard from "./BookCard"

export default function BookList({ bookList }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {bookList.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

