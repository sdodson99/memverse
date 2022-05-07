import React, { useCallback, useEffect, useRef, useState } from 'react';
import paper from 'paper';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { useSpaceMemberCanvasResize } from '../../hooks/space/use-space-member-canvas-resize';
import styles from './SpaceCanvas.module.css';
import { usePaperScope } from '../../hooks/space/use-paper-scope';
import { useUpdateSpace } from '../../hooks/space/use-update-space';
import { merge } from 'rxjs';

type SpaceMemberRaster = {
  id: string;
  root: paper.Layer;
  raster: paper.Raster;
  username: paper.PointText;
  message: paper.PointText;
};

type SpaceCanvasProps = {};

const SpaceCanvas = ({}: SpaceCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scope: paperScope } = usePaperScope(canvasRef);
  useUpdateSpace(paperScope);

  useSpaceMemberCanvasResize(paperScope);

  const {
    spaceMembersStateRef,
    onSpaceMembersReset$,
    onSpaceMemberChanged$,
    onSpaceMemberUpdated$,
    loadSpaceMember,
    toggleSpaceMemberPaused,
    setShowSpaceMemberDetails,
  } = useSpaceMembersContext();
  const spaceMemberRastersRef = useRef<SpaceMemberRaster[]>([]);

  const addSpaceMembers = useCallback(() => {
    const spaceMemberRasters =
      spaceMembersStateRef.current.map<SpaceMemberRaster>((m) => {
        const raster = new paper.Raster();

        const avatarElement = document.createElement('img');
        avatarElement.src = m.photoUrl;
        // Use no-referrer to dodge YouTube API batch request limiting.
        avatarElement.referrerPolicy = 'no-referrer';
        avatarElement.onload = () => loadSpaceMember(m);
        raster.image = avatarElement;

        raster.position = new paper.Point(m.x, m.y);
        raster.size.height = m.height;
        raster.size.width = m.width;

        raster.onClick = () => toggleSpaceMemberPaused(m);
        raster.onMouseEnter = () => setShowSpaceMemberDetails(m, true);
        raster.onMouseLeave = () => setShowSpaceMemberDetails(m, false);

        const renderMessage = m.message && m.showMessage;
        const rasterTop = m.height / 2;
        const spacing = 15;
        const getLineOffset = (linesAboveRaster: number) =>
          rasterTop + linesAboveRaster * spacing;
        const usernameOffset = renderMessage
          ? getLineOffset(2)
          : getLineOffset(1);

        const username = new paper.PointText(
          new paper.Point(m.x, m.y - usernameOffset)
        );
        username.fontSize = 14;
        username.strokeColor = new paper.Color('white');
        username.fillColor = new paper.Color('white');
        username.justification = 'center';
        username.content = m.username;
        username.opacity = m.showUsername ? 1 : 0;

        const messageOffset = getLineOffset(1);
        const message = new paper.PointText(
          new paper.Point(m.x, m.y - messageOffset)
        );
        message.fontSize = 14;
        message.strokeColor = new paper.Color('white');
        message.fillColor = new paper.Color('white');
        message.justification = 'center';
        message.content = m.message;
        message.opacity = renderMessage ? 1 : 0;

        const root = new paper.Layer();
        root.opacity = m.loaded ? 1 : 0;
        root.addChild(raster);
        root.addChild(username);
        root.addChild(message);

        return {
          id: m.id,
          root,
          raster,
          username,
          message,
        };
      });

    spaceMemberRastersRef.current = spaceMemberRasters;
  }, [
    spaceMembersStateRef,
    loadSpaceMember,
    toggleSpaceMemberPaused,
    setShowSpaceMemberDetails,
  ]);

  const removeSpaceMembers = useCallback(() => {
    spaceMemberRastersRef.current.forEach((r) => {
      r.root.remove();
    });
  }, []);

  const resetSpaceMembers = useCallback(() => {
    removeSpaceMembers();
    addSpaceMembers();
  }, [addSpaceMembers, removeSpaceMembers]);

  const updateSpaceMember = useCallback(
    (memberId: string) => {
      const memberRaster = spaceMemberRastersRef.current.find(
        (m) => m.id === memberId
      );

      if (!memberRaster) {
        return;
      }

      const member = spaceMembersStateRef.current.find(
        (m) => m.id === memberId
      );

      if (!member) {
        return;
      }

      const { raster, root, message, username } = memberRaster;

      raster.position = new paper.Point(member.x, member.y);
      raster.opacity = member.loaded ? 1 : 0;

      const { width, height, loaded } = member;

      if (width && height) {
        // Use bounds to get the raster size after other scaling
        const rasterWidth = raster.bounds.width;
        const rasterHeight = raster.bounds.height;

        if (!rasterWidth || !rasterHeight) return;

        const horizontalScale = width / rasterWidth;
        const verticalScale = height / rasterHeight;

        // Use scaling instead of resizing to preserve image precision
        raster.scale(horizontalScale, verticalScale);
      }

      root.opacity = loaded ? 1 : 0;

      const renderMessage = member.message && member.showMessage;
      const rasterTop = member.height / 2;
      const spacing = 15;
      const getLineOffset = (linesAboveRaster: number) =>
        rasterTop + linesAboveRaster * spacing;
      const usernameOffset = renderMessage
        ? getLineOffset(2)
        : getLineOffset(1);

      message.position = new paper.Point(member.x, member.y - getLineOffset(1));
      message.content = member.message;
      message.opacity = member.showMessage && member.message ? 1 : 0;

      username.position = new paper.Point(member.x, member.y - usernameOffset);
      username.content = member.username;
      username.opacity = member.showUsername ? 1 : 0;
    },
    [spaceMembersStateRef]
  );

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!paperScope) {
      return;
    }

    if (loaded) {
      return;
    }

    resetSpaceMembers();
    setLoaded(true);
  }, [paperScope, loaded, resetSpaceMembers]);

  useEffect(() => {
    const subscription = onSpaceMembersReset$.subscribe(() => {
      resetSpaceMembers();
    });

    return () => subscription.unsubscribe();
  }, [onSpaceMembersReset$, spaceMembersStateRef, resetSpaceMembers]);

  useEffect(() => {
    const subscription = merge(
      onSpaceMemberChanged$,
      onSpaceMemberUpdated$
    ).subscribe((memberId) => {
      updateSpaceMember(memberId);
    });

    return () => subscription.unsubscribe();
  }, [
    onSpaceMemberChanged$,
    onSpaceMemberUpdated$,
    spaceMembersStateRef,
    updateSpaceMember,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.spaceCanvas}
      data-testid="SpaceCanvas"
      data-paper-resize="true"
    />
  );
};

export default SpaceCanvas;
