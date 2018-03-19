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
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton         from 'material-ui/FlatButton';

class Menus extends PureComponent {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired
  };

  enterAnimationTimer= null;

  state = {
    animated: true,
    viewEnters: false,
    value: 1,
  };

  componentDidMount() {
    this.enterAnimationTimer = setTimeout(this.setViewEnters, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.enterAnimationTimer);
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const { animated, viewEnters } = this.state;
    const items = Array(150).fill('a');
    const component = this;
    const list = items.map(function(name, index){
      return <DropDownMenu key={ index } value={component.state.value} onChange={component.handleChange}>
      <MenuItem value={1} primaryText="Never" />
      <MenuItem value={2} primaryText="Every Night" />
      <MenuItem value={3} primaryText="Weeknights" />
      <MenuItem value={4} primaryText="Weekends" />
      <MenuItem value={5} primaryText="Weekly" />
    </DropDownMenu>;
    })
    return(
      <section
        id="menus__container"
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
                  title="Menus"
                  subtitle="View"
                />
                <CardText>
                 { list }
                </CardText>
                <CardActions>
                  <FlatButton
                    label="go Home"
                    onTouchTap={this.routeToHome}
                  />
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

  routeToHome = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push({pathname: '/'});
  }

  goPreviousRoute = () => {
    const { history } = this.props;
    history.goBack();
  }
}

Menus.propTypes= {

};

Menus.contextTypes = {
  // for manual routing
  router: React.PropTypes.object.isRequired
};

export default Menus;
