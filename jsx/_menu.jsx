var Menu = props => 
<ul className="pure-menu-list inverted">
    <li className={ props.type == 'pages' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
        <a href="#" onClick={ props.menuClickHandler } className="pure-menu-link" data-action='pages'>pages</a>
    </li>
    <li className={ props.type == 'items' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
        <a href="#" onClick={ props.menuClickHandler } className="pure-menu-link" data-action='items'>items</a>
    </li>
    <li className={ props.type == 'categories' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
        <a href="#" onClick={ props.menuClickHandler } className="pure-menu-link" data-action='categories'>categories</a>
    </li>
    <li className={ props.type == 'images' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
        <a href="#" onClick={ props.menuClickHandler } className="pure-menu-link" data-action='images'>images</a>
    </li>
    <li className={ props.type == 'menu' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
        <a href="#" onClick={ props.menuClickHandler } className="pure-menu-link" data-action='menu'>menu</a>
    </li>
    <li className={ props.type == 'logout' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
        <a href="#" onClick={ props.menuClickHandler } className="pure-menu-link" data-action='logout'>logout</a>
    </li>
</ul>

export default Menu