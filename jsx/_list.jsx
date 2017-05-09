export default class ListControl extends React.Component {
    render() {
        return (
        		<div className="pure-menu">
			     <span className="pure-menu-heading">{ this.props.listheading }</span>
			     <ul className="pure-menu-list">
				  {
				  	this.props.list.map (
				  		(list) => <li className='pure-menu-item' key={ list.id }>
				  		<a href="#" onClick={ this.props.listClickHandler } className="pure-menu-link" data-item={ list.slug }>{ list.name }</a>
				  		</li>
      				)
				  }
			     </ul>
			    </div>
       	);
    }
}