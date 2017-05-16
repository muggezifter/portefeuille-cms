'use strict'

import update from 'immutability-helper';
import Menu from './components/menu';
import List from './components/list';
import ItemEditor from './components/item_editor';
import CategoryEditor from './components/category_editor';
import ImageEditor from './components/image_editor';
import MenuEditor from './components/menu_editor';
import * as nav from './lib/nav';
import * as item from './lib/item';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getItem(type, slug) {
        this.getFromApi('/admin/' + type + '/' + slug,data => {
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

    validate(name,value) {
        switch (name) {
            case 'folder_name':
                if( /[^a-zA-Z0-9]/.test(value) ) {
                    this.setError(name, 'invalid folder name');
                    return false;
                }
                break;
        }
        return true;
    }

    setError(target,errorMessage) {
        const newState = update(this.state, {
            current_error: {$set : { target: target, message: errorMessage}}
            });
        this.setState(newState);
    }

    setOpenFolder(event) {
        event.preventDefault();
        const id = event.target.getAttribute('data-folderid');
        const opened_folder = this.state.images.filter(item=>item.id==id);
        const newState = update(this.state, {
            open_folder: {$set: opened_folder}
        });
        this.setState(newState);
    }

    singular(string) {
        const singular = {
            pages: 'page',
            items: 'item',
            categories: 'category'
        }
        return (singular[string] || string);
    }

    getFromApi(url,callback) {
        jQuery.getJSON({
            url: url,
            statusCode: {
                403: function (xhr) {
                    window.console && console.log(xhr.responseText);
                    window.location.replace('/login');
                }
            }
        }).done(callback);
    }

    getEditor() {
        switch(this.state.type) {
            case 'categories':
                return <CategoryEditor
                    item={ this.state.item }
                    itemInputChangeHandler={ item.changeHandler.bind(this) }
                />;
                break;
            case 'images':
                return <ImageEditor 
                    folders={ this.state.images }
                    open_folder={ this.state.open_folder }
                    setOpenFolder={ this.setOpenFolder.bind(this) }
                    itemInputChangeHandler={ item.changeHandler.bind(this) }
                />
                break;
            case 'menu':
                return <MenuEditor />
                break;
            default: 
                return <ItemEditor
                    type={ this.state.type }
                    item={ this.state.item }
                    changeHandler={ item.changeHandler.bind(this) }
                    saveHandler={ item.saveHandler.bind(this) }
                    resetHandler={ item.resetHandler.bind(this) }
                />;
            }
    }

    render() {
        return (
            <div className="pure-g wrapper admin">
                <div className="pure-u-1-5 inverted">
                    <div className="pure-menu">
                        <span className="pure-menu-heading">admin</span>
                        <Menu
                            action={ this.state.type }
                            menuClickHandler = { nav.menuClickHandler.bind(this) }
                        />
                    </div>
                </div>
                <div className="pure-u-4-5">
                { this.state.view == 'list' 
                    ? <List
                        type={ this.singular(this.state.type) }
                        action={ this.state.type }
                        list={ this.state.list }
                        listClickHandler = { nav.listClickHandler.bind(this) }
                      /> 
                    : ''
                }
                { this.state.view == 'editor' 
                    ? this.getEditor() 
                    : ''
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