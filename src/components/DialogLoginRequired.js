import React from "react";
import PropTypes from "prop-types";
import DialogAlert from "./DialogAlert";
import { withNavigate } from "../utils/RouterTool";

class DialogLoginRequired extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigate);
  }

  render() {
    return (
      <DialogAlert
        getOpen={(handleOpen) => {
          this.props.getOpen(handleOpen);
        }}
        title="提示信息"
        content="您尚未登录，请先登录:)"
        buttons={[
          {
            label: "没有账号？去注册",
            callback: () => this.props.navigate("/register"),
          },
          {
            label: "去登录",
            callback: () => this.props.navigate("/login"),
          },
        ]}
      />
    );
  }
}

DialogLoginRequired.propTypes = {
  getOpen: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default withNavigate(DialogLoginRequired);
