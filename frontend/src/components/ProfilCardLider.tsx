import React from 'react';

interface CardProps {
  photoUrl: string;
  fullName: string;
  position: string;
  company: string;
}

const ProfileCardLider: React.FC<CardProps> = ({ photoUrl, fullName, position, company }) => {
  return (
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
        marginBottom: '20px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Фиолетовый квадрат с закругленным углом */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50px',
          height: '50px',
          border: 'none', // Убираем границы у фиолетового квадрата
          backgroundColor: 'rgb(121,67,229)', // Фиолетовый цвет
          borderTopRightRadius: '20px', // Скругление верхнего правого угла
        }}
      >
        {/* Белый квадрат внутри фиолетового */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, // Левый нижний угол
            left: 0,
            width: '28px', // 1/3 от 50px
            height: '28px',
            border: 'none', // Убираем границы у белого квадрата
            backgroundColor: '#fff', // Белый цвет
          }}
        />
      </div>
      {/* Фото в кружке */}
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

      {/* Информация о человеке */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontSize: '18px', marginBottom: '4px', fontFamily: 'MTSCompact-Black, sans-serif' }}>
          {fullName}
        </strong>
        <span style={{ color: '#555', marginBottom: '4px', fontFamily: 'MTSCompact-Medium, sans-serif' }}>
          {position}
        </span>
        <span style={{ color: '#777', fontFamily: 'MTSCompact-Medium, sans-serif' }}>{company}</span>
      </div>
    </div>
  );
};

export default ProfileCardLider;
