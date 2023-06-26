'use client';

import { useMembersContext } from './members-context';
import { useEffect, useRef } from 'react';
import { MembersApplication } from './members-application';

export function MembersApplicationBootstrapper() {
  const { members } = useMembersContext();

  const mountElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountElement = mountElementRef.current;

    if (!mountElement) {
      return;
    }

    const application = new MembersApplication(members);

    mountElement.appendChild(application.view);
    application.run();

    return () => {
      mountElement.removeChild(application.view);
      application.stop();
    };
  }, [mountElementRef, members]);

  return <div ref={mountElementRef} />;
}


