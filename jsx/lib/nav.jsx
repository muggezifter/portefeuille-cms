import update from 'immutability-helper';

function _menuActionMenu(){
    const newState = update(this.state, {
            view: {$set: 'editor'},
            type: {$set: "menu"}
        });
    this.setState(newState);
}

function _menuActionLogout(){
    this.getFromApi('/admin/logout',data => {
        const newState = update(this.state, {
            type: {$set: "logout"}
        });
        this.setState(newState);
    });
}

function _menuActionImages(){
    this.getFromApi('/admin/images',data => {
        const newState = update(this.state, {
            images: {$set: data},
            view: {$set: 'editor'},
            type: {$set: "images"}
        });
        this.setState(newState);
    });
}

function _menuActionDefault(action){
    this.getFromApi('/admin/' + action,data => {
        const newState = update(this.state, {
            type: {$set: action},
            view: {$set: 'list'},
            list: {$set: data}
        });
        this.setState(newState);
    });
}

function menuClickHandler(event) {
    event.preventDefault();
    const action = event.target.getAttribute('data-action');
    switch (action) {
        case 'menu':
            _menuActionMenu.call(this);
            break;
        case 'logout':
            _menuActionLogout.call(this);
            break;
        case 'images':
            _menuActionImages.call(this);
            break;
        default:
            _menuActionDefault.call(this,action);
    }
}

function listClickHandler(event){
    event.preventDefault();
    const id = event.target.getAttribute('data-item-id');
    const type = this.state.type;
    //if (slug) {
    this.getItem(type, id);
    //} else {
    //    const newState = update(this.state, {
    //        view: {$set: 'editor'},
    //        item: {$set: {title: '[new ' + this.singular(type) + ']'}}
    //    });
    //    this.setState(newState);
    //}
}

export { menuClickHandler, listClickHandler }
