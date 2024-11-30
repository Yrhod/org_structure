import React from 'react';
import ProfileCardStart from './ProfileCardStart'; // Импортируем компонент карточки профиля

// Пример данных для карточек профиля на русском
const profileData = [
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Иван Иванов',
    position: 'Инженер-программист',
    company: 'ТехКорп',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Мария Смирнова',
    position: 'Менеджер продукта',
    company: 'Инновейт Инк.',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Алиса Джонсон',
    position: 'UX-дизайнер',
    company: 'Креативные Решения',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Боб Браун',
    position: 'Инженер DevOps',
    company: 'БилдРайт',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Чарли Уилсон',
    position: 'Маркетинговый специалист',
    company: 'БрендИфи',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Диана Уайт',
    position: 'Аналитик данных',
    company: 'ДатаВоркс',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Этан Грин',
    position: 'Тестировщик ПО',
    company: 'КвалитиЧек',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Фиона Блю',
    position: 'HR-менеджер',
    company: 'ПиплФёрст',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Джордж Ред',
    position: 'Торговый представитель',
    company: 'СеллСмарт',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Ханна Блэк',
    position: 'Контент-менеджер',
    company: 'РайтПро',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Иэн Сильвер',
    position: 'Специалист по кибербезопасности',
    company: 'СекьюрНет',
  },
  {
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Джулия Голд',
    position: 'Исследователь ИИ',
    company: 'ФьючерТех',
  },
];

const StartList: React.FC = () => {
  return (
    <div
      style={{
        maxHeight: '600px', // Максимальная высота для списка
        overflowY: 'auto',  // Включаем вертикальную прокрутку
        padding: '10px 0', // Паддинг для внутреннего отступа
        scrollbarWidth: 'none', // Для Firefox
        msOverflowStyle: 'none', // Для Internet Explorer
      }}
    >
      {/* Список карточек профилей */}
      {profileData.map((profile, index) => (
        <div key={index} style={{ padding: '0 10px' }}>
          <ProfileCardStart
            photoUrl={profile.photoUrl}
            fullName={profile.fullName}
            position={profile.position}
            company={profile.company}
          />
        </div>
      ))}
    </div>
  );
};

export default StartList;
