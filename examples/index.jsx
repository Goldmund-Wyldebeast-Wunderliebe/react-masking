import React from 'react';
import ReactDOM from 'react-dom';

import Validation from 'react-validation';
import validator from 'validator';

import Mask from '../src/react-masking.jsx';

Object.assign(Validation.rules, {
    // Key name maps the rule
    required: {
        // Function to validate value
        // NOTE: value might be a number -> force to string
        rule: value => {
            return value.toString().trim();
        },
        // Function to return hint
        // You may use current value to inject it in some way to the hint
        hint: value => {
            return <span className='form-error is-visible'>Required</span>;
        }
    },
    email: {
        // Example usage with external 'validator'
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>{value} isnt an Email.</span>
        }
    },
    // This example shows a way to handle common task - compare two fields for equality
    password: {
        // rule function can accept argument:
        // components - components registered to Form mapped by name
        rule: (value, components) => {
            const password = components.password.state;
            const passwordConfirm = components.passwordConfirm.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === passwordConfirm.value;
        },
        hint: () => <span className="form-error is-visible">Passwords should be equal.</span>
    }
});

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1>React Masking</h1>
                </header>
                <main>
                    <h2>Demo</h2>
                    <section>
                        <h3>Telephone</h3>
                        <Mask mask="+31999999999" maskCharacter="_">
                            <input value="" name="telephone-1" />
                        </Mask>
                        <h3>Telephone (label)</h3>
                        <Mask mask="+3199 999 99 99" maskCharacter="-">
                            <label>
                                Telephone
                                <input value="" name="telephone-2" ref="node" />
                            </label>
                        </Mask>
                        <h3>Postcode</h3>
                        <Mask mask="9999 aa">
                            <input name="postcode" value=""/>
                        </Mask>
                    </section>
                    <h2>Demo react-validation</h2>
                    <section>
                        <h3>Simple form</h3>
                        <Validation.components.Form ref={form => this.form = form}>
                            <Mask mask="+31999">
                                <Validation.components.Input validations={['required']} name="input" value=""/>
                            </Mask>
                            <Mask mask="9999 AA">
                                <Validation.components.Input validations={['required']} name="zip" value=""/>
                            </Mask>
                        </Validation.components.Form>
                    </section>
                </main>
                <footer>
                    <input onChange={e => console.log('onChange')}
                           onKeyDown={e => console.log('onKeyDown')}
                           onKeyUp={e => console.log('onKeyUp')} />
                </footer>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));


