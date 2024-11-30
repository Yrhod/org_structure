import React, { useState, useEffect } from 'react';
import EmployeeCard from './EmployeeCard';

// Определяем интерфейс для сотрудника
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  role: string;
  project: string;
  boss: {
    firstName: string;
    lastName: string;
  };
  city: string;
  email: string;
  phoneNumber: string;
  calendarLink: string;
  photoUrl: string;
}

const SearchBar: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Управление состоянием модального окна
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]); // Состояние для списка сотрудников

  // Загрузка данных из JSON файла
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('./test.JSON'); // Укажите путь к вашему файлу
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных сотрудников:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const query = (form.elements.namedItem('searchInput') as HTMLInputElement).value.trim();
    if (query) {
      console.log(`Поиск по запросу: ${query}`);
      // Логика поиска среди сотрудников
      const foundEmployee = employees.find(
        (employee) =>
          employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(query.toLowerCase())
      );
      if (foundEmployee) {
        setSelectedEmployee(foundEmployee);
        setModalOpen(true); // Открываем модальное окно
      }
    }
  };

  const handleClose = () => {
    setModalOpen(false); // Закрываем модальное окно
    setSelectedEmployee(null); // Сбрасываем выбранного сотрудника
  };

  return (
    <div>
      <form
        className="search-bar"
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '450px',
        }}
      >
        <div
          className="search-wrapper"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '0 8px',
            height: '48px',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s',
          }}
        >
          <div
            className="search-icon"
            style={{
              width: '34px',
              height: '34px',
              backgroundImage: 'url("https://static.mts.ru/mts_rf/images/magnifier.svg")',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              marginRight: '8px',
            }}
          />
          <input
            type="text"
            name="searchInput"
            placeholder="Введите запрос"
            className="search-input"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              padding: '0',
              height: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          type="submit"
          className="search-button"
          style={{
            marginLeft: '8px',
            backgroundColor: 'rgb(237, 28, 36)',
            border: 'none',
            borderRadius: '8px',
            padding: '0 16px',
            fontSize: '16px',
            fontFamily: 'MTSCompact-Medium, sans-serif',
            color: '#fff',
            height: '48px',
            lineHeight: '48px',
            cursor: 'pointer',
            transition: 'transform 0.3s',
            boxSizing: 'border-box',
          }}
        >
          Найти
        </button>
      </form>

      {/* Модальное окно с карточкой сотрудника */}
      {isModalOpen && selectedEmployee && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <EmployeeCard employee={selectedEmployee} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
