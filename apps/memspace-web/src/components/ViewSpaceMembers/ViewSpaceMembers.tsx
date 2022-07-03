import React, { useRef, useState } from 'react';
import { useThrottledSpaceMembersContext } from '../../hooks/space/use-throttled-space-members-context';
import { SpaceMember } from '../../models/space-member';
import SpaceMemberListing from '../SpaceMemberListing/SpaceMemberListing';
import TextInput from '../TextInput/TextInput';
import styles from './ViewSpaceMembers.module.css';
import ReactPaginate from 'react-paginate';

type ViewSpaceMembersProps = {};

const ITEMS_PER_PAGE = 10;

const ViewSpaceMembers = ({}: ViewSpaceMembersProps) => {
  const {
    spaceMembers,
    toggleSpaceMemberPaused,
    setShowSpaceMemberDetails,
    setSpaceMemberSpeed,
    setSpaceMemberDirectionDegrees,
    setSpaceMemberPositionX,
    setSpaceMemberPositionY,
  } = useThrottledSpaceMembersContext();
  const filterRef = useRef<HTMLInputElement | null>(null);
  const [filter, setFilter] = useState('');
  const [offset, setOffset] = useState(0);

  const membersCount = spaceMembers.length;

  const handleTogglePause = (member: SpaceMember) =>
    toggleSpaceMemberPaused(member);

  const handleShowDetails = (member: SpaceMember) =>
    setShowSpaceMemberDetails(member, true);

  const handleHideDetails = (member: SpaceMember) =>
    setShowSpaceMemberDetails(member, false);

  const handleSpeedChanged = (member: SpaceMember, value: number) =>
    setSpaceMemberSpeed(member?.id, value);

  const handleDirectionDegreesChanged = (member: SpaceMember, value: number) =>
    setSpaceMemberDirectionDegrees(member?.id, value);

  const handlePositionXChanged = (member: SpaceMember, value: number) =>
    setSpaceMemberPositionX(member?.id, value);

  const handlePositionYChanged = (member: SpaceMember, value: number) =>
    setSpaceMemberPositionY(member?.id, value);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setOffset(0);
  };

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
  const pageCount = Math.ceil(transformedSpaceMembers.length / ITEMS_PER_PAGE);

  const paginatedSpaceMembers = transformedSpaceMembers.slice(
    offset,
    offset + ITEMS_PER_PAGE
  );

  const handlePageChanged = (pageNumber: number) => {
    setOffset((pageNumber * ITEMS_PER_PAGE) % transformedSpaceMembers.length);
    filterRef.current?.scrollIntoView?.();
  };

  return (
    <div className={styles.viewSpaceMembers} data-testid="ViewSpaceMembers">
      <div>
        Thank you to the <strong>{membersCount}</strong> member(s) below for
        supporting the SingletonSean YouTube channel.
      </div>

      <div className={styles.filter}>
        <TextInput
          ref={filterRef}
          name="filter"
          placeholder="Filter members"
          autoComplete="off"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <div className={styles.listing}>
        {hasSpaceMembers && (
          <>
            <SpaceMemberListing
              members={paginatedSpaceMembers}
              onPause={handleTogglePause}
              onUnpause={handleTogglePause}
              onShowDetails={handleShowDetails}
              onHideDetails={handleHideDetails}
              onSpeedChanged={handleSpeedChanged}
              onDirectionDegreesChanged={handleDirectionDegreesChanged}
              onPositionXChanged={handlePositionXChanged}
              onPositionYChanged={handlePositionYChanged}
            />
            <ReactPaginate
              pageRangeDisplayed={3}
              pageCount={pageCount}
              onPageChange={({ selected: pageNumber }) => {
                handlePageChanged(pageNumber);
              }}
              renderOnZeroPageCount={() => null}
              breakLabel="..."
              containerClassName={styles.paginationContainer}
              pageLinkClassName={styles.paginationLink}
              activeLinkClassName={styles.paginationActivePage}
              breakLinkClassName={styles.paginationLink}
              previousLinkClassName={styles.paginationLink}
              nextLinkClassName={styles.paginationLink}
              disabledLinkClassName={styles.disabledPaginationLink}
              previousLabel="Back"
              nextLabel="Next"
            />
          </>
        )}

        {!hasSpaceMembers && (
          <div>{`No members found that match the filter '${filter}'.`}</div>
        )}
      </div>
    </div>
  );
};

export default ViewSpaceMembers;
