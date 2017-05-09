import update from 'immutability-helper';
import MenuControl from './_menu';
import ListControl from './_list';

class Admin extends React.Component{
	constructor(props) {
        super(props);
        this.state={
        	menu : {
        		active :''
        	},
            view: '',
            list : []
        };
    }

    menuClickHandler(event) {
        var list = event.target.getAttribute('data-list');
        jQuery.getJSON("/admin/"+list)
            .done(data => {
                const newState = update(this.state, {
                    menu: {
                        active: {$set: list}
                    },
                    view: {$set :'list'},
                    list: {$set: data}
                });
                this.setState(newState);

        });

    }

    listClickHandler(event) {
        var item = event.target.getAttribute('data-item');
    }

    render() {
    	return(
    		<div class="pure-g wrapper admin" id="container">
			    <div className="pure-u-1-5 inverted">
			        <div className="pure-menu">
			     		<span className="pure-menu-heading">admin</span>
					<MenuControl 
						menu={ this.state.menu } 
						menuClickHandler = { this.menuClickHandler.bind(this) } 
					/>
					</div>
			    </div>
                <div className="pure-u-4-5 bgwhite">
                <ListControl 
                    listheading={ this.state.menu.active }
                    list={ this.state.list }
                    listClickHandler = { this.listClickHandler.bind(this) } 
                />
                </div>
		    </div>
    	);
    }
}

ReactDOM.render(
    <Admin />,
    document.getElementById('container')
);