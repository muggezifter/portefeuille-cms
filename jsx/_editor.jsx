export default
class EditorControl extends React.Component {
    render() {
        return (<div className="editor">{ this.props.type == 'categories' ?
            <CategoryEditorControl
                item={ this.props.item }
                inputChangeHandler={ this.props.inputChangeHandler }
            /> : <ItemEditorControl
            	type={ this.props.type }
            	item={ this.props.item }
            	inputChangeHandler={ this.props.inputChangeHandler }
            	itemSaveHandler={ this.props.itemSaveHandler }
            	formResetHandler={ this.props.formResetHandler }
        	/>
            }</div>);
    }
}

class ItemEditorControl extends React.Component {
    render() {
        return (
            <form className="pure-form pure-form-aligned">
                <h1 className="item-title">{this.props.type} :: { this.props.item.title || 'new item' }</h1>
                <fieldset>
                    <div className="pure-control-group">
                        <label for="title">title</label>
                        <input name="title" className="pure-u-3-4" type="text" value={ this.props.item.title } onChange={ this.props.inputChangeHandler } />
                    </div>
                    <div className="pure-control-group">
                        <label for="slug">slug</label>
                        <input name="slug" type="text" placeholder="slug" value={ this.props.item.slug } onChange={ this.props.inputChangeHandler } />
                    </div>
       			{ this.props.type == "items" ?
                    <div className="pure-control-group">
                        <label for="details">details</label>
                        <input name="details" className="pure-u-3-4" type="text" placeholder="details" value={ this.props.item.details }  onChange={ this.props.inputChangeHandler } />
                    </div> : ''
                    }
       			{ this.props.type == "items" ?
                    <div className="pure-control-group">
                        <label for="thumbnail">thumbnail</label>
                        <input name="thumbnail" type="text" placeholder="thumbnail" value={ this.props.item.thumbnail } onChange={ this.props.inputChangeHandler } />
                    </div> : ''
                    }
				{ this.props.type == "items" ?
                    <div className="pure-control-group">
                        <label for="textcol">text</label>
                        <textarea className="pure-u-3-4 htmledit" name="textcol">{ this.props.item.textcol }</textarea>
                    </div> : ''
                    }
                    <div className="pure-control-group">
                        <label for="raw">raw</label>
                        <textarea className="pure-u-3-4 htmledit" name="raw">{ this.props.item.raw }</textarea>
                    </div>
       			{ this.props.type == "pages" ?
                    <div className="pure-controls">
                        <label for="in_menu" class="pure-checkbox">
                            <input name="in_menu" type="checkbox" checked={ this.props.item.in_menu == 1 } onChange={ this.props.inputChangeHandler } />
                            show in menu
                        </label>
                    </div> : ''
                    }
                    <div className="pure-controls">
                        <label for="online" class="pure-checkbox">
                            <input name="online" type="checkbox" checked={ this.props.item.online == 1 } onChange={ this.props.inputChangeHandler } />
                            published
                        </label>
                    </div>
                    <div className="pure-controls">
                    	<button type="reset"  onClick={ this.props.formResetHandler } className="pure-button editorbutton"><i className="fa fa-undo"></i> reset</button> 
                        <button type="submit" onClick={ this.props.itemSaveHandler } className="pure-button pure-button-primary"><i className="fa fa-save"></i> save</button>
                    </div>
                </fieldset>
            </form>
        );
    }
}

class CategoryEditorControl extends React.Component {
    render() {
        return (
            <form className="pure-form pure-form-stacked">
                <h1 className="item-title">{ this.props.item.name || 'new category' }</h1>
            </form>
        );
    }
}