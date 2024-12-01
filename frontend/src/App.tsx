import React, { useState } from 'react'; // Импортируем useState
import DepartmentStructure from './components/DepartmentStructure';
import ProfileCardList from './components/ProfileCardList';
import SearchBar from './components/SearchBar';
import StartList from './components/StartList';
import DropdownMenu from './components/DropDownMenu';
import EmployeeCard from './components/EmployeeCard';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

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

const departmentData = {
  id: 1,
  name: 'Центральный офис',
  subDepartments: [
    {
      id: 2,
      name: 'Филиал в Оренбургской области',
      subDepartments: [
        {
          id: 3,
          name: 'Главный',
        },
        {
          id: 4,
          name: 'Дополнительный офис 1',
        },
        {
          id: 3,
          name: 'Дополнительный офис 2',
        },
        {
          id: 3,
          name: 'Дополнительный офис 3',
        },
        {
          id: 3,
          name: 'Дополнительный офис 4',
        },
      ],
    },
    {
      id: 5,
      name: 'Филиал в Волгоградской области',
      subDepartments: [
        {
          id: 6,
          name: 'Главный',
        },
        {
          id: 6,
          name: 'Дополнительный офис 1',
        },
        {
          id: 6,
          name: 'Дополнительный офис 2',
        },
        {
          id: 6,
          name: 'Дополнительный офис 3',
        },
        {
          id: 6,
          name: 'Дополнительный офис 4',
        },
        

      ],
    },
  ],
};

const App: React.FC = () => {
  const [openModal, setOpenModal] = useState(false); // Состояние для управления модальным окном
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Состояние для отслеживания позиции окна
  const [dragging, setDragging] = useState(false); // Состояние для отслеживания начала перетаскивания
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // Начальная позиция перетаскивания

  // Функция для открытия модального окна
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Обработчик начала перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  // Обработчик перетаскивания
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const dx = e.clientX - startPosition.x;
      const dy = e.clientY - startPosition.y;
      setPosition({ x: position.x + dx, y: position.y + dy });
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Обработчик завершения перетаскивания
  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr', // Три равные колонки
        height: '100vh', // Высота на весь экран
      }}
    >
      {/* Левая колонка */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <SearchBar />
        <DropdownMenu />
        <StartList />

        {/* Модальное окно с карточкой сотрудника */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          BackdropProps={{ invisible: true }} // Убираем затемнение фона
          PaperProps={{
            style: {
              position: 'absolute',
              top: `${position.y}px`,
              left: `${position.x}px`,
              cursor: 'move',
              width: '100%', // Занимает 100% ширины модального окна
              maxWidth: '500px', // Максимальная ширина
              borderRadius: '16px', // Скругление углов
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Тень
              margin: '0',
              overflow: 'hidden',
              padding: '20px',
            },
          }}
          onMouseMove={handleMouseMove} // Добавляем обработчик для перетаскивания
          onMouseUp={handleMouseUp} // Добавляем обработчик для завершения перетаскивания
          onMouseDown={handleMouseDown} // Добавляем обработчик для начала перетаскивания
        >
          <DialogContent sx={{ padding: 0 }}>
            <EmployeeCard employee={employee} onClose={handleCloseModal} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Центральная колонка */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // Меняем направление на вертикальное
          justifyContent: 'flex-start', // Элементы будут выровнены сверху
          alignItems: 'stretch', // Чтобы элементы растягивались по ширине контейнера
          padding: '20px',
          borderRight: '1px solid #ccc', // Визуальное разделение
          borderLeft: '1px solid #ccc', // Визуальное разделение
        }}
      >
        <div
          style={{
            width: '100%', // Занимает 100% ширины центральной колонки
            maxWidth: '100%', // Гарантия, что не выйдет за пределы
            height: 'auto', // Адаптивная высота
          }}
        >
                                                                
          <Button                                                         //КНОПКА ДЛЯ КАРТОЧКИ СОТРУДНИКА
            variant="contained"
            color="primary"
            onClick={handleOpenModal} 
            style={{ alignSelf: 'center' }}
          >
            Пример карточки сотрудника
          </Button>
          
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

