import React from 'react';

/**
 * React masking component.
 */
export default class Mask extends React.Component {
  /**
   * Constructor for Masking component. Sets all values needed for the rest of
   * the component and binds all needed actions.
   * @param {object} props - See defaultProps and propTypes.
   */
  constructor(props) {
    super(props);

    const child = this.child = React.Children.only(this.props.children);
    let value = this.props.value || child.props.value;

    this.hasValue = !!this.props.value;

    const maskObj = this.parseMask(this.props.mask);
    this.mask = maskObj.mask;
    this.permanents = maskObj.permanents;
    this.lastEditablePos = maskObj.lastEditablePos;

    // Set mask character or load default from props.
    this.maskCharacter = this.props.maskCharacter;

    if (this.mask && (this.props.alwaysShowMask || value)) {
      value = this.formatValue(value);
    }

    this.state = {child, value};

    // All Events. This ensures all actions on the input field are logical to
    // the browser AND user.
    this.onPaste = this.onPaste.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onCopy = this.onCopy.bind(this);
  }

  /**
   * Replace substr of value on a given position with a new substr.
   * @param {string} value - initial value
   * @param {string} newSubstr - substring that should replace part of the
   *  value
   * @param {number} position - position of substring
   * @returns {string} replaced substring
   */
  static replaceSubstr(value, newSubstr, position) {
    return value.slice(0, position)
      + newSubstr
      + value.slice(position + newSubstr.length);
  }

  /**
   * Check whether the browser is an android browser.
   * @param {boolean} isFirefox - switch if is firefox browser on android.
   * @returns {boolean} true or false if android.
   */
  static isAndroidBrowser(isFirefox = false) {
    const windows = new RegExp('windows', 'i');
    const firefox = new RegExp('firefox', 'i');
    const android = new RegExp('android', 'i');
    const ua = navigator.userAgent;
    return !windows.test(ua) && (isFirefox === firefox.test(ua))
      && android.test(ua);
  }

  /**
   * Check whether the browser is an windows phone browser.
   * @returns {boolean} true or false if windows phone.
   */
  static isWindowsPhoneBrowser() {
    const windows = new RegExp('windows', 'i');
    const phone = new RegExp('phone', 'i');
    const ua = navigator.userAgent;
    return windows.test(ua) && phone.test(ua);
  }

