


const STARS = [
  {key:'st-1', value: 1, display: 1},
  {key:'st-2', value: 2, display: 2},
  {key:'st-3', value: 3, display: 3},
  {key:'st-4', value: 4, display: 4},
  {key:'st-5', value: 5, display: 5}
];

interface StarFilterProps {
  onChange: (star: string) => void;
  value: number;
}

export function StarFilter({  onChange, value }: StarFilterProps) {
  return (
      <div className="">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Stars</option>
          {STARS.map((star) => (
            <option key={star.key} value={star.value}>
              {star.display}
            </option>
          ))}
        </select>
      </div>
  );
}