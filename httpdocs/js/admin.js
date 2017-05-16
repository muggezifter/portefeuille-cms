(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _menu = require('./components/menu');

var _menu2 = _interopRequireDefault(_menu);

var _list = require('./components/list');

var _list2 = _interopRequireDefault(_list);

var _item_editor = require('./components/item_editor');

var _item_editor2 = _interopRequireDefault(_item_editor);

var _category_editor = require('./components/category_editor');

var _category_editor2 = _interopRequireDefault(_category_editor);

var _image_editor = require('./components/image_editor');

var _image_editor2 = _interopRequireDefault(_image_editor);

var _menu_editor = require('./components/menu_editor');

var _menu_editor2 = _interopRequireDefault(_menu_editor);

var _nav = require('./lib/nav');

var nav = _interopRequireWildcard(_nav);

var _item = require('./lib/item');

var item = _interopRequireWildcard(_item);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Admin = function (_React$Component) {
    _inherits(Admin, _React$Component);

    function Admin(props) {
        _classCallCheck(this, Admin);

        var _this = _possibleConstructorReturn(this, (Admin.__proto__ || Object.getPrototypeOf(Admin)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Admin, [{
        key: 'getItem',
        value: function getItem(type, slug) {
            var _this2 = this;

            this.getFromApi('/admin/' + type + '/' + slug, function (data) {
                if (data.length > 0) {
                    var newState = (0, _immutabilityHelper2.default)(_this2.state, {
                        view: { $set: 'editor' },
                        slug: { $set: slug },
                        item: { $set: data[0] }
                    });
                    _this2.setState(newState);
                }
            });
        }
    }, {
        key: 'validate',
        value: function validate(name, value) {
            switch (name) {
                case 'folder_name':
                    if (/[^a-zA-Z0-9]/.test(value)) {
                        this.setError(name, 'invalid folder name');
                        return false;
                    }
                    break;
            }
            return true;
        }
    }, {
        key: 'setError',
        value: function setError(target, errorMessage) {
            var newState = (0, _immutabilityHelper2.default)(this.state, {
                current_error: { $set: { target: target, message: errorMessage } }
            });
            this.setState(newState);
        }
    }, {
        key: 'setOpenFolder',
        value: function setOpenFolder(event) {
            event.preventDefault();
            var id = event.target.getAttribute('data-folderid');
            var opened_folder = this.state.images.filter(function (item) {
                return item.id == id;
            });
            var newState = (0, _immutabilityHelper2.default)(this.state, {
                open_folder: { $set: opened_folder }
            });
            this.setState(newState);
        }
    }, {
        key: 'singular',
        value: function singular(string) {
            var singular = {
                pages: 'page',
                items: 'item',
                categories: 'category'
            };
            return singular[string] || string;
        }
    }, {
        key: 'getFromApi',
        value: function getFromApi(url, callback) {
            jQuery.getJSON({
                url: url,
                statusCode: {
                    403: function _(xhr) {
                        window.console && console.log(xhr.responseText);
                        window.location.replace('/login');
                    }
                }
            }).done(callback);
        }
    }, {
        key: 'getEditor',
        value: function getEditor() {
            switch (this.state.type) {
                case 'categories':
                    return React.createElement(_category_editor2.default, {
                        item: this.state.item,
                        itemInputChangeHandler: item.changeHandler.bind(this)
                    });
                    break;
                case 'images':
                    return React.createElement(_image_editor2.default, {
                        folders: this.state.images,
                        open_folder: this.state.open_folder,
                        setOpenFolder: this.setOpenFolder.bind(this),
                        itemInputChangeHandler: item.changeHandler.bind(this)
                    });
                    break;
                case 'menu':
                    return React.createElement(_menu_editor2.default, null);
                    break;
                default:
                    return React.createElement(_item_editor2.default, {
                        type: this.state.type,
                        item: this.state.item,
                        changeHandler: item.changeHandler.bind(this),
                        saveHandler: item.saveHandler.bind(this),
                        resetHandler: item.resetHandler.bind(this)
                    });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'pure-g wrapper admin' },
                React.createElement(
                    'div',
                    { className: 'pure-u-1-5 inverted' },
                    React.createElement(
                        'div',
                        { className: 'pure-menu' },
                        React.createElement(
                            'span',
                            { className: 'pure-menu-heading' },
                            'admin'
                        ),
                        React.createElement(_menu2.default, {
                            action: this.state.type,
                            menuClickHandler: nav.menuClickHandler.bind(this)
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'pure-u-4-5' },
                    this.state.view == 'list' ? React.createElement(_list2.default, {
                        type: this.singular(this.state.type),
                        action: this.state.type,
                        list: this.state.list,
                        listClickHandler: nav.listClickHandler.bind(this)
                    }) : '',
                    this.state.view == 'editor' ? this.getEditor() : ''
                )
            );
        }
    }]);

    return Admin;
}(React.Component);

ReactDOM.render(React.createElement(Admin, null), document.getElementById('container'));

},{"./components/category_editor":2,"./components/image_editor":3,"./components/item_editor":4,"./components/list":5,"./components/menu":6,"./components/menu_editor":7,"./lib/item":8,"./lib/nav":9,"immutability-helper":10}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var CategoryEditor = function CategoryEditor(props) {
    return React.createElement(
        "div",
        { className: "editor" },
        React.createElement(
            "form",
            { className: "pure-form pure-form-stacked" },
            React.createElement(
                "h1",
                { className: "item-title" },
                "categories :: ",
                props.item.title || 'new category'
            )
        )
    );
};

exports.default = CategoryEditor;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ImageEditor = function ImageEditor(props) {
    return React.createElement(
        "div",
        { className: "editor" },
        React.createElement(
            "h1",
            { className: "item-title" },
            "images ",
            props.open_folder && props.open_folder.length ? ' : ' + props.open_folder[0].name : ''
        ),
        React.createElement(
            "div",
            { className: "pure-u-1-3" },
            React.createElement(
                "ul",
                null,
                props.folders.map(function (folder) {
                    return React.createElement(
                        "li",
                        { className: "pure-menu-item", key: folder.id },
                        React.createElement(
                            "a",
                            { className: props.open_folder && props.open_folder[0].id == folder.id ? "folder active" : "folder ", onClick: props.setOpenFolder, "data-folderid": folder.id },
                            React.createElement("i", { className: "fa fa-folder", "data-folderid": folder.id }),
                            folder.name
                        )
                    );
                })
            )
        ),
        React.createElement(FolderContents, {
            content: props.open_folder && props.open_folder.length ? props.open_folder[0].images : null
        }),
        React.createElement(
            "form",
            { className: "pure-form pure-u-1" },
            React.createElement("br", null),
            React.createElement(
                "fieldset",
                null,
                React.createElement(
                    "legend",
                    null,
                    "create a new folder"
                ),
                React.createElement(
                    "label",
                    { "for": "folder_name" },
                    React.createElement("input", { type: "text", name: "folder_name", onChange: props.itemInputChangeHandler })
                ),
                React.createElement(
                    "button",
                    { type: "submit", className: "pure-button pure-button-primary" },
                    "submit"
                )
            )
        ),
        React.createElement(
            "form",
            { className: "pure-form pure-form-stacked pure-u-1" },
            React.createElement("br", null),
            React.createElement(
                "fieldset",
                null,
                React.createElement(
                    "legend",
                    null,
                    "add an image"
                ),
                React.createElement("input", { type: "file", name: "image" })
            )
        )
    );
};

var FolderContents = function FolderContents(props) {
    return React.createElement(
        "div",
        { className: "pure-u-1-2" },
        props.content ? props.content.length == 0 ? '[empty]' : props.content.map(function (image) {
            return React.createElement("img", { src: image.url, height: "80" });
        }) : ''
    );
};

exports.default = ImageEditor;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ItemEditor = function ItemEditor(props) {
    return React.createElement(
        "div",
        { className: "editor" },
        React.createElement(
            "form",
            { className: "pure-form pure-form-aligned" },
            React.createElement(
                "h1",
                { className: "item-title" },
                props.type,
                " :: ",
                props.item.title || 'new item'
            ),
            React.createElement(
                "fieldset",
                null,
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { "for": "title" },
                        "title"
                    ),
                    React.createElement("input", { name: "title", className: "pure-u-3-4", type: "text", value: props.item.title, onChange: props.changeHandler })
                ),
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { "for": "slug" },
                        "slug"
                    ),
                    React.createElement("input", { name: "slug", type: "text", placeholder: "slug", value: props.item.slug, onChange: props.changeHandler })
                ),
                props.type == "items" ? React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { "for": "details" },
                        "details"
                    ),
                    React.createElement("input", { name: "details", className: "pure-u-3-4", type: "text", placeholder: "details", value: props.item.details, onChange: props.changeHandler })
                ) : '',
                props.type == "items" ? React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { "for": "thumbnail" },
                        "thumbnail"
                    ),
                    React.createElement("input", { name: "thumbnail", type: "text", placeholder: "thumbnail", value: props.item.thumbnail, onChange: props.changeHandler })
                ) : '',
                props.type == "items" ? React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { "for": "textcol" },
                        "text"
                    ),
                    React.createElement(
                        "textarea",
                        { className: "pure-u-3-4 htmledit", name: "textcol" },
                        props.item.textcol
                    )
                ) : '',
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { "for": "raw" },
                        "raw"
                    ),
                    React.createElement(
                        "textarea",
                        { className: "pure-u-3-4 htmledit", name: "raw" },
                        props.item.raw
                    )
                ),
                props.type == "pages" ? React.createElement(
                    "div",
                    { className: "pure-controls" },
                    React.createElement(
                        "label",
                        { "for": "in_menu", "class": "pure-checkbox" },
                        React.createElement("input", { name: "in_menu", type: "checkbox", checked: props.item.in_menu == 1, onChange: props.changeHandler }),
                        "show in menu"
                    )
                ) : '',
                React.createElement(
                    "div",
                    { className: "pure-controls" },
                    React.createElement(
                        "label",
                        { "for": "online", "class": "pure-checkbox" },
                        React.createElement("input", { name: "online", type: "checkbox", checked: props.item.online == 1, onChange: props.changeHandler }),
                        "published"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "pure-controls" },
                    React.createElement(
                        "button",
                        { type: "reset", onClick: props.resetHandler, className: "pure-button editorbutton" },
                        React.createElement("i", { className: "fa fa-undo" }),
                        "\xA0reset"
                    ),
                    React.createElement(
                        "button",
                        { type: "submit", onClick: props.saveHandler, className: "pure-button pure-button-primary" },
                        React.createElement("i", { className: "fa fa-save" }),
                        "\xA0save"
                    )
                )
            )
        )
    );
};

