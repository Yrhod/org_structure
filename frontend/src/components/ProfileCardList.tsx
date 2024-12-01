import React from 'react';
import ProfileCard from './ProfileCard';
import ProfileCardLider from './ProfilCardLider';  // Импортируйте ProfileCardLider

const ProfileCardList: React.FC = () => {
  // Данные для отображения карточек
  const profiles = [
    {
      photoUrl: 'https://via.placeholder.com/150',
      fullName: 'Иван Иванов',
      position: 'Руководитель отдела',
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
  ];

  return (
    <div
    style={{
      maxHeight: '700px', // Максимальная высота для списка
      overflowY: 'auto',  // Включаем вертикальную прокрутку
      padding: '5px 0', // Паддинг для внутреннего отступа
      scrollbarWidth: 'none', // Для Firefox
      msOverflowStyle: 'none', // Для Internet Explorer
    }}
    >
      {/* Отображаем ProfileCardLider первым */}
      <ProfileCardLider
        photoUrl={profiles[0].photoUrl}
        fullName={profiles[0].fullName}
        position={profiles[0].position}
        company={profiles[0].company}
      />
      
      {/* Отображаем остальные карточки как ProfileCard */}
      {profiles.slice(1).map((profile, index) => (
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

