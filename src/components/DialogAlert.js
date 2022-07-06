import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

class DialogAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.props.getOpen(() => this.handleClickOpen());
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {this.props.buttons.map(({ label, callback }) => (
              <Button
                key={label}
                onClick={() => {
                  this.handleClose();
                  callback();
                }}
              >
                {label}
              </Button>
            ))}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogAlert.propTypes = {
  getOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default DialogAlert;
