
import React, { useState } from 'react';
import { useLibrary } from '@/contexts/LibraryContext';
import Header from '@/components/Header';
import BookDetailsModal from '@/components/BookDetailsModal';
import MobileNav from '@/components/MobileNav';
import { Book } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from '@/components/SearchBar';
import AreaStats from '@/components/AreaStats';
import FAQ from '@/components/FAQ';
import { Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { books } = useLibrary();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Get all unique areas for display
  const uniqueAreas = [...new Set(books.map(book => book.area))].sort();
  
  // Show all areas
  const featuredAreas = uniqueAreas;

  const handleAreaCardClick = (area: string) => {
    navigate(`/area/${encodeURIComponent(area)}`);
  };

  return (
    <div className="min-h-screen bg-netflix-background text-netflix-text">
      {isMobile ? <MobileNav /> : <Header />}
      <div className={`container mx-auto px-4 ${isMobile ? 'pt-20' : 'pt-24'} pb-20`}>
        {/* Search Bar */}
        <div className="animate-fade-in-up">
          <SearchBar />
        </div>
        
        {/* Statistics Overview */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <AreaStats />
        </div>
        
        {/* Featured Areas with colorful cards */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-netflix-accent to-amber-400 bg-clip-text text-transparent">
              Áreas do Direito
            </h2>
            <p className="text-netflix-secondary text-lg max-w-2xl mx-auto">
              Explore nossa biblioteca jurídica organizada por áreas de especialização
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {featuredAreas.map((area, index) => {
              const AreaIcon = Scale; // Sempre usar balança da justiça
              const colors = [
                "bg-gradient-to-br from-cyan-400 to-blue-500", // Azul como na foto
                "bg-gradient-to-br from-amber-400 to-orange-500", // Amarelo/laranja como na foto
                "bg-gradient-to-br from-emerald-400 to-green-500", // Verde como na foto
                "bg-gradient-to-br from-red-400 to-red-500", // Vermelho como na foto
                "bg-gradient-to-br from-purple-400 to-purple-500", // Roxo para variar
                "bg-gradient-to-br from-pink-400 to-pink-500", // Rosa para variar
                "bg-gradient-to-br from-indigo-400 to-indigo-500", // Índigo para variar
                "bg-gradient-to-br from-teal-400 to-teal-500" // Teal para variar
              ];
              const colorClass = colors[index % colors.length];
              
              return (
                <div 
                  key={area} 
                  onClick={() => handleAreaCardClick(area)}
                  className={`${colorClass} rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl flex flex-col items-center justify-center text-white shadow-xl border border-white/10 backdrop-blur-sm group animate-fade-in-up h-48 md:h-64 relative overflow-hidden`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="bg-white/20 p-3 md:p-4 rounded-full mb-3 md:mb-4 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <AreaIcon size={28} className="md:size-[40px] text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-center mb-2 md:mb-3 text-white drop-shadow-lg leading-tight px-2">{area}</h3>
                  <div className="bg-white/25 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-semibold text-xs md:text-sm backdrop-blur-sm group-hover:bg-white/35 transition-all duration-300 group-hover:scale-105 shadow-lg">
                    {books.filter(b => b.area === area).length} livros
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
        
        {/* FAQ Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <FAQ />
        </div>
      </div>
      <BookDetailsModal 
        book={selectedBook} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default Index;
