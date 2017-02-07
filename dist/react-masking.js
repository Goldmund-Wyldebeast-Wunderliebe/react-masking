(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * React masking component.
	 */
	var Mask = function (_React$Component) {
	  _inherits(Mask, _React$Component);

	  /**
	   * Constructor for Masking component. Sets all values needed for the rest of
	   * the component and binds all needed actions.
	   * @param {object} props - See defaultProps and propTypes.
	   */
	  function Mask(props) {
	    _classCallCheck(this, Mask);

	    var _this = _possibleConstructorReturn(this, (Mask.__proto__ || Object.getPrototypeOf(Mask)).call(this, props));

	    var child = _this.child = _react2.default.Children.only(_this.props.children);
	    var value = _this.props.value || child.props.value;

	    _this.hasValue = !!_this.props.value;

	    var maskObj = _this.parseMask(_this.props.mask);
	    _this.mask = maskObj.mask;
	    _this.permanents = maskObj.permanents;
	    _this.lastEditablePos = maskObj.lastEditablePos;

	    // Set mask character or load default from props.
	    _this.maskCharacter = _this.props.maskCharacter;

	    if (_this.mask && (_this.props.alwaysShowMask || value)) {
	      value = _this.formatValue(value);
	    }

	    _this.state = { child: child, value: value };

	    // All Events. This ensures all actions on the input field are logical to
	    // the browser AND user.
	    _this.onPaste = _this.onPaste.bind(_this);
	    _this.onBlur = _this.onBlur.bind(_this);
	    _this.onChange = _this.onChange.bind(_this);
	    _this.onFocus = _this.onFocus.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    _this.onKeyPress = _this.onKeyPress.bind(_this);
	    _this.onKeyUp = _this.onKeyUp.bind(_this);
	    _this.onCopy = _this.onCopy.bind(_this);
	    return _this;
	  }

	  /**
	   * Replace substr of value on a given position with a new substr.
	   * @param {string} value - initial value
	   * @param {string} newSubstr - substring that should replace part of the
	   *  value
	   * @param {number} position - position of substring
	   * @returns {string} replaced substring
	   */


	  _createClass(Mask, [{
	    key: 'setInputValue',


	    /**
	     * Set's the inputs field value and the main value.
	     * @param {string} value - input value.
	     * @return {undefined}
	     */
	    value: function setInputValue(value) {
	      var input = this.input;
	      input.value = value;
	    }

	    /**
	     * Sets the caret to the end position of the editable area.
	     * @return {undefined}
	     */

	  }, {
	    key: 'setCaretToEnd',
	    value: function setCaretToEnd() {
	      var filledLength = this.getFilledLength();
	      var position = this.getRightEditablePosition(filledLength);

	      if (position !== null) {
	        this.setCaretPosition(position);
	      }
	    }

	    /**
	     * Sets the caret to the position given bij the param.
	     * @param {number} position - Position of the caret.
	     * @returns {undefined}
	     */

	  }, {
	    key: 'setCaretPosition',
	    value: function setCaretPosition(position) {
	      var raf = Mask.requestAnimationFrame();
	      var setPosition = this.setSelection.bind(this, position, 0);
	      setPosition();
	      raf(setPosition);
	    }

	    /**
	     * Get's the current caret position.
	     * @returns {number} Position of caret.
	     */

	  }, {
	    key: 'getCaretPosition',
	    value: function getCaretPosition() {
	      return this.getSelection().start;
	    }

	    /**
	     * Set seleciton based on start and length. Often used for setting the caret
	     * to the right position.
	     * @param {number} start - Start of selection
	     * @param {number} len - length of selection, can be 0.
	     * @returns {undefined}
	     */

	  }, {
	    key: 'setSelection',
	    value: function setSelection(start) {
	      var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      var input = this.input;
	      var end = start + len;
	      var range = 0;
	      if ('selectionStart' in input && 'selectionEnd' in input) {
	        input.selectionStart = start;
	        input.selectionEnd = end;
	      } else {
	        range = input.createTextRange();
	        range.collapse(true);
	        range.moveStart('character', start);
	        range.moveEnd('character', end - start);
	        range.select();
	      }
	    }

	    /**
	     * Get selection based on dom node. Used document when selection is not
	     * in the input node.
	     * @returns {{start: number, end: number, length: number}} Object with start,
	     *  end and length of selection.
	     */

	  }, {
	    key: 'getSelection',
	    value: function getSelection() {
	      var input = this.input;
	      var start = 0;
	      var end = 0;
	      if ('selectionStart' in input && 'selectionEnd' in input) {
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

	    /**
	     * Get the prefix from the mask. Useful for on focus character position.
	     * @returns {string} Prefix string
	     */

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

	    /**
	     * Gets the next editable position based on current position.
	     * @param {number} position - Current position
	     * @returns {number|null} Returns editable position or null.
	     */

	  }, {
	    key: 'getEditablePosition',
	    value: function getEditablePosition(position) {
	      var mask = this.mask;

	      var i = position;

	      for (; i < mask.length; i++) {
	        if (!this.isPermanentChar(i)) {
	          return i;
	        }
	      }
	      return null;
	    }

	    /**
	     * Gets the left editable position based on current position.
	     * @param {number} position - Current position
	     * @returns {number|null} Returns editable position or null.
	     */

	  }, {
	    key: 'getLeftEditablePosition',
	    value: function getLeftEditablePosition(position) {
	      var i = position;
	      for (; i >= 0; --i) {
	        if (!this.isPermanentChar(i)) {
	          return i;
	        }
	      }
	      return null;
	    }

	    /**
	     * Gets the right editable position based on current position.
	     * @param {number} position - Current position
	     * @returns {number|null} Returns editable position or null.
	     */

	  }, {
	    key: 'getRightEditablePosition',
	    value: function getRightEditablePosition(position) {
	      var mask = this.mask;

	      var i = position;
	      for (; i < mask.length; ++i) {
	        if (!this.isPermanentChar(i)) {
	          return i;
	        }
	      }
	      return null;
	    }

	    /**
	     * Calculates filled length based on value.
	     * @param {string} value - Value to be used to calculate filled length.
	     * @returns {number} Filled length of input
	     */

	  }, {
	    key: 'getFilledLength',
	    value: function getFilledLength() {
	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;

	      var character = void 0,
	          i = void 0;
	      var maskCharacter = this.maskCharacter;

	      if (!maskCharacter) {
	        return value.length;
	      }

	      for (i = value.length - 1; i >= 0; --i) {
	        character = value[i];
	        if (!this.isPermanentChar(i) && this.isAllowedChar(character, i)) {
	          break;
	        }
	      }
	      return ++i || this.getPrefix().length;
	    }

	    /**
	     * Returns the length of the substring.
	     * @param {string} substr - Substring
	     * @param {number} position - Position of substring
	     * @returns {number} substrLength - Length of substring
	     */

	  }, {
	    key: 'getRawSubstrLength',
	    value: function getRawSubstrLength(substr, position) {
	      var character = void 0;
	      var mask = this.mask;

	      var i = position;
	      var substrArray = substr.split('');
	      for (; i < mask.length && substrArray.length;) {
	        if (!this.isPermanentChar(i) || mask[i] === substrArray[0]) {
	          character = substrArray.shift();
	          if (this.isAllowedChar(character, i, true)) {
	            ++i;
	          }
	        } else {
	          ++i;
	        }
	      }
	      return i - position;
	    }

	    /**
	     * Dub function that is in progress. No value descriptor is made so it will
	     * use the input given by an event.
	     * @returns {string} value.
	     */

	  }, {
	    key: 'getInputValue',
	    value: function getInputValue() {
	      var input = this.input;
	      var valueDescriptor = this.valueDescriptor;


	      var value = void 0;
	      if (valueDescriptor) {
	        value = valueDescriptor.get.call(input);
	      } else {
	        value = input.value;
	      }

	      return value;
	    }

	    /**
	     * Component will mount function. Ensures initial value setting.
	     * @returns {undefined}
	     */

	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var mask = this.mask;
	      var value = this.state.value;

	      if (mask && value) {
	        this.setState({ value: value });
	      }
	    }

	    /**
	     * Component did mount function that checks what type of browser is used.
	     * @return {undefined}
	     */

	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.isAndroidBrowser = Mask.isAndroidBrowser();
	      this.isWindowsPhoneBrowser = Mask.isWindowsPhoneBrowser();
	    }

	    /**
	     * On paste action
	     * @param {object} event - Browser event.
	     * @returns {undefined}
	     */

	  }, {
	    key: 'onPaste',
	    value: function onPaste(event) {
	      if (this.isAndroidBrowser) {
	        this.pasteSelection = this.getSelection();
	        this.setInputValue('');
	        return;
	      }

	      var text = void 0;

	      if (window.clipboardData && window.clipboardData.getData) {
	        // IE
	        text = window.clipboardData.getData('Text');
	      } else if (event.clipboardData && event.clipboardData.getData) {
	        text = event.clipboardData.getData('text/plain');
	      }

	      if (text) {
	        var value = this.state.value;
	        var selection = this.getSelection();
	        this.pasteText(value, text, selection, event);
	      }
	      event.preventDefault();
	    }

	    /**
	     * On Copy event, this makes sure that NO masking characters will be copied.
	     * @param {object} event - Browser event.
	     * @returns {undefined}
	     */

	  }, {
	    key: 'onCopy',
	    value: function onCopy(event) {
	      var value = this.getInputValue();
	      value = value.substr(0, this.getFilledLength());
	      event.clipboardData.setData('text/plain', value);
	      event.preventDefault();
	    }

	    /**
	     * Handles delete and backspace actions onKeyDown. Also triggers bound
	     * actions on the Mask.
	     * @param {object} event - Browser event.
	     * @returns {undefined}
	     */

	  }, {
	    key: 'onKeyDown',
	    value: function onKeyDown(event) {
	      this.input = event.target;
	      var key = event.key;
	      var value = event.target.value;
	      var preventDefault = false;
	      var caretPosition = this.getCaretPosition();

	      switch (key) {
	        case 'Backspace':
	        case 'Delete':
	          {
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
	          }
	        default:
	          {
	            break;
	          }
	      }

	      if (value !== this.state.value) {
	        this.setInputValue(value);
	        this.setState({ value: this.hasValue ? this.state.value : value });
	        preventDefault = true;
	      }

	      if (preventDefault) {
	        event.preventDefault();
	        this.setCaretPosition(caretPosition);
	      }
	    }

	    /**
	     * On Key Press event. Makes sure that the correct state is sent on the value
	     * and sets the caret position.
	     * @param {object} event - Browser event
	     * @returns {undefined}
	     */

	  }, {
	    key: 'onKeyPress',
	    value: function onKeyPress(event) {
	      var key = event.key;
	      this.input = event.target;

	      if (key === 'Enter' || event.ctrlKey || event.metaKey) {
	        return;
	      }

	      // When browser is windows phone browser return, keypress cannot be
	      // hijacked.
	      if (this.isWindowsPhoneBrowser) {
	        return;
	      }

	      var caretPosition = this.getCaretPosition();

	      var value = this.state.value;
	      var mask = this.mask,
	          lastEditablePos = this.lastEditablePos;

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
	        this.setInputValue(value);
	        this.setState({
	          value: this.hasValue ? this.state.value : value
	        });
	      }

	      event.preventDefault();

	      if (caretPosition < lastEditablePos && caretPosition > prefix.length) {
	        caretPosition = this.getRightEditablePosition(caretPosition);
	      }
	      this.setCaretPosition(caretPosition);
	    }

	    /**
	     * On Key Up event. Enforces state setting of value.
	     * @param {object} event - Browser event
	     * @returns {undefined}
	     */

	  }, {
	    key: 'onKeyUp',
	    value: function onKeyUp(event) {
	      this.setState({ value: event.target.value });
	    }

	    /**
	     * On Blur event for the input field. Makes sure the correct state has been
	     * set.
	     * @param {object} event - Browser event
	     * @returns {undefined}
	     */

	  }, {
	    key: 'onBlur',
	    value: function onBlur(event) {
	      if (!this.props.alwaysShowMask && this.isEmpty()) {
	        var inputValue = '';
	        var isInputValueChanged = inputValue !== this.getInputValue();
	        if (isInputValueChanged) {
	          this.setInputValue(inputValue);
	        }

	        this.setState({
	          value: this.hasValue ? this.state.value : ''
	        });
	      }

	      if (typeof this.props.onBlur === 'function') {
	        this.props.onBlur(event);
	      }
	    }
	  }, {
	    key: 'getClearedValue',
	    value: function getClearedValue(value, substr, startPosition, endPosition, caretPosition) {
	      var clearedValue = this.clearRange(value, startPosition, endPosition);
	      return this.insertRawSubstr(clearedValue, substr, caretPosition);
	    }
	  }, {
	    key: 'formatEnteredSubstr',
	    value: function formatEnteredSubstr(inputValue, oldValue) {
	      var lastEditablePos = this.lastEditablePos,
	          mask = this.mask;

	      var substrLength = inputValue.length - oldValue.length;
	      var selection = this.getSelection();
	      var startPosition = selection.end - substrLength;
	      var endPosition = mask.length - startPosition;
	      var enteredSubstr = inputValue.substr(startPosition, substrLength);
	      var prefix = this.getPrefix();
	      var caretPosition = selection.end;
	      var clearedValue = void 0;

	      if (startPosition < lastEditablePos && (substrLength !== 1 || enteredSubstr !== mask[startPosition])) {
	        caretPosition = this.getRightEditablePosition(startPosition);
	      } else {
	        caretPosition = startPosition;
	      }

	      inputValue = inputValue.substr(0, startPosition) + inputValue.substr(startPosition + substrLength);

	      if (substrLength !== 1 || caretPosition >= prefix.length && caretPosition < lastEditablePos) {
	        clearedValue = this.getClearedValue(inputValue, enteredSubstr, startPosition, endPosition, caretPosition);
	        caretPosition = this.getFilledLength(clearedValue);
	      } else if (caretPosition < lastEditablePos) {
	        caretPosition++;
	      }
	      return { inputValue: inputValue, caretPosition: caretPosition };
	    }
	  }, {
	    key: 'formatRemovedSubstr',
	    value: function formatRemovedSubstr(inputValue, oldValue) {
	      var mask = this.mask,
	          maskCharacter = this.maskCharacter;

	      var selection = this.getSelection();
	      var prefix = this.getPrefix();
	      var removedLength = mask.length - inputValue.length;
	      var substr = inputValue.substr(0, selection.end);
	      var clearOnly = substr === oldValue.substr(0, selection.end);
	      var clearedValue = this.clearRange(oldValue, selection.end, removedLength);
	      var caretPosition = selection.end;

	      if (maskCharacter) {
	        inputValue = this.insertRawSubstr(clearedValue, substr, 0);
	      }

	      if (!clearOnly) {
	        clearedValue = this.getClearedValue(clearedValue, substr, selection.end, mask.length - selection.end, 0);
	        caretPosition = this.getFilledLength(clearedValue);
	      } else if (caretPosition < prefix.length) {
	        caretPosition = prefix.length;
	      }
	      return { inputValue: inputValue, caretPosition: caretPosition };
	    }

	    /**
	     * On Change event. This is the main event listener that makes sure all
	     * masking changes will be set correctly.
	     * @param {object} event - Browser event
	     * @returns {undefined}
	     */

	  }, {
	    key: 'onChange',
	    value: function onChange(event) {
	      // Set input on change event. This ensures we have the right scope.
	      this.input = event.target;
	      var pasteSelection = this.pasteSelection;

	      var oldValue = this.state.value;
	      var inputValue = this.input.value;

	      // Ensure that when text has been pasted, the rest of the onChange function
	      // does not trigger.
	      if (pasteSelection) {
	        this.pasteSelection = null;
	        this.pasteText(oldValue, inputValue, pasteSelection, event);
	        return;
	      }
	      var formattedStr = void 0,
	          caretPosition = void 0;

	      if (inputValue.length > oldValue.length) {
	        formattedStr = this.formatEnteredSubstr(inputValue, oldValue);
	      } else if (inputValue.length < oldValue.length) {
	        formattedStr = this.formatRemovedSubstr(inputValue, oldValue);
	      }
	      inputValue = formattedStr.inputValue;
	      caretPosition = formattedStr.caretPosition;

	      inputValue = this.formatValue(inputValue);

	      this.setState({
	        value: this.hasValue ? this.state.value : inputValue
	      });

	      if (typeof this.props.onChange === 'function') {
	        this.props.onChange(event);
	      }

	      this.setCaretPosition(caretPosition);
	    }

	    /**
	     * On focus sets the caret to the correct position.
	     * @param {object} event - Browser event
	     * @returns {undefined}
	     */

	  }, {
	    key: 'onFocus',
	    value: function onFocus(event) {
	      this.input = event.target;
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
	      if (typeof this.props.onFocus === 'function') {
	        this.props.onFocus(event);
	      }
	    }

	    /**
	     * Test if character entered is allowed on the given position.
	     * @param {string} character - Character to check
	     * @param {number} position - Position of the character.
	     * @param {boolean} allowMaskChar - Flag to check if mask char is allowed.
	     * @returns {boolean} true or false based on if it is allowed.
	     */

	  }, {
	    key: 'isAllowedChar',
	    value: function isAllowedChar(character, position) {
	      var allowMaskChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var mask = this.mask,
	          maskCharacter = this.maskCharacter;

	      var ruleCharacter = mask[position];
	      var characterRule = this.props.formatCharacters[ruleCharacter];

	      if (this.isPermanentChar(position)) {
	        return ruleCharacter === character;
	      }

	      return new RegExp(characterRule).test(character) || allowMaskChar && character === maskCharacter;
	    }

	    /**
	     * Return if the given position is a permanent character. Used to generate
	     * a prefix.
	     * @param {number} position - given position.
	     * @returns {boolean} true or false if character is permanent.
	     */

	  }, {
	    key: 'isPermanentChar',
	    value: function isPermanentChar(position) {
	      return this.permanents.indexOf(position) !== -1;
	    }

	    /**
	     * Check whether the input field is completely filled.
	     * @param {string} value - Value to check if input is filled.
	     * @returns {boolean} true or false if input is filled.
	     */

	  }, {
	    key: 'isFilled',
	    value: function isFilled() {
	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;

	      return this.getFilledLength(value) === this.mask.length;
	    }

	    /**
	     * Check if the input value is empty. This checks if given characters are
	     * permanent or given by user input.
	     * @param {string} value - input value
	     * @returns {boolean} true or false if field is empty.
	     */

	  }, {
	    key: 'isEmpty',
	    value: function isEmpty() {
	      var _this2 = this;

	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;

	      return !value.split('').some(function (character, i) {
	        return !_this2.isPermanentChar(i) && _this2.isAllowedChar(character, i);
	      });
	    }

	    /**
	     * Clears a given range at a given start position and length in the value.
	     * @param {string} value - value to clear
	     * @param {number} start - start value where to clear
	     * @param {number} length - length of value to clear.
	     * @returns {string} new value.
	     */

	  }, {
	    key: 'clearRange',
	    value: function clearRange(value, start, length) {
	      var _this3 = this;

	      var end = start + length;
	      var maskCharacter = this.maskCharacter,
	          mask = this.mask;


	      if (!maskCharacter) {
	        var _ret = function () {
	          var prefix = _this3.getPrefix();

	          value = value.split('').filter(function (_, i) {
	            return i < prefix.length || i < start || i >= end;
	          }).join('');
	          return {
	            v: _this3.formatValue(value)
	          };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	      return value.split('').map(function (c, i) {
	        if (i < start || i >= end) {
	          return c;
	        }
	        if (_this3.isPermanentChar(i)) {
	          return mask[i];
	        }
	        return maskCharacter;
	      }).join('');
	    }

	    /**
	     * Formats the value based on the mask.
	     * @param {string} value - value to format.
	     * @returns {string} formatted value.
	     */

	  }, {
	    key: 'formatValue',
	    value: function formatValue() {
	      var _this4 = this;

	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var maskCharacter = this.maskCharacter,
	          mask = this.mask;


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
	        if (_this4.isAllowedChar(character, position)) {
	          return character;
	        } else if (_this4.isPermanentChar(position)) {
	          return mask[position];
	        }
	        return maskCharacter;
	      }).join('');
	    }

	    /**
	     * Insert raw substring in the value and return the new value.
	     * Checks whether the cursor position does not compromise permanent
	     * characters.
	     * @param {string} value - value to be inserted into.
	     * @param {string} substr - Substring to insert into value.
	     * @param {number} position - Position to insert to.
	     * @return {string} newly formatted value with inserted substring
	     */

	  }, {
	    key: 'insertRawSubstr',
	    value: function insertRawSubstr(value, substr, position) {
	      var mask = this.mask,
	          maskCharacter = this.maskCharacter;

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

	    /**
	     * Parse the rawMask and return an object containing the mask and all
	     * permanent positions.
	     * @param {string} rawMask - user given mask to be converted.
	     * @returns {{mask: string, permanents: Array, lastEditablePos: integer}}
	     *  returns object with mask, permanents and last editable position.
	     */

	  }, {
	    key: 'parseMask',
	    value: function parseMask(rawMask) {
	      var _this5 = this;

	      var permanents = []; // Keeps track of permanent position.
	      var isPermanent = false;
	      var mask = '';
	      var lastEditablePos = null;

	      // Split mask on each character and define which is a permanent char.
	      rawMask.split('').forEach(function (c) {
	        isPermanent = !isPermanent && c === '\\';

	        if (isPermanent || !_this5.props.formatCharacters.hasOwnProperty(c)) {
	          permanents.push(mask.length);
	        } else {
	          lastEditablePos = mask.length + 1;
	        }
	        mask += c;
	      });
	      return { mask: mask, permanents: permanents, lastEditablePos: lastEditablePos };
	    }
	  }, {
	    key: 'pasteText',
	    value: function pasteText(value, text, selection, event) {
	      var caretPosition = selection.start;
	      if (selection.length) {
	        value = this.clearRange(value, caretPosition, selection.length);
	      }
	      var textLen = this.getRawSubstrLength(text, caretPosition);
	      value = this.insertRawSubstr(value, text, caretPosition);
	      caretPosition += textLen;
	      caretPosition = this.getRightEditablePosition(caretPosition) || caretPosition;
	      if (value !== this.getInputValue()) {
	        if (event) {
	          this.setInputValue(value);
	        }
	        this.setState({
	          value: this.hasValue ? this.state.value : value
	        });
	        if (event && typeof this.props.onChange === 'function') {
	          this.props.onChange(event);
	        }
	      }
	      this.setCaretPosition(caretPosition);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this6 = this;

	      var value = this.child.props.value;
	      var handlerKeys = ['onFocus', 'onBlur', 'onChange', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onPaste', 'onCopy'];
	      var props = { value: value };
	      handlerKeys.forEach(function (k) {
	        props[k] = _this6[k];
	      });
	      if (props.value !== null && props.value !== undefined) {
	        props.value = this.state.value;
	      }
	      props.onKeyUp = this.onKeyUp;
	      this.child = _react2.default.cloneElement(this.child, props);

	      return _react2.default.createElement(
	        'div',
	        { className: 'masked' },
	        this.child
	      );
	    }
	  }], [{
	    key: 'replaceSubstr',
	    value: function replaceSubstr(value, newSubstr, position) {
	      return value.slice(0, position) + newSubstr + value.slice(position + newSubstr.length);
	    }

	    /**
	     * Check whether the browser is an android browser.
	     * @param {boolean} isFirefox - switch if is firefox browser on android.
	     * @returns {boolean} true or false if android.
	     */

	  }, {
	    key: 'isAndroidBrowser',
	    value: function isAndroidBrowser() {
	      var isFirefox = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      var windows = new RegExp('windows', 'i');
	      var firefox = new RegExp('firefox', 'i');
	      var android = new RegExp('android', 'i');
	      var ua = navigator.userAgent;
	      return !windows.test(ua) && isFirefox === firefox.test(ua) && android.test(ua);
	    }

	    /**
	     * Check whether the browser is an windows phone browser.
	     * @returns {boolean} true or false if windows phone.
	     */

	  }, {
	    key: 'isWindowsPhoneBrowser',
	    value: function isWindowsPhoneBrowser() {
	      var windows = new RegExp('windows', 'i');
	      var phone = new RegExp('phone', 'i');
	      var ua = navigator.userAgent;
	      return windows.test(ua) && phone.test(ua);
	    }

	    /**
	     * Returns a function to be able to ask the browser for an animation frame.
	     * Useful for setting the cursor.
	     * @returns {Function} animation frame function.
	     */

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

	/**
	 * Set default prop types.
	 */


	Mask.propTypes = {
	  children: _react2.default.PropTypes.object,
	  mask: _react2.default.PropTypes.string,
	  maskCharacter: _react2.default.PropTypes.string,
	  formatCharacters: _react2.default.PropTypes.object,
	  alwaysShowMask: _react2.default.PropTypes.bool,
	  i18n: _react2.default.PropTypes.string,
	  value: _react2.default.PropTypes.string,
	  onChange: _react2.default.PropTypes.func,
	  onBlur: _react2.default.PropTypes.func,
	  onFocus: _react2.default.PropTypes.func
	};

	/**
	 * Default props for the component.
	 */
	Mask.defaultProps = {
	  maskCharacter: '_',
	  formatCharacters: {
	    '9': '[0-9]',
	    'a': '^[A-Za-z]$',
	    'A': '^[A-Z]$',
	    '*': '[A-Za-z0-9]'
	  },
	  alwaysShowMask: true
	};

	exports.default = Mask;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;