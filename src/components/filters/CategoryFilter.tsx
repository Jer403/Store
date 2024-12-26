
import { ReactNode } from 'react';

const CATEGORIES = [
  'Games',
  'Software',
  'Design Assets',
  'Audio',
  'Video',
  'Documents',
  'Templates'
];

interface CategoryFilterProps {
  onChange: (category: string) => void;
  value: string;
  icon: ReactNode;
}

export function CategoryFilter({ icon, onChange, value }: CategoryFilterProps) {
  return (
      <div className="align-center relative">
        {icon}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-6 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
  );
}