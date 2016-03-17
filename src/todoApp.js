var React = require('react');
var Router = require('director').Router;
var constants = require('./constants');
var template = require('./todoApp.rt');

var ENTER_KEY = 13;

module.exports = React.createClass({
  displayName: "TodoApp",

  render: template,

  getInitialState: function () {
    return {
      nowShowing: constants.ALL_TODOS,
      editing: null,
      newTodo: ''
    };
  },

  componentDidMount: function () {
    var setState = this.setState;
    var router = new Router({
      '/': setState.bind(this, {nowShowing: constants.ALL_TODOS}),
      '/active': setState.bind(this, {nowShowing: constants.ACTIVE_TODOS}),
      '/completed': setState.bind(this, {nowShowing: constants.COMPLETED_TODOS})
    });
    router.init('/');
  },


  handleChange: function (event) {
    this.setState({newTodo: event.target.value});
  },

  handleNewTodoKeyDown: function (event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = this.state.newTodo.trim();

    if (val) {
      this.props.model.addTodo(val);
      this.setState({newTodo: ''});
    }
  },

  toggleAll: function (event) {
    var checked = event.target.checked;
    this.props.model.toggleAll(checked);
  },

  toggle: function (todoToToggle) {
    this.props.model.toggle(todoToToggle);
  },

  destroy: function (todo) {
    this.props.model.destroy(todo);
  },

  edit: function (todo) {
    this.setState({editing: todo.id});
  },

  save: function (todoToSave, text) {
    this.props.model.save(todoToSave, text);
    this.setState({editing: null});
  },

  cancel: function () {
    this.setState({editing: null});
  },

  clearCompleted: function () {
    this.props.model.clearCompleted();
  },

  getTodos: function () {
    var todos = this.props.model.todos;

    return todos.filter(function (todo) {
      switch (this.state.nowShowing) {
        case constants.ACTIVE_TODOS:
          return !todo.completed;
        case constants.COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

  },

  getActiveTodoCount: function () {
    var todos = this.props.model.todos;
    return todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);
  }


});
