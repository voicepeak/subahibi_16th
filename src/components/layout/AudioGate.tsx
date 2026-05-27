"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sky_archive_audio_consent";

export function useAudioConsent(): { consented: boolean; grant: () => void; revoke: () => void } {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") setConsented(true);
  }, []);

  const grant = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    setConsented(true);
  }, []);

  const revoke = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConsented(false);
  }, []);

  return { consented, grant, revoke };
}

export function AudioGate({
  consented,
  onGrant,
  onRevoke,
}: {
  consented: boolean;
  onGrant: () => void;
  onRevoke: () => void;
}) {
  return (
    <button
      type="button"
      className="audio-gate"
      onClick={consented ? onRevoke : onGrant}
      aria-label={consented ? "关闭音频" : "开启音频"}
      title={consented ? "关闭音频" : "开启音频"}
    >
      {consented ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
    </button>
  );
}
