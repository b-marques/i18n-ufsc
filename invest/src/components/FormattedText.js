import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  grow: {
    flexGrow: 1,
    padding: theme.spacing.unit * 1
  }
});
class FormattedMessage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Typography
        variant={this.props.size}
        color="inherit"
        className={classes.grow}
      >
        {this.props.reducer.idiom === "pt-br"
          ? this.props.ptbr
          : this.props.enus}
      </Typography>
    );
  }
}

const mapStateToProps = state => ({ reducer: state.marketReducer });

export default connect(
  mapStateToProps,
  null
)(withStyles(styles, { withTheme: true })(FormattedMessage));
