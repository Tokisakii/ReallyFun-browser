/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function withParams(Component) {
  function WrappedComponent(props) {
    return <Component {...props} params={useParams()} />;
  }
  return WrappedComponent;
}

function withNavigate(Component) {
  function WrappedComponent(props) {
    return <Component {...props} navigate={useNavigate()} />;
  }
  return WrappedComponent;
}

export { withParams, withNavigate };
