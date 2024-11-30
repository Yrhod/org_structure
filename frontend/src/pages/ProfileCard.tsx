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
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        backgroundColor: '#fff',
      }}
    >
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
        <strong style={{ fontSize: '18px', marginBottom: '4px', fontFamily: 'MTSCompact-Black, sans-serif'}}>{fullName}</strong>
        <span style={{ color: '#555', marginBottom: '4px', fontFamily: 'MTSCompact-Medium, sans-serif' }}>{position}</span>
        <span style={{ color: '#777' , fontFamily: 'MTSCompact-Medium, sans-serif' }}>{company}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
