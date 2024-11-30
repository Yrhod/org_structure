import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Link, IconButton } from '@mui/material';
import { Email as EmailIcon, CalendarToday as CalendarIcon, Phone as PhoneIcon, Close as CloseIcon } from '@mui/icons-material';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  role: string;
  project: string;
  boss: {
    firstName: string;
    lastName: string;
    
  };
  city: string;
  email: string;
  phoneNumber: string;  
  calendarLink: string;
  photoUrl?: string;
}

interface EmployeeCardProps {
  employee: Employee; 
  onClose: () => void;  // Функция для закрытия карточки
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClose }) => {
  const {
    id,
    firstName,
    lastName,
    position,
    department,
    role,
    project,
    boss,
    city,
    email,
    phoneNumber,
    calendarLink,
    photoUrl,
  } = employee;

  return (
    <Card sx={{
        width: '100%', // Занимает 100% ширины модального окна
        maxWidth: '400px', // Максимальная ширина
        margin: '0',
        overflow: 'hidden', 
        padding: '20px',
         // Устанавливаем левое смещение
        }}>
      {/* Кнопка закрытия */}
      <IconButton 
        onClick={onClose} 
        sx={{ position:'absolute', top: 10, right: 10, color: 'grey' }}
      >
        <CloseIcon />
      </IconButton>

      {/* Контент карточки */}
      <Grid container spacing={3} sx={{ alignItems: 'center' }}>
        {/* Фото и Имя + Фамилия */}
        <Grid item xs={12} sm={4}>
          <CardMedia
            component="img"
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '20px',
            }}
            image={photoUrl || 'https://via.placeholder.com/120'}
            alt={`${firstName} ${lastName}`}
          />
        </Grid>

        {/* Имя, фамилия и ID */}
        <Grid item sm={8}>
          <Typography variant="h5" sx={{ marginBottom: '8px', fontFamily: 'MTSCompact-Black, sans-serif' }}>
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {id}
          </Typography>
        </Grid>
      </Grid>

      {/* Оставшаяся информация о сотруднике */}
      <CardContent sx={{ paddingTop: 0 }}>
        <Grid container spacing={2}>
          {/* Должность, ID департамента, роль и проект */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" fontFamily="MTSCompact-Medium, sans-serif">
              {position}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="MTSCompact-Medium, sans-serif">
              Департамент: {department}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="MTSCompact-Medium, sans-serif">
              Роль: {role}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="MTSCompact-Medium, sans-serif">
              Проект: {project}
            </Typography>
          </Grid>
          {boss && (
        <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" fontFamily="MTSCompact-Medium, sans-serif">
            Начальник: {`${boss.firstName} ${boss.lastName}`}
            </Typography>
        </Grid>
        )}

          {/* Контактная информация */}
          <Grid item sm={12}>
            <Typography variant="body2" color="text.secondary" fontFamily="MTSCompact-Medium, sans-serif">
              Город: {city}
            </Typography>
            {/* Контактная информация с иконкой почты */}
            <Typography variant="body2" color="text.secondary" fontFamily="MTSCompact-Medium, sans-serif">
              <EmailIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
              <Link href={`mailto:${email}`}>{email}</Link>
            </Typography>
          </Grid>

          {/* Номер телефона */}
          {phoneNumber && (
            <Grid item sm={12}>
              <Typography variant="body2" color="text.secondary" fontFamily="MTSCompact-Medium, sans-serif">
                <PhoneIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                {phoneNumber}
              </Typography>
            </Grid>
          )}

          {/* Ссылка на календарь с иконкой календаря */}
          <Grid item sm={12}>
            <Typography variant="body2" color="text.secondary" fontFamily="MTSCompact-Medium, sans-serif">
              <CalendarIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
              <Link href={calendarLink} target="_blank" rel="noopener noreferrer">
                Календарь сотрудника
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;