import bindAll from 'lodash.bindall';
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Blocker from 'meteor/brewhk:accounts-block';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class BlockedUserListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      blockedUsers: [],
    }

    bindAll(this, 'updateBlockedUsers');
    this.updateBlockedUsers();
  }

  updateBlockedUsers() {
    Meteor.call('brewhk:accounts-block/getBlockedUsers', (err, res) => {
      this.setState({
        ready: true,
        blockedUsers: res,
      })
    })
  }

  unblock(userId) {
    this.setState({
      ready: false,
    });

    Blocker.unblockUser(userId, (err, res) => {
      this.updateBlockedUsers();
    });
  }

  render() {
    const getComponentToRender = () => {
      if(Meteor.userId()) {
        if (this.state.ready) {
          return (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>First Name</TableHeaderColumn>
                  <TableHeaderColumn>Last Name</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  this.state.blockedUsers.map(user => {
                    return (
                      <TableRow>
                        <TableRowColumn>{ user.settings.account.firstName }</TableRowColumn>
                        <TableRowColumn>{ user.settings.account.lastName }</TableRowColumn>
                        <TableRowColumn><RaisedButton label="Unblock" onClick={this.unblock.bind(this, user._id)} /></TableRowColumn>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          )
        }
        return <CircularProgress />;
      }
      return null;
    }
    return getComponentToRender();
  }
}

export default BlockedUserListing;
