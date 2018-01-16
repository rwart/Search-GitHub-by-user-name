class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      users: [],
    };
  }

  onChangeHandle(event) {
    this.setState({ searchText: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { searchText } = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({ users: responseJson.items }))
      .catch(e => console.log(e));
  }

  render() {

    return (
      <div className="app">
        <form onSubmit={event => this.onSubmit(event)}>
          <label htmlFor="searchText">Search GitHub by user name</label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}/>
        </form>
        <UsersList users={this.state.users}/>
      </div>
    );
  }
}

class UsersList extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    users: React.PropTypes.array.isRequired,
  };

  static defaultProps = {
    users: [],
  };

  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }

  render() {

    return (
      <div className="users-list">
        {this.users}
      </div>
    );
  }
}

class User extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    user: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    user: {},
  };

  render() {

    return (
      <div className="user">
        <img src={this.props.user.avatar_url}/>
        <a  href={this.props.user.html_url}
          target="_blank">{this.props.user.login}</a>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
