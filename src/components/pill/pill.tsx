import React from 'react';

const Pill = ({ status }: { status: string }) => {
    if (status !== 'live') return null;
    return (<>
    
    <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.5;
                        transform: scale(1.1);
                    }
                }
                .pulse {
                    animation: pulse 1s infinite;
                }
            `}</style>
            
        <div className="flex items-center space-x-2">
        <div className="relative flex items-center justify-center">
            <div className="w-3 h-3 bg-[#f67979] rounded-full pulse"></div>
        </div>
        <span className="text-[#f67979] font-semibold">LIVE</span>
        </div>
    </>
    )
    
}

export default Pill;