import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLibrary } from '@/contexts/LibraryContext';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/types';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { books } = useLibrary();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = books
        .filter(book => 
          book.livro.toLowerCase().includes(query.toLowerCase()) ||
          book.area.toLowerCase().includes(query.toLowerCase()) ||
          (book.sobre && book.sobre.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, books]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBookSelect = (book: Book) => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    navigate(`/read/${book.id}`);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="mb-8 relative" ref={searchRef}>
      <div className="relative max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder="Buscar livros, áreas ou temas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-background/50 backdrop-blur-sm border-2 border-netflix-accent/30 text-lg py-6 pl-12 pr-12 rounded-2xl focus:border-netflix-accent transition-all duration-300 shadow-lg"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-netflix-accent" size={20} />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-netflix-secondary hover:text-netflix-accent transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-2xl mt-2 bg-netflix-card border border-netflix-cardHover rounded-xl shadow-2xl z-50 overflow-hidden">
          {suggestions.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookSelect(book)}
              className="flex items-center p-4 hover:bg-netflix-cardHover cursor-pointer transition-colors border-b border-netflix-cardHover/50 last:border-b-0"
            >
              <div className="w-12 h-16 flex-shrink-0 rounded overflow-hidden mr-4">
                <img
                  src={book.imagem}
                  alt={book.livro}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-medium text-netflix-text truncate">
                  {book.livro}
                </h4>
                <p className="text-sm text-netflix-accent">
                  {book.area}
                </p>
                {book.sobre && (
                  <p className="text-xs text-netflix-secondary mt-1 line-clamp-2">
                    {book.sobre}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;