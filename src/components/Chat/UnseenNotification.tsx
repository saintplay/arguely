import React from "react";
import PropTypes, { InferProps } from "prop-types";
import styled from "../../theme";

const NOTIFICATION_SIZE = 20;

function UnseenNotication({
  unseenMessages,
}: InferProps<typeof UnseenNotication.propTypes>) {
  if (unseenMessages === 0) return <div>&nbsp;</div>;
  return (
    <NotificationWrapper
      className="flex justify-center items-center rounded-full text-xs"
      style={{
        width: NOTIFICATION_SIZE,
        height: NOTIFICATION_SIZE,
      }}
    >
      {unseenMessages}
    </NotificationWrapper>
  );
}

UnseenNotication.propTypes = {
  unseenMessages: PropTypes.number.isRequired,
};

const NotificationWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.notification};
`;

export default UnseenNotication;
