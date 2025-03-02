import logo from '../assets/logo/Group.png'
import searchIcon from '../assets/busca/Lupa/shape.png'

function Header(mostrarDescricao = true) {  // Padrão: true (evita precisar definir sempre)
  return (
        <header>
            <img src={logo} alt="Marvel logo" className='logo' />
            <h1>EXPLORE O UNIVERSO</h1>
            {
                mostrarDescricao ?
                    <p>Mergulhe no domínio deslumbrante de todos 
                    os personagens clássicos que você ama - e aqueles
                    que você descobrirá em breve!
                    </p> 
                : ''
            }
    
            <div className="search">
              <img src={searchIcon} alt="" />
              <input type="text" placeholder="Procure por heróis" />
            </div>
        </header>
  )
}

export default Header