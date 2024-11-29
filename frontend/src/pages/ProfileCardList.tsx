import React from 'react';
import ProfileCard from './ProfileCard';

const ProfileCardList: React.FC = () => {
  // Данные для отображения карточек
  const profiles = [
    {
      photoUrl: 'https://via.placeholder.com/150',
      fullName: 'Иван Иванов',
      position: 'Программист',
      company: 'ООО Рога и Копыта',
    },
    {
      photoUrl: 'https://via.placeholder.com/150',
      fullName: 'Мария Смирнова',
      position: 'Дизайнер',
      company: 'Студия АртДизайн',
    },
    {
      photoUrl: 'https://via.placeholder.com/150',
      fullName: 'Петр Сидоров',
      position: 'Менеджер проектов',
      company: 'Tech Solutions',
    },
    {
        photoUrl: 'https://via.placeholder.com/150',
        fullName: 'Иван Иванов',
        position: 'Программист',
        company: 'ООО Рога и Копыта',
    },
    {
        photoUrl: 'https://via.placeholder.com/150',
        fullName: 'Мария Смирнова',
        position: 'Дизайнер',
        company: 'Студия АртДизайн',
    },
    {
        photoUrl: 'https://via.placeholder.com/150',
        fullName: 'Петр Сидоров',
        position: 'Менеджер проектов',
        company: 'Tech Solutions',
    },
    {
        photoUrl: 'https://via.placeholder.com/150',
        fullName: 'Анна Козлова',
        position: 'HR-менеджер',
        company: 'Альфа Тех',
    },
    {
        photoUrl: 'https://via.placeholder.com/150',
        fullName: 'Олег Васильев',
        position: 'Системный администратор',
        company: 'Сеть IT',
    },
    {
        photoUrl: 'https://via.placeholder.com/150',
        fullName: 'Елена Попова',
        position: 'Менеджер по продажам',
        company: 'Лидер Бизнеса',
    },
    {
        photoUrl: 'https://via.placeholder.com/150',
        fullName: 'Дмитрий Орлов',
        position: 'Продуктовый менеджер',
        company: 'Стартап 2.0',
    },
    {
        photoUrl: 'https://via.placeholder.com/150',
        fullName: 'Светлана Петрова',
        position: 'Маркетолог',
        company: 'Рекламная компания',
    },
    {
        photoUrl: 'https://via.placeholder.com/150',
        fullName: 'Игорь Морозов',
        position: 'Технический писатель',
        company: 'ТехПис',
    },
    {
        photoUrl: 'https://via.placeholder.com/150',
        fullName: 'Александр Ким',
        position: 'Аналитик данных',
        company: 'DataDriven Inc.',
    }
    // Добавьте ещё карточки по необходимости
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // Или 'row' для горизонтальной прокрутки
        gap: '16px',
        overflowY: 'auto', // Вертикальная прокрутка
        maxHeight: '650px', // Ограничиваем высоту контейнера
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'rgb(237, 28, 36)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {profiles.map((profile, index) => (
        <ProfileCard
          key={index} // Ключ обязателен для списка
          photoUrl={profile.photoUrl}
          fullName={profile.fullName}
          position={profile.position}
          company={profile.company}
        />
      ))}
    </div>
  );
};

export default ProfileCardList;
