import React from 'react';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import SpaceMemberListing from '../SpaceMemberListing/SpaceMemberListing';
import styles from './ViewSpaceMembers.module.css';

type ViewSpaceMembersProps = {};

const ViewSpaceMembers = ({}: ViewSpaceMembersProps) => {
  const { spaceMembers } = useSpaceMembersContext();

  const membersCount = spaceMembers.length;

  return (
    <div className={styles.viewSpaceMembers} data-testid="ViewSpaceMembers">
      <div>
        Thank you to the <strong>{membersCount}</strong> member(s) below for
        supporting the SingletonSean YouTube channel.
      </div>
      <div className={styles.listing}>
        <SpaceMemberListing members={spaceMembers} />
      </div>
    </div>
  );
};

export default ViewSpaceMembers;
