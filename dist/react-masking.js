(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom);
        global.reactMasking = mod.exports;
    }
})(this, function (exports, _react, _reactDom) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Mask = function (_React$Component) {
        _inherits(Mask, _React$Component);

        function Mask(props) {
            _classCallCheck(this, Mask);

            var _this = _possibleConstructorReturn(this, (Mask.__proto__ || Object.getPrototypeOf(Mask)).call(this, props));

            _this.hasValue = _this.props.value != null;

            var child = _react2.default.Children.only(_this.props.children);

            var maskObj = _this.parseMask(_this.props.mask);

            var value = _this.props.value || child.props.value;

            _this.mask = maskObj.mask;
            _this.permanents = maskObj.permanents;
            _this.lastEditablePos = maskObj.lastEditablePos;

            _this.maskCharacter = _this.props.maskCharacter;

            if (_this.mask && (_this.props.alwaysShowMask || value)) {
                value = _this.formatValue(value);
            }

            _this.state = { child: child, value: value };

            _this.onCopy = _this.onCopy.bind(_this);
            _this.onCut = _this.onCut.bind(_this);
            _this.onPaste = _this.onPaste.bind(_this);
            _this.onBlur = _this.onBlur.bind(_this);
            _this.onChange = _this.onChange.bind(_this);
            _this.onCopy = _this.onCopy.bind(_this);

            _this.onChange = _this.onChange.bind(_this);
            _this.onFocus = _this.onFocus.bind(_this);

            _this.onKeyPress = _this.onKeyPress.bind(_this);
            _this.onKeyDown = _this.onKeyDown.bind(_this);
            return _this;
        }

        /**
         * Replace substr of value on a given position with a new substr.
         * @param value
         * @param newSubstr
         * @param position
         * @returns {String}
         */


        _createClass(Mask, [{
            key: 'setInputValue',
            value: function setInputValue(value) {
                var input = this.input;
                this.value = value;
                input.value = value;
            }
        }, {
            key: 'getInputDOMNode',
            value: function getInputDOMNode() {
                var input = this.input;

                if (!input) {
                    return null;
                }

                // React 0.14
                if (Mask.isDOMElement(input)) {
                    return input;
                }
                if (input.getDOMNode) {
                    return input.getDOMNode();
                } else {
                    return _reactDom2.default.findDOMNode(input);
                }
            }
        }, {
            key: 'setCaretToEnd',
            value: function setCaretToEnd() {
                var filledLength = this.getFilledLength();
                var position = this.getRightEditablePosition(filledLength);

                if (position !== null) {
                    this.setCaretPosition(position);
                }
            }
        }, {
            key: 'setSelection',
            value: function setSelection(start) {
                var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                var input = this.input;
                var end = start + len;
                if ("selectionStart" in input && "selectionEnd" in input) {
                    input.selectionStart = start;
                    input.selectionEnd = end;
                } else {
                    var range = input.createTextRange();
                    range.collapse(true);
                    range.moveStart("character", start);
                    range.moveEnd("character", end - start);
                    range.select();
                }
            }
        }, {
            key: 'getSelection',
            value: function getSelection() {
                var input = this.input;
                var start = 0;
                var end = 0;
                if ("selectionStart" in input && "selectionEnd" in input) {
                    start = input.selectionStart;
                    end = input.selectionEnd;
                } else {
                    var range = document.selection.createRange();
                    if (range.parentElement() === input) {
                        start = -range.moveStart('character', -input.value.length);
                        end = -range.moveEnd('character', -input.value.length);
                    }
                }

                var length = end - start;

                return { start: start, end: end, length: length };
            }
        }, {
            key: 'setCaretPosition',
            value: function setCaretPosition(pos) {
                var raf = Mask.requestAnimationFrame();
                var setPosition = this.setSelection.bind(this, pos, 0);
                setPosition();
                raf(setPosition);
            }
        }, {
            key: 'getCaretPosition',
            value: function getCaretPosition() {
                return this.getSelection().start;
            }
        }, {
            key: 'getPrefix',
            value: function getPrefix() {
                var mask = this.mask;

                var prefix = '';
                for (var i = 0; i < mask.length && this.isPermanentChar(i); ++i) {
                    prefix += mask[i];
                }
                return prefix;
            }
        }, {
            key: 'getEditablePosition',
            value: function getEditablePosition(position) {
                var mask = this.mask;


                for (var i = position; i < mask.length; i++) {
                    if (!this.isPermanentChar(i)) {
                        return i;
                    }
                }
                return null;
            }
        }, {
            key: 'getLeftEditablePosition',
            value: function getLeftEditablePosition(position) {
                var mask = this.mask;


                for (var i = position; i >= 0; --i) {
                    if (!this.isPermanentChar(i)) {
                        return i;
                    }
                }
                return null;
            }
        }, {
            key: 'getRightEditablePosition',
            value: function getRightEditablePosition(position) {
                var mask = this.mask;


                for (var i = position; i < mask.length; ++i) {
                    if (!this.isPermanentChar(i)) {
                        return i;
                    }
                }
                return null;
            }
        }, {
            key: 'getFilledLength',
            value: function getFilledLength() {
                var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;

                var i = void 0;
                var maskCharacter = this.maskCharacter;

                if (!maskCharacter) {
                    return value.length;
                }

                for (i = value.length - 1; i >= 0; --i) {
                    var character = value[i];
                    if (!this.isPermanentChar(i) && this.isAllowedChar(character, i)) {
                        break;
                    }
                }
                return ++i || this.getPrefix().length;
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                var mask = this.mask;
                var value = this.state.value;

                if (mask && value) {
                    this.setState({ value: value });
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.isAndroidBrowser = Mask.isAndroidBrowser();
                this.isWindowsPhoneBrowser = Mask.isWindowsPhoneBrowser();
                this.isAndroidFirefox = Mask.isAndroidBrowser(true);
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {}
        }, {
            key: 'componentWillUpdate',
            value: function componentWillUpdate(nextProps, nextState) {}
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps, prevState) {}
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {}
        }, {
            key: 'onCopy',
            value: function onCopy(e) {}
        }, {
            key: 'onCut',
            value: function onCut(e) {}
        }, {
            key: 'onPaste',
            value: function onPaste(e) {}
        }, {
            key: 'onKeyDown',
            value: function onKeyDown(e) {
                this.input = e.target;
                var key = e.key;
                var value = this.state.value;

                var preventDefault = false;
                var caretPosition = this.getCaretPosition();

                switch (key) {
                    case "Backspace":
                    case "Delete":
                        var prefix = this.getPrefix();
                        var deleteFromRight = key === 'Delete';
                        var selectionRange = this.getSelection();

                        if (selectionRange.length) {
                            value = this.clearRange(value, selectionRange.start, selectionRange.length);
                        } else if (caretPosition < prefix.length || !deleteFromRight && caretPosition === prefix.length) {
                            caretPosition = prefix.length;
                        } else {
                            var editablePosition = deleteFromRight ? this.getRightEditablePosition(caretPosition) : this.getLeftEditablePosition(caretPosition - 1);
                            if (editablePosition !== null) {
                                value = this.clearRange(value, editablePosition, 1);
                                caretPosition = editablePosition;
                            }
                        }
                        break;
                    default:
                        break;
                }

                if (value !== this.state.value) {
                    this.setInputValue(value);
                    this.setState({ value: value });
                    preventDefault = true;
                }

                if (preventDefault) {
                    e.preventDefault();
                    this.setCaretPosition(caretPosition);
                }
            }
        }, {
            key: 'onKeyPress',
            value: function onKeyPress(e) {
                var key = e.key;
                this.input = e.target;

                if (key === "Enter" || e.ctrlKey || e.metaKey) {
                    return;
                }

                // When browser is windows phone browser return, keypress cannot be
                // hijacked.
                if (this.isWindowsPhoneBrowser) {
                    return;
                }

                var caretPosition = this.getCaretPosition();

                var value = this.state.value;
                var mask = this.mask;
                var maskCharacter = this.maskCharacter;
                var lastEditablePos = this.lastEditablePos;

                var prefix = this.getPrefix();
                var selection = this.getSelection();

                if (this.isPermanentChar(caretPosition) && mask[caretPosition] === key) {
                    value = this.insertRawSubstr(value, key, caretPosition);
                    ++caretPosition;
                } else {
                    var editablePosition = this.getRightEditablePosition(caretPosition);

                    if (editablePosition !== null && this.isAllowedChar(key, editablePosition)) {
                        value = this.clearRange(value, selection.start, selection.length);
                        value = this.insertRawSubstr(value, key, editablePosition);
                        caretPosition = editablePosition + 1;
                    }
                }

                if (value !== this.state.value) {
                    this.setState({ value: value });
                }

                e.preventDefault();

                if (caretPosition < lastEditablePos && caretPosition > prefix.length) {
                    caretPosition = this.getRightEditablePosition(caretPosition);
                }
                this.setCaretPosition(caretPosition);
            }
        }, {
            key: 'onBlur',
            value: function onBlur(e) {}
        }, {
            key: 'onChange',
            value: function onChange(e) {
                this.input = e.target;
                var pasteSelection = this.pasteSelection;
                var mask = this.mask;
                var maskCharacter = this.maskCharacter;
                var lastEditablePos = this.lastEditablePos;
                var preventEmptyChange = this.preventEmptyChange;

                var value = this.input.value;
                var oldValue = this.state.value;

                if (pasteSelection) {
                    this.pasteSelection = null;
                    this.pasteText(oldValue, value, pasteSelection, e);
                    return;
                }

                var selection = this.getSelection();
                var prefix = this.getPrefix();
                var caretPosition = selection.end;
                var clearedValue = void 0;

                if (value.length > oldValue.length) {
                    var substrLength = value.length - oldValue.length;
                    var startPosition = selection.end - substrLength;
                    var enteredSubstr = value.substr(startPosition, substrLength);

                    if (startPosition < lastEditablePos && (substrLength !== 1 || enteredSubstr !== mask[startPosition])) {
                        caretPosition = this.getRightEditablePosition(startPosition);
                    } else {
                        caretPosition = startPosition;
                    }

                    value = value.substr(0, startPosition) + value.substr(startPosition + substrLength);

                    clearedValue = this.clearRange(value, startPosition, mask.length - startPosition);
                    clearedValue = this.insertRawSubstr(clearedValue, enteredSubstr, caretPosition);

                    value = this.insertRawSubstr(oldValue, enteredSubstr, caretPosition);
                    if (substrLength !== 1 || caretPosition >= prefix.length && caretPosition < lastEditablePos) {
                        caretPosition = this.getFilledLength(clearedValue);
                    } else if (caretPosition < lastEditablePos) {
                        caretPosition++;
                    }
                } else if (value.length < oldValue.length) {
                    var removedLength = mask.length - value.length;
                    clearedValue = this.clearRange(oldValue, selection.end, removedLength);
                    var substr = value.substr(0, selection.end);
                    var clearOnly = substr === oldValue.substr(0, selection.end);

                    if (maskCharacter) {
                        value = this.insertRawSubstr(clearedValue, substr, 0);
                    }

                    clearedValue = this.clearRange(clearedValue, selection.end, mask.length - selection.end);
                    clearedValue = this.insertRawSubstr(clearedValue, substr, 0);

                    if (!clearOnly) {
                        caretPosition = this.getFilledLength(clearedValue);
                    } else if (caretPosition < prefix.length) {
                        caretPosition = prefix.length;
                    }
                }

                value = this.formatValue(value);
            }
        }, {
            key: 'onFocus',
            value: function onFocus(e) {
                this.input = e.target;
                if (!this.state.value) {
                    var prefix = this.getPrefix();
                    var value = this.formatValue(prefix);
                    var inputValue = this.formatValue(value);

                    this.setState({
                        value: this.hasValue ? this.state.value : inputValue
                    }, this.setCaretToEnd);
                } else if (this.getFilledLength() < this.mask.length) {
                    this.setCaretToEnd();
                }
            }
        }, {
            key: 'isAllowedChar',
            value: function isAllowedChar(character, position) {
                var allowMaskChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                var mask = this.mask;
                var maskCharacter = this.maskCharacter;

                var ruleCharacter = mask[position];
                var characterRule = this.props.formatCharacters[ruleCharacter];

                if (this.isPermanentChar(position)) {
                    return ruleCharacter === character;
                }

                return new RegExp(characterRule).test(character) || allowMaskChar && character === maskCharacter;
            }
        }, {
            key: 'isPermanentChar',
            value: function isPermanentChar(i) {
                return this.permanents.indexOf(i) !== -1;
            }
        }, {
            key: 'isFilled',
            value: function isFilled() {
                var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;

                return this.getFilledLength(value) === this.mask.length;
            }
        }, {
            key: 'clearRange',
            value: function clearRange(value, start, length) {
                var _this2 = this;

                var end = start + length;
                var maskCharacter = this.maskCharacter;
                var mask = this.mask;


                if (!maskCharacter) {
                    var _ret = function () {
                        var prefix = _this2.getPrefix();

                        value = value.split('').filter(function (_, i) {
                            return i < prefix.length || i < start || i >= end;
                        }).join('');
                        return {
                            v: _this2.formatValue(value)
                        };
                    }();

                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                }
                return value.split('').map(function (c, i) {
                    if (i < start || i >= end) {
                        return c;
                    }
                    if (_this2.isPermanentChar(i)) {
                        return mask[i];
                    }
                    return maskCharacter;
                }).join('');
            }
        }, {
            key: 'formatValue',
            value: function formatValue() {
                var _this3 = this;

                var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var maskCharacter = this.maskCharacter;
                var mask = this.mask;


                if (!maskCharacter) {
                    var prefix = this.getPrefix();

                    value = this.insertRawSubstr('', value, 0);

                    var valueEnd = value.length - 1;

                    while (value.length > prefix.length && this.isPermanentChar(valueEnd)) {
                        value = value.slice(0, valueEnd);
                        valueEnd = value.length - 1;
                    }

                    if (value.length < prefix.length) {
                        value = prefix;
                    }
                    return value;
                }

                if (value) {
                    var emptyValue = this.formatValue();
                    return this.insertRawSubstr(emptyValue, value, 0);
                }

                return value.split('').concat(new Array(mask.length - value.length).fill(null)).map(function (character, position) {
                    if (_this3.isAllowedChar(character, position)) {
                        return character;
                    } else if (_this3.isPermanentChar(position)) {
                        return mask[position];
                    }
                    return maskCharacter;
                }).join('');
            }
        }, {
            key: 'insertRawSubstr',
            value: function insertRawSubstr(value, substr, position) {
                var mask = this.mask;
                var maskCharacter = this.maskCharacter;

                var isFilled = this.isFilled(value);
                var prefix = this.getPrefix();
                substr = substr.split('');

                if (!maskCharacter && position > value.length) {
                    value += mask.slice(value.length, position);
                }

                for (var i = position; i < mask.length && substr.length;) {
                    var isPermanent = this.isPermanentChar(i);
                    if (!isPermanent || mask[i] === substr[0]) {
                        var character = substr.shift();
                        if (this.isAllowedChar(character, i, true)) {
                            if (i < value.length) {
                                if (maskCharacter || isFilled || i < prefix.length) {
                                    value = Mask.replaceSubstr(value, character, i);
                                } else {
                                    value = this.formatValue(value.substr(0, i) + character + value.substr(i));
                                }
                            } else if (!maskCharacter) {
                                value += character;
                            }
                            ++i;
                        }
                    } else {
                        if (!maskCharacter && i >= value.length) {
                            value += mask[i];
                        } else if (maskCharacter && isPermanent && substr[0] === maskCharacter) {
                            substr.shift();
                        }
                        ++i;
                    }
                }
                return value;
            }
        }, {
            key: 'parseMask',
            value: function parseMask(rawMask) {
                var _this4 = this;

                var permanents = []; // Keeps track of permanent position.
                var isPermanent = false;
                var mask = '';
                var lastEditablePos = null;

                // Split mask on each character and define which is a permanent char.
                rawMask.split('').forEach(function (c) {
                    isPermanent = !isPermanent && c === '\\';

                    if (isPermanent || !_this4.props.formatCharacters.hasOwnProperty(c)) {
                        permanents.push(mask.length);
                    } else {
                        lastEditablePos = mask.length + 1;
                    }
                    mask += c;
                });
                return { mask: mask, permanents: permanents, lastEditablePos: lastEditablePos };
            }
        }, {
            key: 'allowedCharacter',
            value: function allowedCharacter(character) {
                if (this.props.formatCharacters.hasOwnProperty(character)) {}
            }
        }, {
            key: 'render',
            value: function render() {
                var _this5 = this;

                var value = this.state.child.props.value;
                var handlerKeys = ["onFocus", "onBlur", "onChange", "onKeyDown", "onKeyPress", "onPaste"];
                var props = { value: value };
                handlerKeys.forEach(function (k) {
                    props[k] = _this5[k];
                });
                if (props.value != null) {
                    props.value = this.state.value;
                }
                var child = _react2.default.cloneElement(this.state.child, props);

                return _react2.default.createElement(
                    'div',
                    { className: 'masked' },
                    child
                );
            }
        }], [{
            key: 'replaceSubstr',
            value: function replaceSubstr(value, newSubstr, position) {
                return value.slice(0, position) + newSubstr + value.slice(position + newSubstr.length);
            }
        }, {
            key: 'isAndroidBrowser',
            value: function isAndroidBrowser() {
                var isFirefox = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                var windows = new RegExp("windows", "i");
                var firefox = new RegExp("firefox", "i");
                var android = new RegExp("android", "i");
                var ua = navigator.userAgent;
                return !windows.test(ua) && isFirefox === firefox.test(ua) && android.test(ua);
            }
        }, {
            key: 'isWindowsPhoneBrowser',
            value: function isWindowsPhoneBrowser() {
                var windows = new RegExp("windows", "i");
                var phone = new RegExp("phone", "i");
                var ua = navigator.userAgent;
                return windows.test(ua) && phone.test(ua);
            }
        }, {
            key: 'isDOMElement',
            value: function isDOMElement(element) {
                return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === "object" ? element instanceof HTMLElement // DOM2
                : element.nodeType === 1 && typeof element.nodeName === "string";
            }
        }, {
            key: 'requestAnimationFrame',
            value: function requestAnimationFrame() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (fn) {
                    return setTimeout(fn, 0);
                };
            }
        }]);

        return Mask;
    }(_react2.default.Component);

    Mask.propTypes = {
        children: _react2.default.PropTypes.object,
        mask: _react2.default.PropTypes.string,
        maskCharacter: _react2.default.PropTypes.string,
        formatCharacters: _react2.default.PropTypes.object,
        i18n: _react2.default.PropTypes.string
    };

    Mask.defaultProps = {
        maskCharacter: "_",
        formatCharacters: {
            "9": "[0-9]",
            "a": "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        }
    };

    exports.default = Mask;
});