import React from 'react';

interface YearFilterProps {
    selectedYear: number;
    onYearChange: (year: number) => void;
    onFilterApply: () => void;
    availableYears: number[];
}

const YearFilter: React.FC<YearFilterProps> = ({ selectedYear, onYearChange, onFilterApply, availableYears }) => {
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onYearChange(parseInt(event.target.value));
    };

    return (
        <div>
            <select value={selectedYear.toString()} onChange={handleYearChange}>
                {availableYears.sort((a, b) => a - b).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <button onClick={onFilterApply}>Filter by Year</button>
        </div>
    );
};

export default YearFilter;
