'use client';

import { useMembersContext } from '@/entities/member';
import { useEffect, useRef, useState } from 'react';
import { MembersApplication } from './members-application';

export function MembersApplicationBootstrapper() {
  const {
    members,
    addUpdateMemberMessageListener,
    removeUpdateMemberMessageListener,
  } = useMembersContext();

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

  return <div ref={mountElementRef} />;
}
