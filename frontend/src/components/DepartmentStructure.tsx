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
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  border: `1px solid rgb(237, 28, 36)`,
  boxShadow: 'none',
  '&.Mui-expanded': {
    margin: '0',
  },
  '&:before': {
    display: 'none',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: 'rgb(237, 28, 36)',
  color: '#fff',
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
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
        gridTemplateColumns: '1fr 1fr 1fr', // Разделение на три равные части
        height: '100vh',
      }}
    >
      {/* Левая пустая часть */}
      <Box sx={{ gridColumn: '1 / 2' }}></Box>

      {/* Центральная колонка */}
      <Box
        sx={{
          gridColumn: '2 / 3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Box
          sx={{
            width: '95%', // Очень широкий компонент (почти вся ширина)
            maxWidth: '100%', // Адаптивность
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Тень для визуального выделения
            borderRadius: '8px', // Закругленные углы
          }}
        >
          {renderSubDepartments(departmentHierarchy)}
        </Box>
      </Box>

      {/* Правая пустая часть */}
      <Box sx={{ gridColumn: '3 / 4' }}></Box>
    </Box>
  );
};

export default DepartmentAccordion;
