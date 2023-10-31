import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

class Searchbar extends Component {
  state = {
    name: ' ',
  };

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  reset = () => {
    this.setState({ name: ' ', number: ' ' });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handelSearch(this.state.name);
    this.reset();
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormBtn}>
            <span>
              <FiSearch size="20" color="black" />
            </span>
          </button>

          <input
            className={css.searchformImput}
            name="name"
            type="text"
            onChange={this.handleInputChange}
            value={this.state.name}
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
