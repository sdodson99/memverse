import React, { useState } from 'react';
import { useThrottledSpaceMembersContext } from '../../hooks/space/use-throttled-space-members-context';
import { SpaceMember } from '../../models/space-member';
import SpaceMemberListing from '../SpaceMemberListing/SpaceMemberListing';
import TextInput from '../TextInput/TextInput';
import styles from './ViewSpaceMembers.module.css';

type ViewSpaceMembersProps = {};

const ViewSpaceMembers = ({}: ViewSpaceMembersProps) => {
  const { spaceMembers, toggleSpaceMemberPaused, setShowSpaceMemberDetails } =
    useThrottledSpaceMembersContext();
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

  const transformedSpaceMembers = spaceMembers
    .filter((m) => m.username?.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (!a.message) {
        return 1;
      }

      if (!b.message) {
        return -1;
      }

      return 0;
    });
  const hasSpaceMembers = transformedSpaceMembers.length > 0;

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
          autoComplete="off"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <div className={styles.listing}>
        {hasSpaceMembers && (
          <SpaceMemberListing
            members={transformedSpaceMembers}
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
