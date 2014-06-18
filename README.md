#Validate-Form

Basic bare bones form validation. Uses data attrs on the input to determine the validation to automatically apply. 
`onblur` attributes will be validated whenever the user blurs out of the input. If an input has an error, it will add a `has-error` class to the input.



## Setup

`mrt add validate-form`

Validate-Form will bubble events up to the `layout` template by default. If your topmost template isn't named
that, configure it with the rootLayout flag. If you need to debug, add the debug flag to dump logs to the console.

```
// client.js

ValidateForm.config({
  debug: true
  rootLayout: 'myLayout'
});
```

## Useage

The simpleest setup is to add a form with an input. Using the `data-required` attr will
validate that it has at least one char. The `data-onblur` will make the input validate every
time the input is blurred.

```
<form id='new-user-form'>

  <input type="text" name="fullname" data-onblur data-required>
  <input type="submit"  value="Submit">
  
</form>             

```

If you want to prevent your form from submitting bad data, use the validate method to run all validations
at once. This will return true if the form is valid.

```
Template.newUser.events({

  'submit form': function(e) {
    e.preventDefault();
    
    var isValid = ValidateForm.validate('#new-user-form');
    if (!isValid) return;
    
    .....
  }
})    

```

## Validations


##### Required

Ensures that the input has at least one character

```
<form>
  <input type="text" data-onblur data-required>
</form>             

```

##### Minimum

Ensures that the input has more than or equal to n characters

```
<form>
  <input type="password" data-onblur data-min=6>
</form>             

```

##### Maximum

Ensures that the input has at less than or equal to n characters

```
<form>
  <input type="password" data-onblur data-max=140>
</form>             

```

##### Alphanumeric

Ensures that the input only contains letters and/or numbers

```
<form>
  <input type="password" data-onblur data-alphanumeric>
</form>             

```
