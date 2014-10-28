module.exports = {
  src: ["app/*.js", "app/**/*.js", "lib/*.js", "lib/**/*.js", "config/*.js", "config/**/*.js"],
  options: {
    breakOnErrors: false,
    errorsOnly: false,               // show only maintainability errors
    cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
    halstead: [8, 13, 20],           // or optionally a single value, like 8
    maintainability: 100,
    hideComplexFunctions: false,     // only display maintainability
    broadcast: false                 // broadcast data over event-bus
  }
};