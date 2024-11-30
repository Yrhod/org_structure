import React from 'react';
import ProfileCardList from './pages/ProfileCardList';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Это может быть дополнительная секция справа */}
      <div style={{ width: '67%', padding: '20px' }}>
        {/* Контент слева (например, описание, другая информация) */}
      </div>
      <div style={{ width: '33%', padding: '20px' }}>
        <ProfileCardList />
      </div>
    </div>
  );
};
export default App;

