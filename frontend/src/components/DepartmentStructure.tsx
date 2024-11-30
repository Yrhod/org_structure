import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Тип данных для департамента
interface Department {
  id: number;
  name: string;
  subDepartments?: Department[]; // Вложенные департаменты
}

// Пропсы для компонента
interface DepartmentAccordionProps {
  departmentHierarchy: Department; // Иерархия департаментов
}

// Стилизация аккордеона
const StyledAccordion = styled(Accordion)(() => ({
  border: `1px solid rgb(237, 28, 36)`,
  boxShadow: 'none',
  '&.Mui-expanded': {
    margin: '0',
  },
  '&:before': {
    display: 'none',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  backgroundColor: 'rgb(237, 28, 36)',
  color: '#fff',
}));

const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  padding: '16px',
  backgroundColor: '#f9f9f9',
  color: '#333',
}));

const DepartmentAccordion: React.FC<DepartmentAccordionProps> = ({
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
        gridTemplateColumns: '1fr 2000fr 1fr', // Центральная колонка займет всю ширину
        height: '100vh',
      }}
    >
      {/* Левая пустая часть */}
      <Box sx={{ gridColumn: '1 / 2' }} />

      {/* Центральная колонка */}
      <Box
        sx={{
          gridColumn: '2 / 3',
          display: 'flex',
          flexDirection: 'column', // Обеспечивает вертикальное выравнивание
          alignItems: 'stretch', // Элементы растягиваются по ширине
          height: '100%', // Страница должна растягиваться по высоте
          padding: '20px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1000px', // Увеличиваем максимальную ширину
            margin: '0 auto', // Центрируем компонент по горизонтали
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Тень для визуального выделения
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

export default DepartmentAccordion;


