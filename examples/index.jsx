import React from 'react';
import ReactDOM from 'react-dom';

import Mask from '../src/react-masking.jsx';

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
                        <Mask mask="+3199 999 99 99" maskCharacter="_">
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
                </main>
                <footer>

                </footer>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));
