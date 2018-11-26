import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";

import { changeIdiom, addStock, updateStock, removeStock } from "../actions";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormattedText from "./FormattedText";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import classNames from "classnames";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: "center"
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    margin: theme.spacing.unit
  }
});

class App extends Component {
  state = {
    anchorEl: null,
    idioms: ["en-us", "pt-br"],
    ticker: ""
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <FormattedText
              ptbr="Gerenciamento de Ações"
              enus="Stock Management"
              size="h3"
            />
            <div>
              <Button
                variant="contained"
                color="secondary"
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={event => {
                  this.setState({ anchorEl: event.currentTarget });
                }}
              >
                {this.props.reducer.idiom.toUpperCase()}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={e => {
                  e.preventDefault();
                  this.setState({ anchorEl: null });
                }}
              >
                {this.state.idioms.map((element, id) => (
                  <MenuItem
                    key={id}
                    onClick={e => {
                      e.preventDefault();
                      this.props.changeIdiom(this.state.idioms[id]);
                      this.setState({ anchorEl: null });
                    }}
                  >
                    {element.toUpperCase()}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.root} spacing={8}>
          {this.props.reducer.data.stocks.map((element, id) => (
            <Grid item xs={3} key={id}>
              <Paper className={classes.paper}>
                <FormattedText
                  ptbr={element.ticker}
                  enus={element.ticker}
                  size="h4"
                />
                <TextField
                  id="outlined-dense"
                  type="number"
                  label={
                    this.props.reducer.idiom === "pt-br"
                      ? "Valor (R$)"
                      : "Value ($)"
                  }
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  value={
                    this.props.reducer.idiom === "pt-br"
                      ? element.brl
                      : element.usd
                  }
                  onChange={e => {
                    e.preventDefault();
                    this.props.updateStock(
                      id,
                      e.target.value,
                      element.quantity,
                      element.name,
                      this.props.reducer.idiom
                    );
                  }}
                />
                <TextField
                  id="outlined-dense"
                  type="number"
                  label={
                    this.props.reducer.idiom === "pt-br"
                      ? "Quantidade"
                      : "Quantity"
                  }
                  value={element.quantity}
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  onChange={e => {
                    e.preventDefault();
                    this.props.updateStock(
                      id,
                      this.props.reducer.idiom === "pt-br"
                        ? element.brl
                        : element.usd,
                      e.target.value,
                      element.name,
                      this.props.reducer.idiom
                    );
                  }}
                />
                <TextField
                  id="outlined-dense"
                  label={this.props.reducer.idiom === "pt-br" ? "Nome" : "Name"}
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  value={element.name}
                  onChange={e => {
                    e.preventDefault();
                    this.props.updateStock(
                      id,
                      this.props.reducer.idiom === "pt-br"
                        ? element.brl
                        : element.usd,
                      element.quantity,
                      e.target.value,
                      this.props.reducer.idiom
                    );
                  }}
                />
                <TextField
                  id="outlined-dense"
                  label={
                    this.props.reducer.idiom === "pt-br"
                      ? "Última atualização"
                      : "Last update"
                  }
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  disabled
                  value={
                    this.props.reducer.idiom === "pt-br"
                      ? `${
                          element.updated_time.day < 10
                            ? "0" + element.updated_time.day
                            : element.updated_time.day
                        }/${
                          element.updated_time.month < 10
                            ? "0" + element.updated_time.month
                            : element.updated_time.month
                        }/${element.updated_time.year}    ${
                          element.updated_time.hours < 10
                            ? "0" + element.updated_time.hours
                            : element.updated_time.hours
                        }:${
                          element.updated_time.minutes < 10
                            ? "0" + element.updated_time.minutes
                            : element.updated_time.minutes
                        }:${
                          element.updated_time.seconds < 10
                            ? "0" + element.updated_time.seconds
                            : element.updated_time.seconds
                        }`
                      : `${
                          element.updated_time.month < 10
                            ? "0" + element.updated_time.month
                            : element.updated_time.month
                        }/${
                          element.updated_time.day < 10
                            ? "0" + element.updated_time.day
                            : element.updated_time.day
                        }/${element.updated_time.year}    ${
                          element.updated_time.hours % 12
                            ? element.updated_time.hours % 12
                            : 12
                        }:${
                          element.updated_time.minutes < 10
                            ? "0" + element.updated_time.minutes
                            : element.updated_time.minutes
                        }:${
                          element.updated_time.seconds < 10
                            ? "0" + element.updated_time.seconds
                            : element.updated_time.seconds
                        }${element.updated_time.hours >= 12 ? " PM" : " AM"}`
                  }
                  // variant="outlined"
                />
                <TextField
                  id="outlined-dense"
                  label={
                    this.props.reducer.idiom === "pt-br"
                      ? "Quantia Total (R$)"
                      : "Total Amount   ($)"
                  }
                  value={
                    this.props.reducer.idiom === "pt-br"
                      ? element.totalbrl
                      : element.totalusd
                  }
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  disabled
                />
                <Button
                  variant="extendedFab"
                  aria-label="Delete"
                  className={classes.button}
                  onClick={e => {
                    e.preventDefault();
                    this.props.removeStock(id);
                  }}
                >
                  <DeleteIcon className={classes.extendedIcon} />
                </Button>
              </Paper>
            </Grid>
          ))}

          <Grid item xs={3} />
        </Grid>
        <Paper className={classes.paper}>
          <TextField
            id="outlined-dense"
            label={this.props.reducer.idiom === "pt-br" ? "Código" : "Ticker"}
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            // variant="outlined"
            onChange={e => {
              e.preventDefault();
              this.setState({ ticker: e.target.value });
            }}
          />
          <Button
            variant="extendedFab"
            aria-label="Delete"
            className={classes.button}
            onClick={e => {
              e.preventDefault();
              this.props.addStock(this.state.ticker);
            }}
          >
            <AddIcon className={classes.extendedIcon} />
            <FormattedText ptbr="Ação" enus="Stock" />
          </Button>
          <FormattedText
            ptbr="Valor do Portfólio (R$)"
            enus="Wallet Value ($)"
            size="h6"
          />
          <TextField
            id="outlined-dense"
            value={
              this.props.reducer.idiom === "pt-br"
                ? this.props.reducer.data.wallet.brl
                : this.props.reducer.data.wallet.usd
            }
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            disabled
          />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({ reducer: state.marketReducer });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeIdiom,
      addStock,
      updateStock,
      removeStock
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(App));
