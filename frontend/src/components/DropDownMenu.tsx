import React, { useState } from 'react';

const DropdownMenu: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Выберите фильтр поиска');

  const options = [
    'Фамилия',
    'Имя',
    'Фамилия Имя',    
    'Город',
    'Почта',
    'Номер',
    'Профессия',
    'Департамент',
    'Роль',
    'Проект',
  ];

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={{marginTop: "10px", maxWidth: '450px'}}>
      <select
        value={selectedOption}
        onChange={handleSelect}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          fontFamily: 'MTSCompact-Medium, sans-serif'
        }}
        
      >
        <option disabled>Выберите фильтр поиска</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
