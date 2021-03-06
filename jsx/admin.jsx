import update from 'immutability-helper';
import Menu from './components/menu';
import List from './components/list';
import ItemEditor from './components/item_editor';
import CategoryEditor from './components/category_editor';
import ImageEditor from './components/image_editor';
import MenuEditor from './components/menu_editor';
import * as nav from './lib/nav';
import * as item from './lib/item';
import * as image from './lib/image';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors:{}
        };
        update.extend('$unset', function(keysToRemove, original) {
  var copy = Object.assign({}, original)
  for (const key of keysToRemove) delete copy[key]
  return copy
});
    }

    setFlashMessage(type,text) {
        const message = { type: type, text : text };
        const newState = update(this.state, {
            flashmessage:  { $set: message }        
        });
        this.setState(newState);
        setTimeout(() => {
            const newState = update(this.state, {
                flashmessage:  { $set: null }  
            });
            this.setState(newState);
        }, 2000);
    }

    setError(fieldname,message) {
        const error = { [fieldname] : message };
        const newState = update(this.state, {
            errors: { $merge: error }           
        });
        this.setState(newState);
    }

    clearError(fieldname) {
        var errors = this.state.errors; 
        delete errors[fieldname];
        const newState = update(this.state, {
            errors: { $set: errors }            
        });
        this.setState(newState);
    }

    getItem(type, id) {
        this.getFromApi('/admin/' + type + '/' + id, data => {
            if (data.length > 0) {
                const newState = update(this.state, {
                    view: {$set: 'editor'},
                    item: {$set: data[0]}
                });
                this.setState(newState);
            }
        });
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

    postToApi(url,data,callback) {
        jQuery.post({
            url: url,
            data: data,
            dataType: 'json',
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
                    flashmessage={ this.state.flashmessage }
                    resetHandler={ item.resetHandler.bind(this) }
                    saveHandler={ item.saveHandler.bind(this) }
                    changeHandler={ item.changeHandler.bind(this) }
                />;
                break;
            case 'images':
                return <ImageEditor 
                    errors={ this.state.errors }
                    folders={ this.state.images }
                    flashmessage={ this.state.flashmessage }
                    new_folder_name={ this.state.new_folder_name }
                    open_folder={ this.state.open_folder }
                    selected_image_id={ this.state.selected_image_id }
                    setOpenFolder={ image.setOpenFolder.bind(this) }
                    changeHandler={ image.changeHandler.bind(this) }
                    uploadHandler={ image.uploadHandler.bind(this)}
                    createFolder={ image.createFolder.bind(this) }
                    deleteFolder={ image.deleteFolder.bind(this) }
                    selectImage={ image.selectImage.bind(this) }
                    deleteImage={ image.deleteImage.bind(this) }
                    moveImageToFolder={ image.moveImageToFolder.bind(this) }
                />
                break;
            case 'menu':
                return <MenuEditor />
                break;
            default: 
                return <ItemEditor
                    type={ this.state.type }
                    item={ this.state.item }
                    flashmessage={ this.state.flashmessage }
                    changeHandler={ item.changeHandler.bind(this) }
                    saveHandler={ item.saveHandler.bind(this) }
                    resetHandler={ item.resetHandler.bind(this) }
                    pickImage = { item.pickImage.bind(this) }
                    removeImage = { item.removeImage.bind(this) }
                />;
            }
    }

    render() {
        return (
            <div className="pure-g wrapper admin">
                <div className="menu-sidebar inverted">
                    <div className="pure-menu">
                        <span className="pure-menu-heading">admin</span>
                        <Menu
                            action={ this.state.type }
                            menuClickHandler = { nav.menuClickHandler.bind(this) }
                        />
                    </div>
                </div>
                <div className="admin-page">
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