import bindAll from 'lodash.bindall';

import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Blocker from 'meteor/brewhk:accounts-block';

class BlockButton extends Component {
  constructor(props) {
    super(props);
    bindAll(this, 'block', 'unblock');
  }

  block() {
    Blocker.blockUser(this.props.userId, (err, res) => {
    });
  }

  unblock() {
    Blocker.unblockUser(this.props.userId, (err, res) => {
    });
  }

  render() {
    const getComponentToRender = () => {
      if(Meteor.userId()) {
        if (this.props.ready) {
          return this.props.isBlocked ? (
            <RaisedButton label="Unblock" onClick={this.unblock} />
          ) : (
            <RaisedButton label="Block" onClick={this.block} />
          );
        }
        return <CircularProgress />;
      }
      return null;
    }
    return getComponentToRender();
  }
}

BlockButton.propTypes = {
  ready: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  isBlocked: PropTypes.bool.isRequired,
};

export default createContainer((params) => {
  const blockMappingSubscriptionHandle = Meteor.subscribe('brewhk:accounts-block/mappingOfUsersBlocked');
  return {
    ready: blockMappingSubscriptionHandle.ready(),
    isBlocked: Blocker.checkIfBlocked(params.userId, Meteor.userId()),
  };
}, BlockButton);
