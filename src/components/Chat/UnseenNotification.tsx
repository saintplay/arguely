import React from "react";
import PropTypes, { InferProps } from "prop-types";

function UnseenNotication({
  unseenMessages,
}: InferProps<typeof UnseenNotication.propTypes>) {
  if (unseenMessages === 0) return <div>&nbsp;</div>;
  return <div>{unseenMessages}</div>;
}

UnseenNotication.propTypes = {
  unseenMessages: PropTypes.number.isRequired,
};

export default UnseenNotication;
