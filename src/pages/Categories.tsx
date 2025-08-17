
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLibrary } from '@/contexts/LibraryContext';
import MobileNav from '@/components/MobileNav';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Layers, Book, ArrowLeft } from 'lucide-react';
import BookList from '@/components/BookList';
import BookDetailsModal from '@/components/BookDetailsModal';

const Categories: React.FC = () => {
  const { books, setSelectedArea } = useLibrary();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { areaName } = useParams<{ areaName?: string }>();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique areas and count books in each area
  const areaStats = books.reduce((acc: Record<string, number>, book) => {
    if (!acc[book.area]) {
      acc[book.area] = 0;
    }
    acc[book.area]++;
    return acc;
  }, {});

  // Sort areas alphabetically
  const sortedAreas = Object.entries(areaStats).sort(([areaA], [areaB]) => areaA.localeCompare(areaB));

  // Filter books by selected area if any
  const filteredBooks = areaName ? books.filter(book => book.area === areaName) : [];

  const handleAreaClick = (area: string) => {
    navigate(`/categories/${encodeURIComponent(area)}`);
  };

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
        {areaName ? (
          <>
            <div className="flex items-center mb-6">
              <button 
                onClick={() => navigate('/categories')}
                className="mr-4 flex items-center text-netflix-accent"
              >
                <ArrowLeft size={20} className="mr-1" />
                <span>Voltar</span>
              </button>
              <h1 className="text-xl font-bold flex items-center">
                <Book className="mr-2" size={24} />
                {areaName}
              </h1>
            </div>
            <BookList 
              books={filteredBooks} 
              onBookClick={handleBookClick} 
            />
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold mb-6 flex items-center">
              <Layers className="mr-2" size={24} />
              Categorias
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAreas.map(([area, count], index) => {
                // Generate a colorful background for each area card
                const colors = [
                  "bg-gradient-to-br from-pink-500 to-purple-600",
                  "bg-gradient-to-br from-blue-500 to-teal-400",
                  "bg-gradient-to-br from-yellow-400 to-orange-500",
                  "bg-gradient-to-br from-green-400 to-emerald-600",
                  "bg-gradient-to-br from-red-500 to-pink-600",
                  "bg-gradient-to-br from-indigo-500 to-purple-500"
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <div
                    key={area}
                    onClick={() => handleAreaClick(area)}
                    className={`${colorClass} rounded-2xl p-8 cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-white shadow-xl border border-white/10 backdrop-blur-sm h-48`}
                  >
                    <Book size={48} className="mb-4 drop-shadow-lg" />
                    <h2 className="font-bold text-xl text-center mb-4 drop-shadow-lg">{area}</h2>
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full font-semibold text-sm backdrop-blur-sm shadow-lg">
                      {count} {count === 1 ? 'livro' : 'livros'}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      
      <BookDetailsModal 
        book={selectedBook} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default Categories;
