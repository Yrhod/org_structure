import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  styled,
  keyframes,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Тип данных для департамента
interface Department {
  id: number;
  name: string;
  subDepartments?: Department[]; // Вложенные департаменты
}

// Пропсы для компонента
interface DepartmentStructureProps {
  departmentHierarchy: Department; // Иерархия департаментов
}

// Анимация появления
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Стилизация аккордеона
const StyledAccordion = styled(Accordion)({
  border: '1px solid rgb(237, 28, 36)',
  boxShadow: 'none',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&.Mui-expanded': {
    margin: '0',
    transform: 'scale(1.02)',
    boxShadow: '0px 4px 15px rgba(237, 28, 36, 0.4)',
  },
  '&:before': {
    display: 'none',
  },
});

const StyledAccordionSummary = styled(AccordionSummary)({
  backgroundColor: 'rgb(237, 28, 36)',
  color: '#fff',
  fontFamily: '"Roboto", sans-serif',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(237, 28, 36, 0.85)',
    color: '#ffcccb',
  },
});

const StyledAccordionDetails = styled(AccordionDetails)({
  padding: '16px',
  backgroundColor: '#f9f9f9',
  color: '#333',
  fontFamily: '"Open Sans", sans-serif',
  animation: `${fadeIn} 0.5s ease`,
});

// Компонент для отображения иерархии департаментов
const DepartmentStructure: React.FC<DepartmentStructureProps> = ({
  departmentHierarchy,
}) => {
  // Рекурсивное отображение иерархии департаментов
  const renderSubDepartments = (department: Department) => (
    <StyledAccordion key={department.id}>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{department.name}</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        {department.subDepartments && department.subDepartments.length > 0 ? (
          department.subDepartments.map((subDept) =>
            renderSubDepartments(subDept)
          )
        ) : (
          <Typography>Нет поддепартаментов</Typography>
        )}
      </StyledAccordionDetails>
    </StyledAccordion>
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr', // Разделение на три равные части
        height: '100vh',
        fontFamily: '"Open Sans", sans-serif', // Применяем шрифт для всего компонента
      }}
    >
      {/* Левая пустая часть */}
      <Box sx={{ gridColumn: '1 / 2' }} />

      {/* Центральная колонка */}
      <Box
        sx={{
          gridColumn: '2 / 3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100%',
          padding: '20px',
          fontFamily: '"Roboto", sans-serif', // Применяем шрифт для колонок
        }}
      >
        <Box
          sx={{
            width: '95%',
            maxWidth: '100%',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Тень для выделения
            borderRadius: '8px', // Закругленные углы
          }}
        >
          {renderSubDepartments(departmentHierarchy)}
        </Box>
      </Box>

      {/* Правая пустая часть */}
      <Box sx={{ gridColumn: '3 / 4' }} />
    </Box>
  );
};

export default DepartmentStructure;
