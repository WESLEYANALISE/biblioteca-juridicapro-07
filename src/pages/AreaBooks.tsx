import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLibrary } from '@/contexts/LibraryContext';
import MobileNav from '@/components/MobileNav';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Book, ArrowLeft } from 'lucide-react';
import BookList from '@/components/BookList';
import BookDetailsModal from '@/components/BookDetailsModal';

const AreaBooks: React.FC = () => {
  const { books } = useLibrary();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { areaName } = useParams<{ areaName: string }>();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter books by selected area
  const filteredBooks = areaName ? books.filter(book => book.area === decodeURIComponent(areaName)) : [];

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-netflix-background text-netflix-text">
      {isMobile ? <MobileNav /> : <Header />}
      <div className={`container mx-auto px-4 ${isMobile ? 'pt-20' : 'pt-24'} pb-16`}>
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="mr-4 flex items-center text-netflix-accent hover:text-netflix-accent/80 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Voltar</span>
          </button>
          <h1 className="text-xl font-bold flex items-center">
            <Book className="mr-2" size={24} />
            {areaName ? decodeURIComponent(areaName) : 'Área'}
          </h1>
        </div>
        <BookList 
          books={filteredBooks} 
          onBookClick={handleBookClick} 
        />
      </div>
      
      <BookDetailsModal 
        book={selectedBook} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default AreaBooks;