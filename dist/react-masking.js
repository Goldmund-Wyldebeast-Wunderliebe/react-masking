/******/ (function(modules) { // webpackBootstrap
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

	var _typeof2 = __webpack_require__(1);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(73);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(74);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(78);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(87);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * React masking component.
	 */
	var Mask = function (_React$Component) {
	  (0, _inherits3.default)(Mask, _React$Component);

	  /**
	   * Constructor for Masking component. Sets all values needed for the rest of
	   * the component and binds all needed actions.
	   * @param {object} props - See defaultProps and propTypes.
	   */
	  function Mask(props) {
	    (0, _classCallCheck3.default)(this, Mask);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Mask.__proto__ || (0, _getPrototypeOf2.default)(Mask)).call(this, props));

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


	  (0, _createClass3.default)(Mask, [{
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
	     * @returns {undefined}
	     */

	  }, {
	    key: 'onBlur',
	    value: function onBlur() {
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

	        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
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
	  onChange: _react2.default.PropTypes.func
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

	 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/veldman/projects/react-masking/src/react-masking.jsx"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/veldman/projects/react-masking/src/react-masking.jsx"); } } })();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(2);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(53);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(48);
	module.exports = __webpack_require__(52).f('iterator');

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(5)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(8)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(6)
	  , defined   = __webpack_require__(7);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(9)
	  , $export        = __webpack_require__(10)
	  , redefine       = __webpack_require__(25)
	  , hide           = __webpack_require__(15)
	  , has            = __webpack_require__(26)
	  , Iterators      = __webpack_require__(27)
	  , $iterCreate    = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(44)
	  , getPrototypeOf = __webpack_require__(46)
	  , ITERATOR       = __webpack_require__(45)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , core      = __webpack_require__(12)
	  , ctx       = __webpack_require__(13)
	  , hide      = __webpack_require__(15)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 11 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(14);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(16)
	  , createDesc = __webpack_require__(24);
	module.exports = __webpack_require__(20) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(17)
	  , IE8_DOM_DEFINE = __webpack_require__(19)
	  , toPrimitive    = __webpack_require__(23)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(20) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(20) && !__webpack_require__(21)(function(){
	  return Object.defineProperty(__webpack_require__(22)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(21)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18)
	  , document = __webpack_require__(11).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(18);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);

/***/ },
/* 26 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(29)
	  , descriptor     = __webpack_require__(24)
	  , setToStringTag = __webpack_require__(44)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(15)(IteratorPrototype, __webpack_require__(45)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(17)
	  , dPs         = __webpack_require__(30)
	  , enumBugKeys = __webpack_require__(42)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(22)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(43).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(16)
	  , anObject = __webpack_require__(17)
	  , getKeys  = __webpack_require__(31);

	module.exports = __webpack_require__(20) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(32)
	  , enumBugKeys = __webpack_require__(42);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(26)
	  , toIObject    = __webpack_require__(33)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(39)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(34)
	  , defined = __webpack_require__(7);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(35);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(33)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(38);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(6)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(6)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(40)('keys')
	  , uid    = __webpack_require__(41);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).document && document.documentElement;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(16).f
	  , has = __webpack_require__(26)
	  , TAG = __webpack_require__(45)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(40)('wks')
	  , uid        = __webpack_require__(41)
	  , Symbol     = __webpack_require__(11).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(26)
	  , toObject    = __webpack_require__(47)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	var global        = __webpack_require__(11)
	  , hide          = __webpack_require__(15)
	  , Iterators     = __webpack_require__(27)
	  , TO_STRING_TAG = __webpack_require__(45)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(50)
	  , step             = __webpack_require__(51)
	  , Iterators        = __webpack_require__(27)
	  , toIObject        = __webpack_require__(33);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(8)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(45);

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(55);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	module.exports = __webpack_require__(12).Symbol;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(11)
	  , has            = __webpack_require__(26)
	  , DESCRIPTORS    = __webpack_require__(20)
	  , $export        = __webpack_require__(10)
	  , redefine       = __webpack_require__(25)
	  , META           = __webpack_require__(56).KEY
	  , $fails         = __webpack_require__(21)
	  , shared         = __webpack_require__(40)
	  , setToStringTag = __webpack_require__(44)
	  , uid            = __webpack_require__(41)
	  , wks            = __webpack_require__(45)
	  , wksExt         = __webpack_require__(52)
	  , wksDefine      = __webpack_require__(57)
	  , keyOf          = __webpack_require__(58)
	  , enumKeys       = __webpack_require__(59)
	  , isArray        = __webpack_require__(62)
	  , anObject       = __webpack_require__(17)
	  , toIObject      = __webpack_require__(33)
	  , toPrimitive    = __webpack_require__(23)
	  , createDesc     = __webpack_require__(24)
	  , _create        = __webpack_require__(29)
	  , gOPNExt        = __webpack_require__(63)
	  , $GOPD          = __webpack_require__(65)
	  , $DP            = __webpack_require__(16)
	  , $keys          = __webpack_require__(31)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(64).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(61).f  = $propertyIsEnumerable;
	  __webpack_require__(60).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(9)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(41)('meta')
	  , isObject = __webpack_require__(18)
	  , has      = __webpack_require__(26)
	  , setDesc  = __webpack_require__(16).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(21)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(11)
	  , core           = __webpack_require__(12)
	  , LIBRARY        = __webpack_require__(9)
	  , wksExt         = __webpack_require__(52)
	  , defineProperty = __webpack_require__(16).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(31)
	  , toIObject = __webpack_require__(33);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(31)
	  , gOPS    = __webpack_require__(60)
	  , pIE     = __webpack_require__(61);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 61 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(35);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(33)
	  , gOPN      = __webpack_require__(64).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(32)
	  , hiddenKeys = __webpack_require__(42).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(61)
	  , createDesc     = __webpack_require__(24)
	  , toIObject      = __webpack_require__(33)
	  , toPrimitive    = __webpack_require__(23)
	  , has            = __webpack_require__(26)
	  , IE8_DOM_DEFINE = __webpack_require__(19)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(20) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57)('asyncIterator');

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57)('observable');

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71);
	module.exports = __webpack_require__(12).Object.getPrototypeOf;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(47)
	  , $getPrototypeOf = __webpack_require__(46);

	__webpack_require__(72)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(10)
	  , core    = __webpack_require__(12)
	  , fails   = __webpack_require__(21);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(75);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	var $Object = __webpack_require__(12).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(10);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(20), 'Object', {defineProperty: __webpack_require__(16).f});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(1);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(80);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(84);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(1);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	module.exports = __webpack_require__(12).Object.setPrototypeOf;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(10);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(83).set});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(18)
	  , anObject = __webpack_require__(17);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(13)(Function.call, __webpack_require__(65).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	var $Object = __webpack_require__(12).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(10)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(29)});

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = react;

/***/ }
/******/ ]);