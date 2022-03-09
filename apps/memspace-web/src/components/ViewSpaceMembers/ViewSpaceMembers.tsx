import React, { useState } from 'react';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { SpaceMember } from '../../models/space-member';
import SpaceMemberListing from '../SpaceMemberListing/SpaceMemberListing';
import TextInput from '../TextInput/TextInput';
import styles from './ViewSpaceMembers.module.css';

type ViewSpaceMembersProps = {};

const ViewSpaceMembers = ({}: ViewSpaceMembersProps) => {
  const { spaceMembers, toggleSpaceMemberPaused, setShowSpaceMemberDetails } =
    useSpaceMembersContext();
  const [filter, setFilter] = useState('');

  const membersCount = spaceMembers.length;

  const handleTogglePause = (member: SpaceMember) =>
    toggleSpaceMemberPaused(member);

  const handleShowDetails = (member: SpaceMember) =>
    setShowSpaceMemberDetails(member, true);
  const handleHideDetails = (member: SpaceMember) =>
    setShowSpaceMemberDetails(member, false);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(event.target.value);

  const filteredSpaceMembers = spaceMembers.filter((m) =>
    m.username?.toLowerCase().includes(filter.toLowerCase())
  );
  const hasSpaceMembers = filteredSpaceMembers.length > 0;

  return (
    <div className={styles.viewSpaceMembers} data-testid="ViewSpaceMembers">
      <div>
        Thank you to the <strong>{membersCount}</strong> member(s) below for
        supporting the SingletonSean YouTube channel.
      </div>

      <div className={styles.filter}>
        <TextInput
          name="filter"
          placeholder="Filter members"
          value={filter}
          onChange={handleFilterChange}
          autoComplete="off"
        />
      </div>

      <div className={styles.listing}>
        {hasSpaceMembers && (
          <SpaceMemberListing
            members={filteredSpaceMembers}
            onPause={handleTogglePause}
            onUnpause={handleTogglePause}
            onShowDetails={handleShowDetails}
            onHideDetails={handleHideDetails}
          />
        )}

        {!hasSpaceMembers && (
          <div>{`No members found that match the filter '${filter}'.`}</div>
        )}
      </div>
    </div>
  );
};

export default ViewSpaceMembers;