  /**
   * Returns a function to be able to ask the browser for an animation frame.
   * Useful for setting the cursor.
   * @returns {Function} animation frame function.
   */
  static requestAnimationFrame() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      (fn => setTimeout(fn, 0));
  }

  /**
   * Set's the inputs field value and the main value.
   * @param {string} value - input value.
   * @return {undefined}
   */
  setInputValue(value) {
    const input = this.input;
    input.value = value;
  }

  /**
   * Sets the caret to the end position of the editable area.
   * @return {undefined}
   */
  setCaretToEnd() {
    const filledLength = this.getFilledLength();
    const position = this.getRightEditablePosition(filledLength);

    if (position !== null) {
      this.setCaretPosition(position);
    }
  }

  /**
   * Sets the caret to the position given bij the param.
   * @param {number} position - Position of the caret.
   * @returns {undefined}
   */
  setCaretPosition(position) {
    const raf = Mask.requestAnimationFrame();
    const setPosition = this.setSelection.bind(this, position, 0);
    setPosition();
    raf(setPosition);
  }

  /**
   * Get's the current caret position.
   * @returns {number} Position of caret.
   */
  getCaretPosition() {
    return this.getSelection().start;
  }

  /**
   * Set seleciton based on start and length. Often used for setting the caret
   * to the right position.
   * @param {number} start - Start of selection
   * @param {number} len - length of selection, can be 0.
   * @returns {undefined}
   */
  setSelection(start, len = 0) {
    const input = this.input;
    const end = start + len;
    let range = 0;
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
  getSelection() {
    const input = this.input;
    let start = 0;
    let end = 0;
    if ('selectionStart' in input && 'selectionEnd' in input) {
      start = input.selectionStart;
      end = input.selectionEnd;
    } else {
      const range = document.selection.createRange();
      if (range.parentElement() === input) {
        start = -range.moveStart('character', -input.value.length);
        end = -range.moveEnd('character', -input.value.length);
      }
    }

    const length = end - start;

    return {start, end, length};
  }

  /**
   * Get the prefix from the mask. Useful for on focus character position.
   * @returns {string} Prefix string
   */
  getPrefix() {
    const {mask} = this;
    let prefix = '';
    for (let i = 0; i < mask.length && this.isPermanentChar(i); ++i) {
      prefix += mask[i];
    }
    return prefix;
  }


  /**
   * Gets the next editable position based on current position.
   * @param {number} position - Current position
   * @returns {number|null} Returns editable position or null.
   */
  getEditablePosition(position) {
    const {mask} = this;
    let i = position;

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
  getLeftEditablePosition(position) {
    let i = position;
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
  getRightEditablePosition(position) {
    const {mask} = this;
    let i = position;
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
  getFilledLength(value = this.state.value) {
    let character, i;
    const {maskCharacter} = this;
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
  getRawSubstrLength(substr, position) {
    let character;
    const {mask} = this;
    let i = position;
    let substrArray = substr.split('');
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
  getInputValue() {
    const input = this.input;
    const {valueDescriptor} = this;

    let value;
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
  componentWillMount() {
    const {mask} = this;
    const {value} = this.state;
    if (mask && value) {
      this.setState({value});
    }
  }

  /**
   * Component did mount function that checks what type of browser is used.
   * @return {undefined}
   */
  componentDidMount() {
    this.isAndroidBrowser = Mask.isAndroidBrowser();
    this.isWindowsPhoneBrowser = Mask.isWindowsPhoneBrowser();
  }

  /**
   * On paste action
   * @param {object} event - Browser event.
   * @returns {undefined}
   */
  onPaste(event) {
    if (this.isAndroidBrowser) {
      this.pasteSelection = this.getSelection();
      this.setInputValue('');
      return;
    }

    let text;

    if (window.clipboardData && window.clipboardData.getData) { // IE
      text = window.clipboardData.getData('Text');
    } else if (event.clipboardData && event.clipboardData.getData) {
      text = event.clipboardData.getData('text/plain');
    }

    if (text) {
      let value = this.state.value;
      let selection = this.getSelection();
      this.pasteText(value, text, selection, event);
    }
    event.preventDefault();

  }

  /**
   * On Copy event, this makes sure that NO masking characters will be copied.
   * @param {object} event - Browser event.
   * @returns {undefined}
   */
  onCopy(event) {
    let value = this.getInputValue();
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
  onKeyDown(event) {
    this.input = event.target;
    const key = event.key;
    let value = event.target.value;
    let preventDefault = false;
    let caretPosition = this.getCaretPosition();

    switch (key) {
      case 'Backspace':
      case 'Delete': {
        const prefix = this.getPrefix();
        const deleteFromRight = key === 'Delete';
        const selectionRange = this.getSelection();

        if (selectionRange.length) {
          value = this.clearRange(value, selectionRange.start, selectionRange.length);
        } else if (caretPosition < prefix.length
          || (!deleteFromRight && caretPosition === prefix.length)) {
          caretPosition = prefix.length;
        } else {
          const editablePosition = deleteFromRight ?
            this.getRightEditablePosition(caretPosition) :
            this.getLeftEditablePosition(caretPosition - 1);
          if (editablePosition !== null) {
            value = this.clearRange(value, editablePosition, 1);
            caretPosition = editablePosition;
          }
        }
        break;
      }
      default: {
        break;
      }
    }

    if (value !== this.state.value) {
      this.setInputValue(value);
      this.setState({value: this.hasValue ? this.state.value : value});
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
  onKeyPress(event) {
    const key = event.key;
    this.input = event.target;

    if (key === 'Enter' || event.ctrlKey || event.metaKey) {
      return;
    }

    // When browser is windows phone browser return, keypress cannot be
    // hijacked.
    if (this.isWindowsPhoneBrowser) {
      return;
    }

    let caretPosition = this.getCaretPosition();

    let {value} = this.state;
    const {mask, lastEditablePos} = this;
    const prefix = this.getPrefix();
    const selection = this.getSelection();

    if (this.isPermanentChar(caretPosition) && mask[caretPosition] === key) {
      value = this.insertRawSubstr(value, key, caretPosition);
      ++caretPosition;
    } else {
      const editablePosition = this.getRightEditablePosition(caretPosition);

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
  onKeyUp(event) {
    this.setState({value: event.target.value});
  }

  /**
   * On Blur event for the input field. Makes sure the correct state has been
   * set.
   * @returns {undefined}
   */
  onBlur() {
    if (!this.props.alwaysShowMask && this.isEmpty()) {
      let inputValue = '';
      const isInputValueChanged = inputValue !== this.getInputValue();
      if (isInputValueChanged) {
        this.setInputValue(inputValue);
      }

      this.setState({
        value: this.hasValue ? this.state.value : ''
      });
    }
  }

  getClearedValue(value, substr, startPosition, endPosition, caretPosition) {
    const clearedValue = this.clearRange(value, startPosition, endPosition);
    return this.insertRawSubstr(clearedValue, substr, caretPosition);
  }

  formatEnteredSubstr(inputValue, oldValue) {
    const {lastEditablePos, mask} = this;
    const substrLength = inputValue.length - oldValue.length;
    const selection = this.getSelection();
    const startPosition = selection.end - substrLength;
    const endPosition = mask.length - startPosition;
    const enteredSubstr = inputValue.substr(startPosition, substrLength);
    const prefix = this.getPrefix();
    let caretPosition = selection.end;
    let clearedValue;

    if (startPosition < lastEditablePos &&
      (substrLength !== 1 || enteredSubstr !== mask[startPosition])) {
      caretPosition = this.getRightEditablePosition(startPosition);
    } else {
      caretPosition = startPosition;
    }

    inputValue = inputValue.substr(0, startPosition) +
      inputValue.substr(startPosition + substrLength);

    if (substrLength !== 1 ||
      (caretPosition >= prefix.length && caretPosition < lastEditablePos)) {
      clearedValue = this.getClearedValue(
        inputValue, enteredSubstr, startPosition, endPosition, caretPosition
      );
      caretPosition = this.getFilledLength(clearedValue);
    } else if (caretPosition < lastEditablePos) {
      caretPosition++;
    }
    return {inputValue, caretPosition};
  }

  formatRemovedSubstr(inputValue, oldValue) {
    const {mask, maskCharacter} = this;
    const selection = this.getSelection();
    const prefix = this.getPrefix();
    const removedLength = mask.length - inputValue.length;
    const substr = inputValue.substr(0, selection.end);
    const clearOnly = substr === oldValue.substr(0, selection.end);
    let clearedValue = this.clearRange(oldValue, selection.end, removedLength);
    let caretPosition = selection.end;

    if (maskCharacter) {
      inputValue = this.insertRawSubstr(clearedValue, substr, 0);
    }

    if (!clearOnly) {
      clearedValue = this.getClearedValue(
        clearedValue, substr, selection.end, mask.length - selection.end, 0);
      caretPosition = this.getFilledLength(clearedValue);
    } else if (caretPosition < prefix.length) {
      caretPosition = prefix.length;
    }
    return {inputValue, caretPosition};
  }

  /**
   * On Change event. This is the main event listener that makes sure all
   * masking changes will be set correctly.
   * @param {object} event - Browser event
   * @returns {undefined}
   */
  onChange(event) {
    // Set input on change event. This ensures we have the right scope.
    this.input = event.target;
    const {pasteSelection} = this;
    const oldValue = this.state.value;
    let inputValue = this.input.value;

    // Ensure that when text has been pasted, the rest of the onChange function
    // does not trigger.
    if (pasteSelection) {
      this.pasteSelection = null;
      this.pasteText(oldValue, inputValue, pasteSelection, event);
      return;
    }
    let formattedStr, caretPosition;

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
  onFocus(event) {
    this.input = event.target;
    if (!this.state.value) {
      const prefix = this.getPrefix();
      let value = this.formatValue(prefix);
      let inputValue = this.formatValue(value);

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
  isAllowedChar(character, position, allowMaskChar = false) {
    const {mask, maskCharacter} = this;
    const ruleCharacter = mask[position];
    const characterRule = this.props.formatCharacters[ruleCharacter];

    if (this.isPermanentChar(position)) {
      return ruleCharacter === character;
    }

    return (new RegExp(characterRule).test(character))
      || (allowMaskChar && character === maskCharacter);
  }

  /**
   * Return if the given position is a permanent character. Used to generate
   * a prefix.
   * @param {number} position - given position.
   * @returns {boolean} true or false if character is permanent.
   */
  isPermanentChar(position) {
    return this.permanents.indexOf(position) !== -1;
  }

  /**
   * Check whether the input field is completely filled.
   * @param {string} value - Value to check if input is filled.
   * @returns {boolean} true or false if input is filled.
   */
  isFilled(value = this.state.value) {
    return this.getFilledLength(value) === this.mask.length;
  }

  /**
   * Check if the input value is empty. This checks if given characters are
   * permanent or given by user input.
   * @param {string} value - input value
   * @returns {boolean} true or false if field is empty.
   */
  isEmpty(value = this.state.value) {
    return !value.split('').some((character, i) =>
      !this.isPermanentChar(i) && this.isAllowedChar(character, i)
    );
  }

  /**
   * Clears a given range at a given start position and length in the value.
   * @param {string} value - value to clear
   * @param {number} start - start value where to clear
   * @param {number} length - length of value to clear.
   * @returns {string} new value.
   */
  clearRange(value, start, length) {
    const end = start + length;
    const {maskCharacter, mask} = this;

    if (!maskCharacter) {
      const prefix = this.getPrefix();

      value = value.split('')
        .filter((_, i) => i < prefix.length || i < start || i >= end)
        .join('');
      return this.formatValue(value);
    }
    return value.split('').map((c, i) => {
      if (i < start || i >= end) {
        return c;
      }
      if (this.isPermanentChar(i)) {
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
  formatValue(value = '') {
    const {maskCharacter, mask} = this;

    if (!maskCharacter) {
      const prefix = this.getPrefix();

      value = this.insertRawSubstr('', value, 0);

      let valueEnd = value.length - 1;

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
      const emptyValue = this.formatValue();
      return this.insertRawSubstr(emptyValue, value, 0);
    }

    return value.split('')
      .concat(new Array(mask.length - value.length).fill(null))
      .map((character, position) => {
        if (this.isAllowedChar(character, position)) {
          return character;
        } else if (this.isPermanentChar(position)) {
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
  insertRawSubstr(value, substr, position) {
    const {mask, maskCharacter} = this;
    const isFilled = this.isFilled(value);
    const prefix = this.getPrefix();
    substr = substr.split('');

    if (!maskCharacter && position > value.length) {
      value += mask.slice(value.length, position);
    }

    for (let i = position; i < mask.length && substr.length;) {
      const isPermanent = this.isPermanentChar(i);
      if (!isPermanent || mask[i] === substr[0]) {
        let character = substr.shift();
        if (this.isAllowedChar(character, i, true)) {
          if (i < value.length) {
            if (maskCharacter || isFilled || i < prefix.length) {
              value = Mask.replaceSubstr(value, character, i);
            } else {
              value = this.formatValue(
                value.substr(0, i) + character + value.substr(i)
              );
            }
          } else if (!maskCharacter) {
            value += character;
          }
          ++i;
        }
      } else {
        if (!maskCharacter && i >= value.length) {
          value += mask[i];
        } else if (maskCharacter && isPermanent
          && substr[0] === maskCharacter) {
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
  parseMask(rawMask) {
    const permanents = []; // Keeps track of permanent position.
    let isPermanent = false;
    let mask = '';
    let lastEditablePos = null;

    // Split mask on each character and define which is a permanent char.
    rawMask.split('').forEach(c => {
      isPermanent = !isPermanent && c === '\\';

      if (isPermanent || !this.props.formatCharacters.hasOwnProperty(c)) {
        permanents.push(mask.length)
      } else {
        lastEditablePos = mask.length + 1;
      }
      mask += c;
    });
    return {mask, permanents, lastEditablePos};
  }

  pasteText(value, text, selection, event) {
    let caretPosition = selection.start;
    if (selection.length) {
      value = this.clearRange(value, caretPosition, selection.length);
    }
    let textLen = this.getRawSubstrLength(text, caretPosition);
    value = this.insertRawSubstr(value, text, caretPosition);
    caretPosition += textLen;
    caretPosition = this.getRightEditablePosition(caretPosition)
      || caretPosition;
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


  render() {
    const value = this.child.props.value;
    const handlerKeys = ['onFocus', 'onBlur', 'onChange', 'onKeyDown',
      'onKeyPress', 'onKeyUp', 'onPaste', 'onCopy'];
    const props = {value};
    handlerKeys.forEach(k => {
      props[k] = this[k];
    });
    if (props.value !== null && props.value !== undefined) {
      props.value = this.state.value;
    }
    props.onKeyUp = this.onKeyUp;
    this.child = React.cloneElement(this.child, props);

    return (
      <div className='masked'>
        {this.child}
      </div>
    );
  }
}

/**
 * Set default prop types.
 */
Mask.propTypes = {
  children: React.PropTypes.object,
  mask: React.PropTypes.string,
  maskCharacter: React.PropTypes.string,
  formatCharacters: React.PropTypes.object,
  alwaysShowMask: React.PropTypes.bool,
  i18n: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func
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
