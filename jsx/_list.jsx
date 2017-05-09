export default class ListControl extends React.Component {
    render() {
        return (
        		<div className="pure-menu">
			     <span className="pure-menu-heading">{ this.props.listheading }</span>
			     <ul className="pure-menu-list">
				  {
				  	this.props.list.map (
				  		(list) => <li className='pure-menu-item'>
				  		<a href="#" onClick={ this.props.listClickHandler } className="pure-menu-link" data-item='items'>{ list.name }</a>
				  		</li>
      				)
				  }
			     </ul>
			    </div>
       	);
    }
}