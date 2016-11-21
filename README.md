# React Masking

React Masking component meant to be used with Inputs, made especially with packages like React Validation in mind.
Based on the [react-input-mask](https://github.com/sanniassin/react-input-mask) package made by [sanniassin](https://github.com/sanniassin).
Thanks for the idea's on building this package.

This package is made with the [react-npm-boilerplate](https://github.com/juliancwirko/react-npm-boilerplate) 
package by [juliancwirko](https://github.com/juliancwirko). 

## Usage

Using npm:

    npm install --save react-masking
    
Then in your React Package, do:

    import Mask from 'react-masking';
    
    <Mask mask="+31999999999">
      <input type="text" />
    </Mask>
    
## TODO

- [ ] Create example page.

### Functional
- [ ] Auto capitalize when regex only contains capitalized letters like: `[A-Z]`
- [ ] Copy and paste actions.

### Code
- [ ] Add comment blocks to functions. Current version is barely readable.

## Known bugs

- [ ] Works with react validation, but mask characters can be deleted. 

## License

[MIT (c) 2016 Kenneth Veldman](LICENSE)