exports.default = ItemEditor;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var List = function List(props) {
    return React.createElement(
        "div",
        { className: "pure-menu" },
        React.createElement(
            "span",
            { className: "pure-menu-heading" },
            props.action
        ),
        React.createElement(
            "ul",
            { className: "pure-menu-list list" },
            props.list.map(function (list) {
                return React.createElement(
                    "li",
                    { className: "pure-menu-item", key: list.id },
                    React.createElement(
                        "a",
                        { href: "#", onClick: props.listClickHandler, className: "pure-menu-link", "data-item": list.slug },
                        list.name
                    )
                );
            }),
            React.createElement(
                "li",
                { className: "pure-menu-item", key: "0" },
                React.createElement(
                    "a",
                    { href: "#", onClick: props.listClickHandler, className: "pure-menu-link addnew", "data-item": "" },
                    "+ new ",
                    props.type
                )
            )
        )
    );
};

exports.default = List;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Menu = function Menu(props) {
    return React.createElement(
        'ul',
        { className: 'pure-menu-list inverted' },
        React.createElement(
            'li',
            { className: props.action == 'pages' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' },
            React.createElement(
                'a',
                { href: '#', onClick: props.menuClickHandler, className: 'pure-menu-link', 'data-action': 'pages' },
                'pages'
            )
        ),
        React.createElement(
            'li',
            { className: props.action == 'items' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' },
            React.createElement(
                'a',
                { href: '#', onClick: props.menuClickHandler, className: 'pure-menu-link', 'data-action': 'items' },
                'items'
            )
        ),
        React.createElement(
            'li',
            { className: props.action == 'categories' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' },
            React.createElement(
                'a',
                { href: '#', onClick: props.menuClickHandler, className: 'pure-menu-link', 'data-action': 'categories' },
                'categories'
            )
        ),
        React.createElement(
            'li',
            { className: props.action == 'images' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' },
            React.createElement(
                'a',
                { href: '#', onClick: props.menuClickHandler, className: 'pure-menu-link', 'data-action': 'images' },
                'images'
            )
        ),
        React.createElement(
            'li',
            { className: props.action == 'menu' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' },
            React.createElement(
                'a',
                { href: '#', onClick: props.menuClickHandler, className: 'pure-menu-link', 'data-action': 'menu' },
                'menu'
            )
        ),
        React.createElement(
            'li',
            { className: props.action == 'logout' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item' },
            React.createElement(
                'a',
                { href: '#', onClick: props.menuClickHandler, className: 'pure-menu-link', 'data-action': 'logout' },
                'logout'
            )
        )
    );
};

exports.default = Menu;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var MenuEditor = function MenuEditor() {
    return React.createElement(
        "div",
        { className: "editor" },
        React.createElement(
            "form",
            { className: "pure-form pure-form-stacked" },
            React.createElement(
                "h1",
                { className: "item-title" },
                "menu"
            )
        )
    );
};

exports.default = MenuEditor;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeHandler = changeHandler;
exports.saveHandler = saveHandler;
exports.resetHandler = resetHandler;

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function changeHandler(event) {
    var target = event.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    var name = target.name;

    //if (this.validate(target.name,value)) {
    var newState = (0, _immutabilityHelper2.default)(this.state, {
        item: _defineProperty({}, name, { $set: value })
    });
    this.setState(newState);
    //}
}

function saveHandler(event) {
    event.preventDefault();
    alert("save");
}

function resetHandler() {
    alert('reset');
    this.getItem(this.state.type, this.state.slug);
}

},{"immutability-helper":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listClickHandler = exports.menuClickHandler = undefined;

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _menuActionMenu() {
    var newState = (0, _immutabilityHelper2.default)(this.state, {
        view: { $set: 'editor' },
        type: { $set: "menu" }
    });
    this.setState(newState);
}

function _menuActionLogout() {
    var _this = this;

    this.getFromApi('/admin/logout', function (data) {
        var newState = (0, _immutabilityHelper2.default)(_this.state, {
            type: { $set: "logout" }
        });
        _this.setState(newState);
    });
}

function _menuActionImages() {
    var _this2 = this;

    this.getFromApi('/admin/images', function (data) {
        var newState = (0, _immutabilityHelper2.default)(_this2.state, {
            images: { $set: data },
            view: { $set: 'editor' },
            type: { $set: "images" }
        });
        _this2.setState(newState);
    });
}

function _menuActionDefault(action) {
    var _this3 = this;

    this.getFromApi('/admin/' + action, function (data) {
        var newState = (0, _immutabilityHelper2.default)(_this3.state, {
            type: { $set: action },
            view: { $set: 'list' },
            list: { $set: data }
        });
        _this3.setState(newState);
    });
}

function menuClickHandler(event) {
    event.preventDefault();
    var action = event.target.getAttribute('data-action');
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
            _menuActionDefault.call(this, action);
    }
}

function listClickHandler(event) {
    event.preventDefault();
    var slug = event.target.getAttribute('data-item');
    var type = this.state.type;
    if (slug) {
        this.getItem(type, slug);
    } else {
        var newState = (0, _immutabilityHelper2.default)(this.state, {
            view: { $set: 'editor' },
            item: { $set: { title: '[new ' + this.singular(type) + ']' } }
        });
        this.setState(newState);
    }
}

exports.menuClickHandler = menuClickHandler;
exports.listClickHandler = listClickHandler;

},{"immutability-helper":10}],10:[function(require,module,exports){
var invariant = require('invariant');

var hasOwnProperty = Object.prototype.hasOwnProperty;
var splice = Array.prototype.splice;

var assign = Object.assign || function assign(target, source) {
  var keys = getAllKeys(source);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
  return target;
};

var getAllKeys = typeof Object.getOwnPropertySymbols === 'function' ?
  function(obj) { return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)) } :
  function(obj) { return Object.keys(obj) };

function copy(object) {
  if (object instanceof Array) {
    return object.slice();
  } else if (object && typeof object === 'object') {
    return assign(new object.constructor(), object);
  } else {
    return object;
  }
}

function newContext() {
  var commands = assign({}, defaultCommands);
  update.extend = function(directive, fn) {
    commands[directive] = fn;
  };

  return update;

  function update(object, spec) {
    if (!(Array.isArray(object) && Array.isArray(spec))) {
      invariant(
        !Array.isArray(spec),
        'update(): You provided an invalid spec to update(). The spec may ' +
        'not contain an array except as the value of $set, $push, $unshift, ' +
        '$splice or any custom command allowing an array value.'
      );
    }

    invariant(
      typeof spec === 'object' && spec !== null,
      'update(): You provided an invalid spec to update(). The spec and ' +
      'every included key path must be plain objects containing one of the ' +
      'following commands: %s.',
      Object.keys(commands).join(', ')
    );

    var nextObject = object;
    var specKeys = getAllKeys(spec);
    var index, key;
    for (index = 0; index < specKeys.length; index++) {
      key = specKeys[index];
      if (hasOwnProperty.call(commands, key)) {
        nextObject = commands[key](spec[key], nextObject, spec, object);
      } else {
        var nextValueForKey = update(object[key], spec[key]);
        if (nextValueForKey !== nextObject[key]) {
          if (nextObject === object) {
            nextObject = copy(object);
          }
          nextObject[key] = nextValueForKey;
        }
      }
    }
    return nextObject;
  }

}

var defaultCommands = {
  $push: function(value, original, spec) {
    invariantPushAndUnshift(original, spec, '$push');
    return original.concat(value);
  },
  $unshift: function(value, original, spec) {
    invariantPushAndUnshift(original, spec, '$unshift');
    return value.concat(original);
  },
  $splice: function(value, nextObject, spec, object) {
    var originalValue = nextObject === object ? copy(object) : nextObject;
    invariantSplices(originalValue, spec);
    value.forEach(function(args) {
      invariantSplice(args);
      splice.apply(originalValue, args);
    });
    return originalValue;
  },
  $set: function(value, original, spec) {
    invariantSet(spec);
    return value;
  },
  $unset: function(value, nextObject, spec, object) {
    invariant(
      Array.isArray(value),
      'update(): expected spec of $unset to be an array; got %s. ' +
      'Did you forget to wrap the key(s) in an array?',
      value
    );
    var originalValue = nextObject;
    for (var i = 0; i < value.length; i++) {
      var key = value[i];
      if (Object.hasOwnProperty.call(originalValue, key)) {
        originalValue = nextObject === object ? copy(object) : nextObject;
        delete originalValue[key];
      }
    }
    return originalValue;
  },
  $merge: function(value, nextObject, spec, object) {
    var originalValue = nextObject === object ? copy(object) : nextObject;
    invariantMerge(originalValue, value);
    getAllKeys(value).forEach(function(key) {
      originalValue[key] = value[key];
    });
    return originalValue;
  },
  $apply: function(value, original) {
    invariantApply(value);
    return value(original);
  }
};

module.exports = newContext();
module.exports.newContext = newContext;

// invariants

function invariantPushAndUnshift(value, spec, command) {
  invariant(
    Array.isArray(value),
    'update(): expected target of %s to be an array; got %s.',
    command,
    value
  );
  var specValue = spec[command];
  invariant(
    Array.isArray(specValue),
    'update(): expected spec of %s to be an array; got %s. ' +
    'Did you forget to wrap your parameter in an array?',
    command,
    specValue
  );
}

function invariantSplices(value, spec) {
  invariant(
    Array.isArray(value),
    'Expected $splice target to be an array; got %s',
    value
  );
  invariantSplice(spec['$splice']);
}

function invariantSplice(value) {
  invariant(
    Array.isArray(value),
    'update(): expected spec of $splice to be an array of arrays; got %s. ' +
    'Did you forget to wrap your parameters in an array?',
    value
  );
}

function invariantApply(fn) {
  invariant(
    typeof fn === 'function',
    'update(): expected spec of $apply to be a function; got %s.',
    fn
  );
}

function invariantSet(spec) {
  invariant(
    Object.keys(spec).length === 1,
    'Cannot have more than one key in an object with $set'
  );
}

function invariantMerge(target, specValue) {
  invariant(
    specValue && typeof specValue === 'object',
    'update(): $merge expects a spec of type \'object\'; got %s',
    specValue
  );
  invariant(
    target && typeof target === 'object',
    'update(): $merge expects a target of type \'object\'; got %s',
    target
  );
}

},{"invariant":11}],11:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":12}],12:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1]);
