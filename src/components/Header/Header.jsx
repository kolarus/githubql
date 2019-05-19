import React from 'react';

import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { Image, Icon } from 'semantic-ui-react';
import { getToken, removeToken } from '../../utils/token-helper';
import VIEWER from './Queries/VIEWER.gql';
import style from './header.module.scss';

const Header = (props) => {
  const { user: { viewer } } = props;

  return (
    <header className={style.header}>
      <Link to="/">
        <h1>
            githubql
          <sup>0.1</sup>
        </h1>
      </Link>
      {
            viewer
              ? (
                <div>
                  Hello
                  {' '}
                  {viewer.name || viewer.login}
                  {' '}
                  <Image src={viewer.avatarUrl} avatar />
                  {
                    getToken()
                      ? (
                        <Icon
                          name="sign out"
                          link
                          onClick={() => {
                            removeToken();
                            window.location.href = '/';
                          }}
                        />
                      )
                      : null
                  }
                </div>
              )
              : null
        }
    </header>
  );
};

export default graphql(VIEWER, { name: 'user' })(Header);
