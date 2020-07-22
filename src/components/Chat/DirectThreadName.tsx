import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { ThreadDirect } from "../../store/types";
import { userNicknameByIdSelector } from "../../store/selectors";

import TextAccent1Container from "../../components/StyledContainer/TextAccent1Container";

interface DirectThreadNameProps {
  currentUserId: number;
  thread: ThreadDirect;
  accent?: boolean;
}

const DirectThreadName: FunctionComponent<DirectThreadNameProps> = ({
  currentUserId,
  thread,
  accent,
}) => {
  const userNickname1 = useSelector(userNicknameByIdSelector(thread.userId1));
  const userNickname2 = useSelector(userNicknameByIdSelector(thread.userId2));

  const otherName =
    currentUserId === thread.userId2 ? userNickname1 : userNickname2;

  if (accent) {
    return (
      <TextAccent1Container className="font-bold">
        {otherName}
      </TextAccent1Container>
    );
  }

  return <div>{otherName}</div>;
};

export default DirectThreadName;
