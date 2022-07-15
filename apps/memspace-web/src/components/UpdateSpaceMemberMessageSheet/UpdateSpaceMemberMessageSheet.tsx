import { useToast } from '@chakra-ui/react';
import React from 'react';
import { BottomSheet, BottomSheetProps } from 'react-spring-bottom-sheet';
import { useThrottledSpaceMembersContext } from '../../hooks/space/use-throttled-space-members-context';
import UpdateSpaceMemberMessage from '../UpdateSpaceMemberMessage/UpdateSpaceMemberMessage';

type UpdateSpaceMemberMessageSheetProps = {
  innerContentClassName?: string;
  onSuccess?: () => void;
} & Omit<BottomSheetProps, 'children'>;

const UpdateSpaceMemberMessageSheet = ({
  innerContentClassName,
  onSuccess,
  ...others
}: UpdateSpaceMemberMessageSheetProps) => {
  const { setShowSpaceMemberDetails } = useThrottledSpaceMembersContext();
  const toast = useToast();

  const handleUpdateSpaceMemberMessageSuccess = (memberId: string) => {
    onSuccess?.();

    setShowSpaceMemberDetails(memberId, true);

    toast({
      title: 'Message updated.',
      description: 'We successfully updated your space member message.',
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top',
    });
  };

  return (
    <BottomSheet header="Message" maxHeight={500} {...others}>
      <div className={innerContentClassName}>
        <UpdateSpaceMemberMessage
          onSuccess={handleUpdateSpaceMemberMessageSuccess}
        />
      </div>
    </BottomSheet>
  );
};

export default UpdateSpaceMemberMessageSheet;
