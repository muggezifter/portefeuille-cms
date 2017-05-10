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
        />
            }</div>);
    }
}

class ItemEditorControl extends React.Component {
    render() {
        return (
            <form className="pure-form pure-form-aligned">
                <h1 className="item-title">{this.props.type}: { this.props.item.title || 'new item' }</h1>
                <fieldset>
                    <div className="pure-control-group">
                        <label for="email">title</label>
                        <input id="title" type="title" placeholder="title" value={ this.props.item.title }/>
                    </div>
                    <div className="pure-control-group">
                        <label for="email">slug</label>
                        <input id="slug" type="slug" placeholder="slug" value={ this.props.item.slug }/>
                    </div>
       			{ this.props.type == "items" ?
                    <div className="pure-control-group">
                        <label for="email">details</label>
                        <input id="details" type="details" placeholder="details" value={ this.props.item.details }/>
                    </div> : ''
                    }
       			{ this.props.type == "items" ?
                    <div className="pure-control-group">
                        <label for="thumbnail">thumbnail</label>
                        <input id="thumbnail" type="thumbnail" placeholder="thumbnail" value={ this.props.item.details }/>
                    </div> : ''
                    }
				{ this.props.type == "items" ?
                    <div className="pure-control-group">
                        <label for="textcol">text</label>
                        <textarea className="pure-u-4-5 htmledit" id="textcol">{ this.props.item.raw }</textarea>
                    </div> : ''
                    }
                    <div className="pure-control-group">
                        <label for="raw">raw</label>
                        <textarea className="pure-u-4-5 htmledit" id="raw">{ this.props.item.raw }</textarea>
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
                        <button type="submit" className="pure-button pure-button-primary">Submit</button>
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