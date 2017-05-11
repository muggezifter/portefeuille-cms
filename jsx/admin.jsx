import update from 'immutability-helper';
import MenuControl from './_menu';
import ListControl from './_list';
import EditorControl from './_editor';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            view: '',
            list: [],
            item: {}
        };
    }

    /**
     *
     * @param event
     */
    menuClickHandler(event) {
        event.preventDefault();
        const slug = event.target.getAttribute('data-action');
        switch (slug) {
            case 'menu':
                this.menuActionMenu();
                break;
            case 'logout':
                this.menuActionLogout();
                break;
            default:
                this.menuActionDefault(slug)
        }
    }

    /**
     *
     * @param slug
     */
    menuActionDefault(slug) {
        jQuery.getJSON({
            url: '/admin/' + slug,
            statusCode: {
                403: function (xhr) {
                    window.console && console.log(xhr.responseText);
                    window.location.replace('/login');
                }
            }
        }).done(data => {
            const newState = update(this.state, {
                type: {$set: slug},
                view: {$set: 'list'},
                list: {$set: data}
            });
            this.setState(newState);
        });
    }

    /**
     *
     */
    menuActionLogout() {
        jQuery.getJSON({
            url: '/admin/logout',
            statusCode: {
                403: function (xhr) {
                    window.console && console.log(xhr.responseText);
                    window.location.replace('/login');
                }
            }
        }).done(data => {
            const newState = update(this.state, {
                type: {$set: "logout"}
            });
            this.setState(newState);
        });
    }

    /**
     *
     */
    menuActionMenu() {
        const newState = update(this.state, {
            type: {$set: "menu"}
        });
        this.setState(newState);
        alert("menu");
    }

    /**
     *
     * @param string
     * @returns {*}
     */
    singular(string) {
        const singular = {
            pages: 'page',
            items: 'item',
            categories: 'category'
        }
        return (singular[string] || string);
    }

    /**
     *
     * @param event
     */
    listClickHandler(event) {
        event.preventDefault();
        const slug = event.target.getAttribute('data-item');
        const type = this.state.type;
        if (slug) {
            this.getItem(type, slug);
        } else {
            const newState = update(this.state, {
                view: {$set: 'editor'},
                item: {$set: {title: '[new ' + this.singular(type) + ']'}}
            });
            this.setState(newState);
        }
    }

    /**
     *
     * @param type
     * @param slug
     */
    getItem(type, slug) {
        jQuery.getJSON({
            url: '/admin/' + type + '/' + slug,
            statusCode: {
                403: function (xhr) {
                    window.console && console.log(xhr.responseText);
                    window.location.replace('/login');
                }
            }
        }).done(data => {
            if (data.length > 0) {
                const newState = update(this.state, {
                    view: {$set: 'editor'},
                    slug: {$set: slug},
                    item: {$set: data[0]}
                });
                this.setState(newState);
            }
        });
    }

    /**
     *
     * @param event
     */
    inputChangeHandler(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const newState = update(this.state, {

            item: {
                [name]: {$set: value}
            }
        });
        this.setState(newState);
    }

    /**
     *
     * @param event
     */
    itemSaveHandler(event) {
        event.preventDefault();
        alert("save");
    }

    /**
     *
     */
    formResetHandler() {
        this.getItem(this.state.type, this.state.slug);
    }

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="pure-g wrapper admin">
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
                { this.state.view == 'list' ?
                    <ListControl
                        singular={ this.singular }
                        listheading={ this.state.type }
                        list={ this.state.list }
                        listClickHandler = { this.listClickHandler.bind(this) }
                    /> : ''
                    }
                { this.state.view == 'editor' ?
                    <EditorControl
                        type = { this.state.type }
                        item = { this.state.item }
                        inputChangeHandler = { this.inputChangeHandler.bind(this) }
                        itemSaveHandler = { this.itemSaveHandler.bind(this) }
                        formResetHandler = { this.formResetHandler.bind(this) }
                    /> : ''
                    }
                </div>
            </div>
        );
    }
}


var d = {key: "value"};
ReactDOM.render(
    <Admin initialdata={ d } />,
    document.getElementById('container')
);