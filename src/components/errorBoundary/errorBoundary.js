import React from 'react';
import PropTypes from 'prop-types';
import errorBoundry from '../../assets/error_boundry.jpg';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.log(error, errorInfo);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div>
          <center>
            <p style={{ fontSize: '4rem', color: '#BEBEBE' }}>Ooops!</p>
            <img src={errorBoundry} alt="" height="300rem" width="300rem" />
            <p style={{ fontSize: '1rem', color: '#0a0a0a' }}>
              THIS PAGE DOSEN&apos;T EXIST OR UNAVAILABLE
            </p>
          </center>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

ErrorBoundary.defaultProps = {
  children: PropTypes.node,
};
