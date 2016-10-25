// Demo component
// this is only example component
// you can find tests in __test__ folder

import React from 'react';
import ReactDOM from 'react-dom';

class Mask extends React.Component {
    constructor(props) {
        super(props);

        this.hasValue = this.props.value != null;

        const child = React.Children.only(this.props.children);

        const maskObj = this.parseMask(this.props.mask);

        let value = this.props.value || child.props.value;

        this.mask = maskObj.mask;
        this.permanents = maskObj.permanents;
        this.lastEditablePos = maskObj.lastEditablePos;

        this.maskCharacter = this.props.maskCharacter;

        if (this.mask && (this.props.alwaysShowMask || value)) {
            value = this.formatValue(value);
        }

        this.state = {child, value};

        this.onCopy = this.onCopy.bind(this);
        this.onCut = this.onCut.bind(this);
        this.onPaste = this.onPaste.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCopy = this.onCopy.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);

        this.onKeyPress = this.onKeyPress.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    /**
     * Replace substr of value on a given position with a new substr.
     * @param value
     * @param newSubstr
     * @param position
     * @returns {String}
     */
    static replaceSubstr(value, newSubstr, position) {
        return value.slice(0, position)
            + newSubstr
            + value.slice(position + newSubstr.length);
    }

    /**
     * Check whether the browser is an android browser.
     * @param isFirefox
     * @returns {boolean}
     */
    static isAndroidBrowser(isFirefox = false) {
        var windows = new RegExp("windows", "i");
        var firefox = new RegExp("firefox", "i");
        var android = new RegExp("android", "i");
        var ua = navigator.userAgent;
        return !windows.test(ua) && (isFirefox === firefox.test(ua)) && android.test(ua);
    }

    /**
     * Check whether the browser is an windows phone browser.
     * @returns {boolean}
     */
    static isWindowsPhoneBrowser() {
        var windows = new RegExp("windows", "i");
        var phone = new RegExp("phone", "i");
        var ua = navigator.userAgent;
        return windows.test(ua) && phone.test(ua);
    }

    static isDOMElement(element) {
        return typeof HTMLElement === "object"
            ? element instanceof HTMLElement // DOM2
            : element.nodeType === 1 && typeof element.nodeName === "string";
    }

    setInputValue(value) {
        const input = this.input;
        this.value = value;
        input.value = value;
    }

