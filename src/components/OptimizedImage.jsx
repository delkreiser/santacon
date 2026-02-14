import React from 'react';

// Image dimensions lookup to prevent layout shift (CLS)
const IMAGE_DIMS = {
    'img/header.jpg': { w: 1200, h: 630 },
    'img/group.jpg': { w: 1200, h: 900 },
    'img/sfsantacon.jpg': { w: 403, h: 280 },
    'img/hanging.jpg': { w: 300, h: 214 },
    'img/first-santacon.jpg': { w: 300, h: 225 },
    'img/believe.jpg': { w: 300, h: 225 },
    'img/costumes.jpg': { w: 960, h: 720 },
    'img/lineup.jpg': { w: 300, h: 198 },
    'img/santaball.jpg': { w: 300, h: 300 },
    'img/santaballheader.jpg': { w: 940, h: 470 },
    'img/leglamp.jpg': { w: 1024, h: 1024 },
    'img/mohawk.jpg': { w: 1000, h: 1309 },
};

// Images where WebP conversion resulted in smaller files
const HAS_WEBP = new Set([
    'img/header.jpg', 'img/sfsantacon.jpg', 'img/hanging.jpg',
    'img/first-santacon.jpg', 'img/believe.jpg', 'img/lineup.jpg',
    'img/santaball.jpg', 'img/santaballheader.jpg', 'img/leglamp.jpg',
]);

const OptimizedImage = ({ src, alt, className, style, lazy = true }) => {
    const dims = IMAGE_DIMS[src];
    const webpSrc = HAS_WEBP.has(src) ? src.replace('.jpg', '.webp') : null;

    const imgProps = {
        alt,
        className,
        style,
        ...(lazy ? { loading: 'lazy' } : {}),
        ...(dims ? { width: dims.w, height: dims.h } : {}),
    };

    if (webpSrc) {
        return (
            <picture>
                <source srcSet={webpSrc} type="image/webp" />
                <img src={src} {...imgProps} />
            </picture>
        );
    }

    return <img src={src} {...imgProps} />;
};

export default OptimizedImage;
