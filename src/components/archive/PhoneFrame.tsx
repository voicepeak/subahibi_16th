import { Battery, Signal } from "lucide-react";

export function PhoneFrame({ children, time = "22:44" }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="phone-frame">
      <span className="phone-side-button phone-side-button-left" aria-hidden="true" />
      <span className="phone-side-button phone-side-button-right" aria-hidden="true" />
      <div className="phone-hardware" aria-hidden="true">
        <span className="phone-camera" />
        <span className="phone-speaker" />
      </div>
      <div className="phone-screen">
        <div className="phone-status">
          <span>{time}</span>
          <span className="phone-status-icons">
            <Signal size={12} aria-hidden="true" />
            <Battery size={14} aria-hidden="true" />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

