import React, { Component } from 'react';

class Counter extends Component {
  static defaultProps = {
    step: 1,
    initialValue: 0,
  };

  state = {
    value: this.props.initialValue,
  };

  //   constructor() {
  //     super();
  //     this.handleIncrement = this.handleIncrement.bind(this);
  //     this.handleDecrement = this.handleDecrement.bind(this);
  //     this.state = { value: this.props.initialValue };
  //   }

  //   handleIncrement(evt) {
  //     console.log('Increment button was clicked!', evt); // работает
  //     console.log('this.props: ', this.props); // Error: cannot read props of undefined
  //   }

  //   handleDecrement(evt) {
  //     console.log('Decrement button was clicked!', evt); // работает
  //     console.log('this.props: ', this.props); // Error: cannot read props of undefined
  //   }

  //   handleIncrement = evt => {
  //     console.log('Increment button was clicked!', evt); // работает
  //     console.log('this.props: ', this.props); // работает
  //   };

  //   handleDecrement = evt => {
  //     console.log('Decrement button was clicked!', evt); // работает
  //     console.log('this.props: ', this.props); // работает
  //   };

  handleIncrement = () => {
    this.setState((state, props) => ({
      value: state.value + props.step,
    }));
  };

  handleDecrement = () => {
    this.setState((state, props) => ({
      value: state.value - props.step,
    }));
  };

  render() {
    const { step } = this.props;

    return (
      <div>
        <span>{this.state.value}</span>
        <button type="button" onClick={this.handleIncrement}>
          Increment by {step}
        </button>
        <button type="button" onClick={this.handleDecrement}>
          Decrement by {step}
        </button>
      </div>
    );
  }
}

// Button получает функцию changeMessage (имя пропа),
// которая вызывается при событии onClick
const Button = ({ changeMessage, label }) => (
  <button type="button" onClick={changeMessage}>
    {label}
  </button>
);

class Appl extends Component {
  state = {
    message: new Date().toLocaleTimeString(),
  };

  // Метод который будем передавать в Button для вызова при клике
  updateMessage = evt => {
    console.log(evt); // Доступен объект события
    this.setState({
      message: new Date().toLocaleTimeString(),
    });
  };

  render() {
    return (
      <div>
        <span>{this.state.message}</span>
        <Button label="Change message" changeMessage={this.updateMessage} />
      </div>
    );
  }
}

class LoginForm extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const login = form.elements.login.value;
    const password = form.elements.password.value;
    console.log(login, password);
    this.props.onSubmit({ login, password });
    form.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="login" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    );
  }
}

class Apply extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = evt => {
    this.setState({ value: evt.target.value });
    console.log(evt.target.value);
  };

  render() {
    const { inputValue } = this.state;
    return (
      <input
        type="text"
        name="text"
        value={inputValue}
        onChange={this.handleChange}
      />
    );
  }
}

// Выносим объект с примитивами в константу чтобы было удобно сбрасывать.
// Нельзя использовать если в каком-то свойстве состояния хранится сложный тип.
const Gender = {
  MALE: 'male',
  FEMALE: 'female',
};

const INITIAL_STATE = {
  login: '',
  email: '',
  password: '',
  agreed: false,
  gender: null,
  age: '',
};

class SignUpForm extends React.Component {
  state = { ...INITIAL_STATE };

  // Для всех инпутов создаем один обарботчик
  // Различать инпуты будем по атрибуту name
  handleChange = evt => {
    const { name, value, type, checked } = evt.target;
    // Если тип элемента checkbox, берем значение checked,
    // в противном случае value
    console.log(checked);
    console.log(value);
    console.log(type);
    console.log([name]);
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { login, email, password, agreed } = this.state;
    console.log(
      `Login: ${login}, Email: ${email}, Password: ${password}, Agreed: ${agreed}`
    );
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { login, email, password, agreed, gender, age } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="Enter login"
            name="login"
            value={login}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Agree to terms
          <input
            name="checkbox"
            type="checkbox"
            checked={agreed}
            onChange={this.handleChange}
          />
        </label>

        <section>
          <h2>Choose your gender</h2>
          <label>
            Male
            <input
              type="radio"
              checked={gender === Gender.MALE}
              name="gender"
              value={Gender.MALE}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Female
            <input
              type="radio"
              checked={gender === Gender.FEMALE}
              name="gender"
              value={Gender.FEMALE}
              onChange={this.handleChange}
            />
          </label>
        </section>

        <label>
          Choose your age
          <select name="age" value={age} onChange={this.handleChange}>
            <option value="" disabled>
              ...
            </option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36+">36+</option>
          </select>
        </label>

        <button type="submit" disabled={!agreed}>
          Sign up as {login}
        </button>
      </form>
    );
  }
}

export { Counter, Appl, LoginForm, Apply, SignUpForm };
