import { useState, useCallback } from 'react';
import logo from '../assets/logo/Group.png';
import searchIcon from '../assets/busca/Lupa/shape.png';
import { Link } from 'react-router-dom';

function Header({ mostrarDescricao = true, className, setSearchTerm }) {
  const [searchValue, setSearchValue] = useState('');

  // Função para lidar com a mudança do campo de busca
  const handleSearchChange = useCallback((event) => {
    const value = event.target.value;
    setSearchValue(value);
    setSearchTerm(value);  // Passa o valor da busca para o componente pai
  }, [setSearchTerm]);

  return (
    <header className={className}>
      <Link to={'/'}>
        <img src={logo} alt="Marvel logo" className="logo" />
      </Link>
      {mostrarDescricao && (
        <div style={{ textAlign: 'center' }}>
          <h1>EXPLORE O UNIVERSO</h1>
          <p>
            Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - 
            e aqueles que você descobrirá em breve!
          </p>
        </div>
      )}
      <div className="search">
        <img src={searchIcon} alt="Ícone de busca" />
        <input 
          type="text" 
          placeholder="Procure por heróis"
          value={searchValue}
          onChange={handleSearchChange}  // Atualiza o valor da busca
        />
      </div>
    </header>
  );
}

export default Header;
