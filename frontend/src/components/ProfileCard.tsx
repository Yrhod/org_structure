import React, { useState } from 'react';
import EmployeeCard from './EmployeeCard';

interface CardProps {
  id: number;
  photoUrl: string;
  fullName: string;
  position: string;
  company: string;
}

const ProfileCard: React.FC<CardProps> = ({ id, photoUrl, fullName, position, company }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const employee = {
    id: 101,
    firstName: "Петр",
    lastName: "Петров",
    position: "Разработчик",
    department: "Бэкенд",
    role: "Бэкенд-разработчик",
    project: "Сеть IT",
    boss: {
      firstName: "Иван",
      lastName: "Иванов",
    },
    city: "Москва",
    email: "petrov@example.com",
    phoneNumber: "+7(999)-999-99-99",
    calendarLink: "https://calendar.google.com/",
    photoUrl: "https://via.placeholder.com/120",
  };

  const handleCardClick = () => {
    setModalPosition({ x: 20, y: 20 }); // Сбрасываем начальную позицию при открытии
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const dx = e.clientX - startPosition.x;
      const dy = e.clientY - startPosition.y;
      setModalPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
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
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }}
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

      {isFormVisible && (
        <div
          style={{
            position: 'fixed',
            top: `${modalPosition.y}px`,
            left: `${modalPosition.x}px`,
            zIndex: 1000,
            backgroundColor: '#fff',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            borderRadius: '16px',
            width: '400px',
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            style={{
              padding: '10px',
              backgroundColor: '#f0f0f0',
              borderBottom: '1px solid #ddd',
              cursor: 'move',
            }}
            onMouseDown={handleMouseDown}
          >
            <span>Информация о сотруднике</span>
            <button
              onClick={closeForm}
              style={{
                float: 'right',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>

          <div style={{ padding: '20px' }}>
            <EmployeeCard employee={employee} onClose={closeForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
