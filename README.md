# Vue.js Coding Challenge: Negotiation App
The app is based on the idea of a work contract negotiation: Employer and employee enter
salary values and the app tells if the expectations meet.

The interface of the app consists of two tabs: one for the employee and one for the
employer. Each tab contains an input box which only accepts numbers, and a “Submit”
button. 
Once a value has been entered and submitted, the input field of the tab disappears.
The employer enters how much she is willing to pay maximally. 

The employee enters how much he expects to be paid minimally. As soon as both inputs have been submitted, a modal
window pops up and shows either “Success!” or “Failure!”, as well as the entered values.

“Success” is only if the employee’s minimum pay is equal to or below the employer’s
maximum pay. Otherwise the input is considered a “Failure”.

The modal window should also show the current temperature in London, using data from the
the https://openweathermap.org/current API. (Because why not). 


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
