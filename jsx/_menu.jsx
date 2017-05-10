export default class MenuControl extends React.Component {
    render() {
        return (
			     <ul className="pure-menu-list inverted">
			         <li className={ this.props.type=='pages'? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
			            <a href="#" onClick={ this.props.menuClickHandler } className="pure-menu-link" data-list='pages'>pages</a>
			         </li>
			         <li className={ this.props.type=='items'? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
			             <a href="#" onClick={ this.props.menuClickHandler } className="pure-menu-link" data-list='items'>items</a>
			         </li>
			         <li className={ this.props.type=='categories'? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' }>
			             <a href="#" onClick={ this.props.menuClickHandler } className="pure-menu-link" data-list='categories'>categories</a>
			         </li>
			    </ul>
       	);
    }
}