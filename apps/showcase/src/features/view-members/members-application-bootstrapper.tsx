'use client';

import { useMembersContext } from './members-context';
import { useEffect, useRef, useState } from 'react';
import { MembersApplication } from './members-application';

export function MembersApplicationBootstrapper() {
  const {
    members,
    addUpdateMemberMessageListener,
    removeUpdateMemberMessageListener,
  } = useMembersContext();

  const mountElementRef = useRef<HTMLDivElement>(null);

  const [application] = useState(() => new MembersApplication(members));

  useEffect(() => {
    const mountElement = mountElementRef.current;

    if (!mountElement) {
      return;
    }

    mountElement.appendChild(application.view);
    application.run();

    addUpdateMemberMessageListener(application.updateMemberMessage);

    return () => {
      mountElement.removeChild(application.view);
      application.stop();
      removeUpdateMemberMessageListener(application.updateMemberMessage);
    };
  }, [
    application,
    mountElementRef,
    addUpdateMemberMessageListener,
    removeUpdateMemberMessageListener,
  ]);

  return <div ref={mountElementRef} />;
}
