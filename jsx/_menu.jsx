export default class MenuControl extends React.Component {
    render() {
        return (
            <ul className="pure-menu-list inverted">
                <li className={ this.props.type == 'pages' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
                    <a href="#" onClick={ this.props.menuClickHandler } className="pure-menu-link" data-action='pages'>pages</a>
                </li>
                <li className={ this.props.type == 'items' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
                    <a href="#" onClick={ this.props.menuClickHandler } className="pure-menu-link" data-action='items'>items</a>
                </li>
                <li className={ this.props.type == 'categories' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
                    <a href="#" onClick={ this.props.menuClickHandler } className="pure-menu-link" data-action='categories'>categories</a>
                </li>
                <li className={ this.props.type == 'menu' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
                    <a href="#" onClick={ this.props.menuClickHandler } className="pure-menu-link" data-action='menu'>menu</a>
                </li>
                <li className={ this.props.type == 'logout' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
                    <a href="#" onClick={ this.props.menuClickHandler } className="pure-menu-link" data-action='logout'>logout</a>
                </li>
            </ul>
        );
    }
}