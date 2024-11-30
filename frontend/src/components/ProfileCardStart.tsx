import React from 'react';

interface CardProps {
  photoUrl: string;
  fullName: string;
  position: string;
  company: string;
}

const ProfileCard: React.FC<CardProps> = ({ photoUrl, fullName, position, company }) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '0px 24px', // Уменьшена высота, но увеличена длина
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px', // Увеличена длина
        backgroundColor: '#fff',
        marginBottom: '0px',
        marginTop: "5px",
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
      {/* Фото в кружке */}
      <img
        src={photoUrl}
        alt="profile"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginRight: '24px', // Увеличено расстояние между фото и текстом
        }}
      />

      {/* Информация о человеке */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <strong
          style={{
            fontSize: '16px',
            marginTop: '4px',
            fontFamily: 'MTSCompact-Black, sans-serif',
          }}
        >
          {fullName}
        </strong>
        <span
          style={{
            color: '#555',
            fontSize: '12px',
            fontFamily: 'MTSCompact-Medium, sans-serif',
          }}
        >
          {position}
        </span>
        <span style={{ color: '#777', fontFamily: 'MTSCompact-Medium, sans-serif', fontSize: '12px',marginBottom: '4px',}}>
          {company}
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
