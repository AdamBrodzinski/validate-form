#Validate-Form

Basic bare bones form validation. Uses data attrs on the input to determine the validation to automatically apply. 
`onblur` attributes will be validated whenever the user blurs out of the input. If an input has an error, it will add a `is-invalid` class to the input. Otherwise, it will add a 'is-valid' class to the input.



## Setup

`meteor add skinnygeek1010:validate-form`

Validate-Form will bubble events up to the `layout` template by default. If your topmost template isn't named
that, configure it with the rootLayout flag. If you need to debug, add the debug flag to dump logs to the console.

**Optional**
```
// client.js

ValidateForm.config({
  debug: true
});
```

## Useage

The simpleest setup is to add a form with an input. Using the `data-required` attr will
validate that it has at least one char. The `data-onblur` will make the input validate every
time the input is blurred. You can insert an error message by wrapping the input within a div and 
using a span with an 'err-msg' class. 

```
<form id='new-user-form' class='validate'>
  <div class="form-group">
    <input type="text" name="fullname" data-onblur data-required>
    <span class='err-msg'></span>
    <input type="submit"  value="Submit">
  </div>
  
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
<form class='validate'>
  <input type="text" data-onblur data-required>
</form>             

```

##### Minimum

Ensures that the input has more than or equal to n characters

```
<form class='validate'>
  <input type="password" data-onblur data-min=6>
</form>             

```

##### Maximum

Ensures that the input has at less than or equal to n characters

```
<form class='validate'>
  <input type="password" data-onblur data-max=140>
</form>             

```

##### Alphanumeric

Ensures that the input only contains letters and/or numbers

```
<form class='validate'>
  <input type="password" data-onblur data-alphanumeric>
</form>             

```

##### Email

Ensures that a valid email is used using a regex that catches [most email errors](http://www.regular-expressions.info/email.html) without being overly strict.

```
<form class='validate'>
  <input type="email" data-onblur data-email>
</form>

```

##### Zip Code

Ensures that a US 5 digit or 9 digit zip code are used.

```
<form class='validate'>
  <input type="text" data-onblur data-zip>
</form>

```

##### Custom Message

Use a custom message for an input's error message

```
<form class='validate'>
  <input name="lastn" type="text" data-onblur data-alphanumeric data-msg="Last name can only have [A-Z] [0-9] characters">
</form>

```

##Creating custom validators

###Create Package

First thing first make a package so that you can share the love
`meteor create username:packageName --package`

Now in your `package.js` that was created add `skinnygeek1010:validate-form` as a dependency like so


    api.use([
        'skinnygeek1010:validate-form'
      ], 'client');

###Create Validator

Now in your `packageName.js` file that was created add and modify the following code. This is the code used for the required validator so you can add anything you'd like all that matters is that you use `_showSuccess`, `_showError`, `log`, and `_validations.push(boolean)`

    ValidateForm.addValidator('data-tagName', function($el, instance) {
      var hasReq = !! $el.val();
    
      if (hasReq) {
        instance._showSuccess();
        instance.log("[ValidateForm] validationName success", instance.el);
      } else {
        instance._showError("Required field");
        instance.log("[ValidateForm] validationName failed", instance.el);
      }
    
      instance._validations.push(hasReq);
    });

