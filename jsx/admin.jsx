import update from 'immutability-helper';
import MenuControl from './_menu';
import ListControl from './_list';
import EditorControl from './_editor';

class Admin extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
        	type: '',
            view: '',
            list: [],
            item: {}
        };
    }

    menuClickHandler(event) {
        var slug = event.target.getAttribute('data-list');
        jQuery.getJSON({ 
            url: '/admin/' + slug,
            statusCode: {
                403: function(xhr) {
                    window.console && console.log(xhr.responseText);
                    window.location.replace('/login');
                    }
                }
        }).done(data => {
            const newState = update(this.state, {
                type: {$set: slug},
                view: {$set:'list'},
                list: {$set: data}
            });
            this.setState(newState);
        });
    }

    listClickHandler(event) {
        var slug = event.target.getAttribute('data-item');
        var type = this.state.type;

        jQuery.getJSON({ 
            url: '/admin/' + type + '/' + slug,
            statusCode: { 
                403: function(xhr) {
                    window.console && console.log(xhr.responseText);
                    window.location.replace('/login');
                    }
                }
        }).done(data => {
            if (data.length > 0) {
                const newState = update(this.state, {
                    view: {$set:'editor'},
                    item: {$set: data[0]}
                });
                this.setState(newState);
            }
        });
    }

    render() {
    	return(
    		<div class="pure-g wrapper admin" id="container">
			    <div className="pure-u-1-5 inverted">
			        <div className="pure-menu">
			     		<span className="pure-menu-heading">admin</span>
					<MenuControl 
						type={ this.state.type } 
						menuClickHandler = { this.menuClickHandler.bind(this) } 
					/>
					</div>
			    </div>
                <div className="pure-u-4-5">
                { this.state.view == 'list'?
                    <ListControl 
                        listheading={ this.state.type }
                        list={ this.state.list }
                        listClickHandler = { this.listClickHandler.bind(this) } 
                    /> : ''
                }
                { this.state.view == 'editor'?
                    <EditorControl
                        type = { this.state.type }
                        list = { this.state.item }
                    /> : ''
                }
                </div>
		    </div>
    	);
    }
}

ReactDOM.render(
    <Admin />,
    document.getElementById('container')
);