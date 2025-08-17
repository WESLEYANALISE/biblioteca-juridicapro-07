import React from 'react';
import { Book } from '@/types';
import { Clock, User } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onBookClick: (book: Book) => void;
  title?: string;
}

const BookList: React.FC<BookListProps> = ({ books, onBookClick, title }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-netflix-secondary">Nenhum livro encontrado.</p>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {title && <h2 className="text-lg font-medium mb-3">{title}</h2>}
      <div className="space-y-4">
        {books.map(book => (
          <div 
            key={book.id}
            onClick={() => onBookClick(book)}
            className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#3a3a3a] cursor-pointer transition-all duration-500 ease-out group border border-white/5 hover:border-white/10 shadow-lg hover:shadow-2xl hover:scale-[1.01] transform"
          >
            <div className="flex-shrink-0">
              <img 
                src={book.imagem || '/placeholder.svg'} 
                alt={book.livro}
                className="w-16 h-20 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-netflix-accent transition-colors duration-300">
                {book.livro}
              </h3>
              <p className="text-sm text-netflix-secondary mb-3 line-clamp-3">
                {book.sobre || 'Descrição não disponível.'}
              </p>
              <div className="flex items-center space-x-4 text-xs text-netflix-secondary">
                <div className="bg-netflix-accent/20 text-netflix-accent px-2 py-1 rounded-full text-xs font-medium">
                  {book.area}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;