import React, { useState } from 'react';
import EmployeeCard from './EmployeeCard'; // Импорт компонента формы

interface CardProps {
  id: number;
  photoUrl: string;
  fullName: string;
  position: string;
  company: string;
}

const ProfileCard: React.FC<CardProps> = ({ id, photoUrl, fullName, position, company }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null); // Хранение данных сотрудника
  const [isFormVisible, setFormVisible] = useState(false); // Видимость формы

  const handleCardClick = async () => {
    try {
      // Запрос данных о сотруднике
      const response = await fetch(`/api/employees/${id}`);
      if (!response.ok) throw new Error('Ошибка загрузки данных');
      const data = await response.json();
      setSelectedEmployee(data); // Сохранение данных сотрудника
      setFormVisible(true); // Открытие формы
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const closeForm = () => {
    setFormVisible(false); // Закрыть форму
    setSelectedEmployee(null); // Очистить данные
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '20px',
          padding: '16px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          backgroundColor: '#fff',
          marginBottom: '5px',
          marginLeft: '9px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onClick={handleCardClick}
      >
        <img
          src={photoUrl}
          alt="profile"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: '16px',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong style={{ fontSize: '18px', marginBottom: '4px' }}>{fullName}</strong>
          <span style={{ color: '#555', marginBottom: '4px' }}>{position}</span>
          <span style={{ color: '#777' }}>{company}</span>
        </div>
      </div>

      {/* Отображение формы */}
      {isFormVisible && selectedEmployee && (
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
          <EmployeeCard employee={selectedEmployee} onClose={closeForm} />
        </div>
      )}
    </>
  );
};

export default ProfileCard;
