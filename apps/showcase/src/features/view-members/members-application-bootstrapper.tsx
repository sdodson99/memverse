'use client';

import { useMembersContext } from '@/entities/member';
import { useEffect, useRef, useState } from 'react';
import { MembersApplication } from './members-application';
import classNames from 'classnames';

export function MembersApplicationBootstrapper() {
  const {
    members,
    addUpdateMemberMessageListener,
    removeUpdateMemberMessageListener,
  } = useMembersContext();

  const [initialized, setInitialized] = useState(false);

  const mountElementRef = useRef<HTMLDivElement>(null);
  const initialMembersRef = useRef(members);

  useEffect(() => {
    const mountElement = mountElementRef.current;

    if (!mountElement) {
      return;
    }

    const application = new MembersApplication(initialMembersRef.current);

    mountElement.appendChild(application.view);
    application.run();

    addUpdateMemberMessageListener(application.updateMemberMessage);

    setInitialized(true);

    return () => {
      mountElement.removeChild(application.view);
      application.stop();
      removeUpdateMemberMessageListener(application.updateMemberMessage);
    };
  }, [
    mountElementRef,
    addUpdateMemberMessageListener,
    removeUpdateMemberMessageListener,
  ]);

  return (
    <div
      className={classNames({
        // Push footer to bottom while full-screen application still loading.
        ['min-h-screen']: !initialized,
      })}
      ref={mountElementRef}
    />
  );
}
