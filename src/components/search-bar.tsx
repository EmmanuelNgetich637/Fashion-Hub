import React from "react"
import { Search } from "lucide-react" 

interface SearchBarProps {
  query: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default SearchBar
