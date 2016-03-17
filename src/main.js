var React = require('react');
var ReactDOM = require('react-dom');

var TodoModel = require('./todoModel');
var TodoApp = require('./todoApp');

var model = new TodoModel('react-todos');

window.render = function () {
  React.render(
    React.createElement(TodoApp, {model: model}),
    document.getElementsByClassName('todoapp')[0]
  );
};

model.subscribe(render);
