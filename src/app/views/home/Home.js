// @flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import cx                 from 'classnames';
import {
  Card,
  CardActions,
  CardTitle,
  CardText
}                         from 'material-ui/Card';
import FlatButton         from 'material-ui/FlatButton';

class Home extends PureComponent {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired
  };

  static contextTypes = {
    // for manual routing
    router: PropTypes.object.isRequired
  };

  enterAnimationTimer = null;

  state = {
    animated: true,
    viewEnters: false
  };

  componentDidMount() {
    this.enterAnimationTimer = setTimeout(this.setViewEnters, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.enterAnimationTimer);
  }

  render() {
    const { animated, viewEnters } = this.state;
    const names = Array(150).fill('').map(a => Math.round(Math.random() * 1000));

    return(
      <section
        id="home__container"
        className={
          cx({
            'content':       true,
            'animatedViews': animated,
            'invisible':     !viewEnters,
            'view-enter':    viewEnters
          })
        }>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="box">
              <Card>
                <CardTitle
                  title="Home"
                  subtitle="View"
                />
                <CardText>
                  {names.map(function(name, index){
                    return <p key={ index }>{index}</p>;
                  })}
                </CardText>
                <CardActions>
                  <FlatButton
                    label="go previous"
                    onTouchTap={this.goPreviousRoute}
                  />
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  setViewEnters = () => {
    this.setState({viewEnters: true});
  }

  goPreviousRoute = () => {
    const { history } = this.props;
    history.goBack();
  }
}

export default Home;
