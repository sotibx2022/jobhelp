// components/ui/AbsoluteIcon.tsx
import React from 'react';
interface AbsoluteIconProps {
    left?: string;
    right?: string;
    icon: React.ReactNode;
    onClick?: () => void;
}
const AbsoluteIcon: React.FC<AbsoluteIconProps> = ({ left, right, icon, onClick }) => {
    return (
        <div
            className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
            style={{
                left: left ? left : undefined,
                right: right ? right : undefined,
            }}
            onClick={onClick}
        >
            {icon}
        </div>
    );
};
export default AbsoluteIcon;
