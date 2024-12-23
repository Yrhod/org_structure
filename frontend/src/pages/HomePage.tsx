import React from 'react';
import DepartmentStructure from '../components/DepartmentStructure';
import ProfileCardList from '../components/ProfileCardList';

const departmentData = {
  id: 1,
  name: 'Головной департамент',
  subDepartments: [
    {
      id: 2,
      name: 'Маркетинг',
      subDepartments: [
        {
          id: 3,
          name: 'Диджитал-маркетинг',
        },
        {
          id: 4,
          name: 'Традиционный маркетинг',
        },
      ],
    },
    {
      id: 5,
      name: 'Разработка',
      subDepartments: [
        {
          id: 6,
          name: 'Фронтенд',
        },
        {
          id: 7,
          name: 'Бэкенд',
        },
      ],
    },
  ],
};

const App: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr', // Три равные колонки
        height: '100vh', // Высота на весь экран
      }}
    >
      {/* Левая пустая колонка */}
      <div></div>

      {/* Центральная колонка */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          borderRight: '1px solid #ccc', // Визуальное разделение
          borderLeft: '1px solid #ccc', // Визуальное разделение
        }}
      >
        <div
          style={{
            width: '90%', // Занимает 90% ширины центральной колонки
            maxWidth: '100%', // Гарантия, что не выйдет за пределы
            height: 'auto', // Адаптивная высота
          }}
        >
          <DepartmentStructure departmentHierarchy={departmentData} />
        </div>
      </div>

      {/* Правая колонка */}
      <div style={{ padding: '20px' }}>
        <ProfileCardList />
      </div>
    </div>
  );
};

export default App;

