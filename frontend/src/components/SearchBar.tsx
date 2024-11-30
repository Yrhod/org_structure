import React from 'react';

const SearchBar: React.FC = () => {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const query = (form.elements.namedItem('searchInput') as HTMLInputElement).value.trim();
    if (query) {
      console.log(`Поиск по запросу: ${query}`);
    }
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSearch}
      style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: '450px',
      }}
    >
      {/* Обёртка для поля ввода */}
      <div
        className="search-wrapper"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '12px',
          padding: '0 8px',
          height: '48px', // Фиксированная высота
          boxSizing: 'border-box',
          transition: 'border-color 0.3s',
        }}
      >
        <div
          className="search-icon"
          style={{
            width: '34px',
            height: '34px',
            backgroundImage: 'url("https://static.mts.ru/mts_rf/images/magnifier.svg")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            marginRight: '8px',
          }}
        />
        <input
          type="text"
          name="searchInput"
          placeholder="Введите запрос"
          className="search-input"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            padding: '0', // Убираем padding для синхронизации высоты
            height: '100%', // Растягиваем на 100% высоты родителя
            boxSizing: 'border-box',
          }}
          onFocus={(e) =>
            (e.currentTarget.parentElement!.style.borderColor = 'black')
          }
          onBlur={(e) =>
            (e.currentTarget.parentElement!.style.borderColor = '#ddd')
          }
        />
      </div>
      {/* Кнопка поиска */}
      <button
        type="submit"
        className="search-button"
        style={{
          marginLeft: '8px',
          backgroundColor: 'rgb(237, 28, 36)',
          border: 'none',
          borderRadius: '8px',
          padding: '0 16px', // Устанавливаем горизонтальный padding
          fontSize: '16px',
          fontFamily: 'MTSCompact-Medium, sans-serif',
          color: '#fff',
          height: '48px', // Та же высота, что и у поля ввода
          lineHeight: '48px', // Выравниваем текст по центру
          cursor: 'pointer',
          transition: 'transform 0.3s',
          boxSizing: 'border-box',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = 'scale(1.05)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = 'scale(1)')
        }
      >
        Найти
      </button>
    </form>
  );
};

export default SearchBar;