    /**
     * @deprecated
     * @returns {*}
     */
    getInputDOMNode() {
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
            return ReactDOM.findDOMNode(input);
        }
    }

    /**
     * Sets the caret to the end position of the editable area.
     */
    setCaretToEnd() {
        const filledLength = this.getFilledLength();
        const position = this.getRightEditablePosition(filledLength);

        if (position !== null) {
            this.setCaretPosition(position);
        }
    }

    setSelection(start, len = 0) {
        const input = this.input;
        const end = start + len;
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

    /**
     * Get selection based on dom node. Used document when selection is not
     * in the input node.
     * @returns {{start: number, end: number, length: number}}
     */
    getSelection() {
        const input = this.input;
        let start = 0;
        let end = 0;
        if ("selectionStart" in input && "selectionEnd" in input) {
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

    setCaretPosition(pos) {
        const raf = Mask.requestAnimationFrame();
        const setPosition = this.setSelection.bind(this, pos, 0);
        setPosition();
        raf(setPosition);
    }

    getCaretPosition() {
        return this.getSelection().start;
    }

    /**
     * Get the prefix from the mask. Useful for on focus character position.
     * @returns {string}
     */
    getPrefix() {
        const { mask } = this;
        let prefix = '';
        for (let i = 0; i < mask.length && this.isPermanentChar(i); ++i) {
            prefix += mask[i];
        }
        return prefix;
    }


    /**
     * Gets the next editable position based on current position.
     * @param position
     * @returns {*}
     */
    getEditablePosition(position) {
        const { mask } = this;

        for (let i = position; i < mask.length; i++) {
            if (!this.isPermanentChar(i)) {
                return i;
            }
        }
        return null;
    }

    getLeftEditablePosition(position) {
        const { mask } = this;

        for (let i = position; i >= 0; --i) {
            if (!this.isPermanentChar(i)) {
                return i;
            }
        }
        return null;
    }

    getRightEditablePosition(position) {
        const { mask } = this;

        for (let i = position; i < mask.length; ++i) {
            if (!this.isPermanentChar(i)) {
                return i;
            }
        }
        return null;
    }

    getFilledLength(value = this.state.value) {
        let i;
        const { maskCharacter } = this;
        if (!maskCharacter) {
            return value.length;
        }

        for (i = value.length - 1; i >= 0; --i) {
            let character = value[i];
            if (!this.isPermanentChar(i) && this.isAllowedChar(character, i)) {
                break;
            }
        }
        return ++i || this.getPrefix().length;
    }

    componentWillMount() {
        const { mask } = this;
        const { value } = this.state;
        if (mask && value) {
            this.setState({value});
        }
    }

    componentDidMount() {
        this.isAndroidBrowser = Mask.isAndroidBrowser();
        this.isWindowsPhoneBrowser = Mask.isWindowsPhoneBrowser();
        this.isAndroidFirefox = Mask.isAndroidBrowser(true);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    onCopy(e) {

    }

    onCut(e) {

    }

    onPaste(e) {

    }

    /**
     * Handles delete and backspace actions onKeyDown. Also triggers bound
     * actions on the Mask.
     * @param e
     */
    onKeyDown(e) {
        this.input = e.target;
        const key = e.key;
        let { value } = this.state;
        let preventDefault = false;
        let caretPosition = this.getCaretPosition();

        switch (key) {
            case "Backspace":
            case "Delete":
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
            default:
                break;
        }

        if (value !== this.state.value) {
            this.setInputValue(value);
            this.setState({value});
            preventDefault = true;
        }

        if (preventDefault) {
            e.preventDefault();
            this.setCaretPosition(caretPosition);
        }

    }

    onKeyPress(e) {
        const key = e.key;
        this.input = e.target;

        if (key === "Enter" || e.ctrlKey || e.metaKey) {
            return;
        }

        // When browser is windows phone browser return, keypress cannot be
        // hijacked.
        if (this.isWindowsPhoneBrowser) {
            return;
        }

        let caretPosition = this.getCaretPosition();

        let { value } = this.state;
        const { mask, maskCharacter, lastEditablePos } = this;
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
            this.setState({value});
        }

        e.preventDefault();

        if (caretPosition < lastEditablePos && caretPosition > prefix.length) {
            caretPosition = this.getRightEditablePosition(caretPosition);
        }
        this.setCaretPosition(caretPosition);

    }

    onBlur(e) {

    }

    onChange(e) {
        this.input = e.target;
        var { pasteSelection, mask, maskCharacter, lastEditablePos, preventEmptyChange } = this;
        let value = this.input.value;
        let oldValue = this.state.value;

        if (pasteSelection) {
            this.pasteSelection = null;
            this.pasteText(oldValue, value, pasteSelection, e);
            return;
        }

        const selection = this.getSelection();
        const prefix = this.getPrefix();
        let caretPosition = selection.end;
        let clearedValue;

        if (value.length > oldValue.length) {
            const substrLength = value.length - oldValue.length;
            const startPosition = selection.end - substrLength;
            const enteredSubstr = value.substr(startPosition, substrLength);

            if (startPosition < lastEditablePos &&
                (substrLength !== 1 || enteredSubstr !== mask[startPosition])) {
                caretPosition= this.getRightEditablePosition(startPosition);
            } else {
                caretPosition = startPosition;
            }

            value = value.substr(0, startPosition) + value.substr(startPosition + substrLength);

            clearedValue = this.clearRange(value, startPosition, mask.length - startPosition);
            clearedValue = this.insertRawSubstr(clearedValue, enteredSubstr, caretPosition);

            value = this.insertRawSubstr(oldValue, enteredSubstr, caretPosition);
            if (substrLength !== 1 || (caretPosition >= prefix.length && caretPosition < lastEditablePos)) {
                caretPosition = this.getFilledLength(clearedValue);
            } else if (caretPosition < lastEditablePos) {
                caretPosition++;
            }
        } else if (value.length < oldValue.length) {
            const removedLength = mask.length - value.length;
            clearedValue = this.clearRange(oldValue, selection.end, removedLength);
            const substr = value.substr(0, selection.end);
            const clearOnly = substr === oldValue.substr(0, selection.end);

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

    onFocus(e) {
        this.input = e.target;
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
     * @param character
     * @param position
     * @param allowMaskChar
     * @returns {boolean}
     */
    isAllowedChar(character, position, allowMaskChar = false) {
        const { mask, maskCharacter } = this;
        const ruleCharacter = mask[position];
        const characterRule = this.props.formatCharacters[ruleCharacter];

        if (this.isPermanentChar(position)) {
            return ruleCharacter === character;
        }

        return (new RegExp(characterRule).test(character))
            || (allowMaskChar && character === maskCharacter);
    }

    /**
     * Return if the given index is a permanent character. Used to generate
     * a prefix.
     * @param i
     * @returns {boolean}
     */
    isPermanentChar(i) {
        return this.permanents.indexOf(i) !== -1;
    }

    isFilled(value = this.state.value) {
        return this.getFilledLength(value) === this.mask.length;
    }

    clearRange(value, start, length) {
        const end = start + length;
        const { maskCharacter, mask} = this;

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

    formatValue(value = '') {
        const { maskCharacter, mask } = this;

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
     * @param value
     * @param substr
     * @param position
     * @return {String}
     */
    insertRawSubstr(value, substr, position) {
        const { mask, maskCharacter } = this;
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
     * @param rawMask
     * @returns {{mask: string, permanents: Array}}
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

    /**
     * Returns a function to be able to ask the browser for an animation frame.
     * Useful for setting the animation frame.
     * @returns {Function}
     */
    static requestAnimationFrame() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            (fn => setTimeout(fn, 0));
    }


    allowedCharacter(character) {
        if (this.props.formatCharacters.hasOwnProperty(character)) {

        }
    }

    render() {
        const value =  this.state.child.props.value;
        const handlerKeys = ["onFocus", "onBlur", "onChange", "onKeyDown", "onKeyPress", "onPaste"];
        const props = {value};
        handlerKeys.forEach(k => {
            props[k] = this[k];
        });
        if (props.value != null) {
            props.value = this.state.value;
        }
        const child = React.cloneElement(this.state.child, props);

        return (
            <div className="masked">
                {child}
            </div>
        );
    }
}

Mask.propTypes = {
    children: React.PropTypes.object,
    mask: React.PropTypes.string,
    maskCharacter: React.PropTypes.string,
    formatCharacters: React.PropTypes.object,
    i18n: React.PropTypes.string
};

Mask.defaultProps = {
    maskCharacter: "_",
    formatCharacters: {
        "9": "[0-9]",
        "a": "[A-Za-z]",
        "*": "[A-Za-z0-9]"
    }
};

export default Mask;