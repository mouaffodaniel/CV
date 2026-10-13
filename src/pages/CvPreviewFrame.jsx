import { useLayoutEffect, useRef, useState } from 'react';

// Taille d'une page A4 en pixels (1 mm = 96 / 25,4 px)
const A4_WIDTH_PX = (210 * 96) / 25.4;
const A4_HEIGHT_PX = (297 * 96) / 25.4;

// Réduit le CV pour qu'il tienne dans la largeur disponible.
export default function CvPreviewFrame({ children }) {
    const containerRef = useRef(null);
    const pageRef = useRef(null);

    const [scale, setScale] = useState(1);
    const [pageHeight, setPageHeight] = useState(A4_HEIGHT_PX);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const page = pageRef.current;

        if (!container || !page) {
            return;
        }

        const update = () => {
            const availableWidth = container.clientWidth;

            // Zone masquée (onglet inactif) : on attend qu'elle réapparaisse.
            if (availableWidth === 0) {
                return;
            }

            setScale(Math.min(1, availableWidth / A4_WIDTH_PX));
            setPageHeight(page.offsetHeight);
        };

        update();

        // Recalcule quand la fenêtre ou le contenu du CV change de taille.
        const observer = new ResizeObserver(update);
        observer.observe(container);
        observer.observe(page);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="w-full">
            {/* Réserve la place réellement occupée par le CV réduit */}
            <div
                className="mx-auto"
                style={{
                    width: A4_WIDTH_PX * scale,
                    height: pageHeight * scale,
                }}
            >
                {/* CV à sa taille réelle, réduit visuellement */}
                <div
                    ref={pageRef}
                    style={{
                        width: A4_WIDTH_PX,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}