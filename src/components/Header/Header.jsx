import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { graphql, compose } from 'react-apollo';

import { Image, Icon } from 'semantic-ui-react';

import VIEWER from './Queries/VIEWER.gql';
import { getToken, removeToken } from '../../utils/token-helper';
import { APP_TITLE } from '../../constants/constants';
import { viewerShape } from '../../utils/shapes';

import style from './header.module.scss';
import withTitle from '../WithTitle';

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

Header.propTypes = {
  user: PropTypes.shape({
    viewer: PropTypes.shape(viewerShape),
  }),
};

Header.defaultProps = {
  user: {},
};

export default compose(
  graphql(VIEWER, { name: 'user' }),
  withTitle(APP_TITLE),
)(Header);
