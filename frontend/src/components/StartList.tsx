import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import ProfileCardStart from './ProfileCardStart';
import EmployeeCard from './EmployeeCard'; // Импортируем компонент карточки сотрудника

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

const profileData = [
  {
    id: 1,
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Антонов Антон',
    position: 'Инженер-программист',
    company: 'ТехКорп',
  },
  {
    id: 2,
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Борисов Борис',
    position: 'Менеджер продукта',
    company: 'Инновейт Инк.',
  },
  {
    id: 3,
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Валерий Джонсон',
    position: 'UX-дизайнер',
    company: 'Креативные Решения',
  },
  {
    id: 4,
    photoUrl: 'https://via.placeholder.com/150',
    fullName: 'Грач Геннадий',
    position: 'Инженер-программист',
    company: 'ТехКорп',
  },

];

const StartList: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 130 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const dx = e.clientX - startPosition.x;
      const dy = e.clientY - startPosition.y;
      setPosition({ x: position.x + dx, y: position.y + dy });
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div>
      {profileData.map((profile) => (
        <div
          key={profile.id}
          style={{ padding: '10px', cursor: 'pointer' }}
          onClick={handleOpenModal}
        >
          <ProfileCardStart
            photoUrl={profile.photoUrl}
            fullName={profile.fullName}
            position={profile.position}
            company={profile.company}
          />
        </div>
      ))}

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        BackdropProps={{ invisible: true }}
        PaperProps={{
          style: {
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,
            cursor: 'move',
            width: '420px',
            maxWidth: '100%',
            borderRadius: '16px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          },
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
      >
        <DialogContent>
          <EmployeeCard employee={employee} onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartList;
