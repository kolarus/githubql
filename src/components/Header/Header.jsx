import React from 'react';

import { Link } from 'react-router-dom';
import style from './header.module.scss';

const Header = () => (
  <header className={style.header}>
    <Link to="/">
      <h1>
          githubql
        <sup>0.1</sup>
      </h1>
    </Link>
  </header>
);

export default Header;
