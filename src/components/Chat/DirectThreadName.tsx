import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { ThreadDirect } from "../../store/types";
import { userNicknameByIdSelector } from "../../store/selectors";

interface DirectThreadNameProps {
  currentUserId: number;
  thread: ThreadDirect;
}

const DirectThreadName: FunctionComponent<DirectThreadNameProps> = ({
  currentUserId,
  thread,
}) => {
  const userNickname1 = useSelector(userNicknameByIdSelector(thread.userId1));
  const userNickname2 = useSelector(userNicknameByIdSelector(thread.userId2));

  const otherName =
    currentUserId === thread.userId2 ? userNickname1 : userNickname2;

  return <div>{otherName}</div>;
};

export default DirectThreadName;
