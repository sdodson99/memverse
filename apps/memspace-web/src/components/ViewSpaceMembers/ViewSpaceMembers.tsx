import React from 'react';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { SpaceMember } from '../../models/space-member';
import SpaceMemberListing from '../SpaceMemberListing/SpaceMemberListing';
import styles from './ViewSpaceMembers.module.css';

type ViewSpaceMembersProps = {};

const ViewSpaceMembers = ({}: ViewSpaceMembersProps) => {
  const { spaceMembers, toggleSpaceMemberPaused, setShowSpaceMemberDetails } =
    useSpaceMembersContext();

  const membersCount = spaceMembers.length;

  const handleTogglePause = (member: SpaceMember) =>
    toggleSpaceMemberPaused(member);

  const handleShowDetails = (member: SpaceMember) =>
    setShowSpaceMemberDetails(member, true);
  const handleHideDetails = (member: SpaceMember) =>
    setShowSpaceMemberDetails(member, false);

  return (
    <div className={styles.viewSpaceMembers} data-testid="ViewSpaceMembers">
      <div>
        Thank you to the <strong>{membersCount}</strong> member(s) below for
        supporting the SingletonSean YouTube channel.
      </div>
      <div className={styles.listing}>
        <SpaceMemberListing
          members={spaceMembers}
          onPause={handleTogglePause}
          onUnpause={handleTogglePause}
          onShowDetails={handleShowDetails}
          onHideDetails={handleHideDetails}
        />
      </div>
    </div>
  );
};

export default ViewSpaceMembers;
