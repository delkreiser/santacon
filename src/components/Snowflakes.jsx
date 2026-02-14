import React from 'react';

const Snowflakes = () => {
    const snowflakes = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: 10 + Math.random() * 20,
        fontSize: 10 + Math.random() * 20,
        delay: Math.random() * 10
    }));

    return (
        <>
            {snowflakes.map(flake => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: `${flake.left}%`,
                        animationDuration: `${flake.animationDuration}s`,
                        fontSize: `${flake.fontSize}px`,
                        animationDelay: `${flake.delay}s`
                    }}
                >
                    ❄
                </div>
            ))}
        </>
    );
};

export default Snowflakes;
