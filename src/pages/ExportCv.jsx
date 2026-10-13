// import html2canvas from 'html2canvas-pro';
// import { jsPDF } from 'jspdf';

// export default function ExportCv({ cv }) {
//     const handleExportPdf = async () => {
//         const element = document.getElementById('cv-preview');

//         if (!element) {
//             alert("L'aperçu du CV est introuvable.");
//             return;
//         }

//         const nom = (cv?.nom || 'CV')
//             .trim()
//             .replace(/[^a-zA-Z0-9-_]/g, '_');

//         const prenom = (cv?.prenom || '')
//             .trim()
//             .replace(/[^a-zA-Z0-9-_]/g, '_');

//         const filename = `${nom}_${prenom}_CV.pdf`;

//         try {
//             // Attendre le chargement des polices
//             if (document.fonts?.ready) {
//                 await document.fonts.ready;
//             }

//             const pageWidth = pdf.internal.pageSize.getWidth();
// const pageHeight = pdf.internal.pageSize.getHeight();

// // Calculer les dimensions de l'image
// const imageWidth = canvas.width;
// const imageHeight = canvas.height;

// const ratio = Math.min(
//     pageWidth / imageWidth,
//     pageHeight / imageHeight
// );

// // Adapter le CV à une seule page A4
// const finalWidth = imageWidth * ratio;
// const finalHeight = imageHeight * ratio;

// // Centrer le CV sur la page
// const x = (pageWidth - finalWidth) / 2;
// const y = (pageHeight - finalHeight) / 2;

// const imageData = canvas.toDataURL('image/jpeg', 0.98);

// pdf.addImage(
//     imageData,
//     'JPEG',
//     x,
//     y,
//     finalWidth,
//     finalHeight
// );

// pdf.save(filename);
//         } catch (error) {
//             console.error(
//                 "Erreur lors de la génération du PDF :",
//                 error
//             );

//             alert(
//                 "Erreur PDF : " +
//                 (error?.message || "Erreur inconnue.")
//             );
//         }
//     };

//     return (
//         <button
//             type="button"
//             onClick={handleExportPdf}
//             className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
//         >
//             Télécharger en PDF
//         </button>
//     );
// }






// import html2canvas from 'html2canvas-pro';
// import { jsPDF } from 'jspdf';

// const A4_WIDTH_MM = 210;
// const A4_HEIGHT_MM = 297;

// function sanitize(value, fallback = '') {
//     return (value || fallback).trim().replace(/[^a-zA-Z0-9-_]/g, '_');
// }
// // Recopie toutes les règles CSS de la page dans le document utilisé pour la capture.
// function copyStylesTo(targetDocument) {
//     let css = '';

//     Array.from(document.styleSheets).forEach((sheet) => {
//         try {
//             css += Array.from(sheet.cssRules)
//                 .map((rule) => rule.cssText)
//                 .join('\n');
//         } catch {
//             // Feuille d'une autre origine (ex. Google Fonts) : illisible, on l'ignore.
//         }
//     });

//     const style = targetDocument.createElement('style');
//     style.textContent = css;
//     targetDocument.head.appendChild(style);
// }
// // Attend que toutes les images du clone soient chargées et décodées.
// async function waitForImages(root) {
//     const images = Array.from(root.querySelectorAll('img'));

//     await Promise.all(
//         images.map(async (img) => {
//             if (!img.complete) {
//                 await new Promise((resolve) => {
//                     img.onload = resolve;
//                     img.onerror = resolve;
//                 });
//             }

//             if (img.naturalWidth === 0) {
//                 console.warn('Image non chargée :', img.src);
//                 return;
//             }

//             if (typeof img.decode === 'function') {
//                 try {
//                     await img.decode();
//                 } catch (error) {
//                     console.warn('Décodage impossible :', img.src, error);
//                 }
//             }
//         })
//     );
// }

// // Crée une copie du CV à taille A4 réelle, hors de l'écran.
// function createPrintableClone(element) {
//     const clone = element.cloneNode(true);
//     clone.removeAttribute('id');

//     Object.assign(clone.style, {
//         transform: 'none',
//         zoom: '1',
//         position: 'static',
//         margin: '0',
//         width: `${A4_WIDTH_MM}mm`,
//         minHeight: `${A4_HEIGHT_MM}mm`,
//         maxWidth: 'none',
//         boxShadow: 'none',
//     });

//     const wrapper = document.createElement('div');
//     Object.assign(wrapper.style, {
//         position: 'fixed',
//         top: '0',
//         left: '-10000px',
//         width: `${A4_WIDTH_MM}mm`,
//         background: '#ffffff',
//     });

//     wrapper.appendChild(clone);
//     document.body.appendChild(wrapper);

//     return { wrapper, clone };
// }

// export default function ExportCv({ cv }) {
//     const handleExportPdf = async () => {
//         const element = document.getElementById('cv-preview');

//         if (!element) {
//             alert("L'aperçu du CV est introuvable.");
//             return;
//         }

//         const filename = `${sanitize(cv?.nom, 'CV')}_${sanitize(cv?.prenom)}_CV.pdf`;

//         let wrapper = null;

//         try {
//             if (document.fonts?.ready) {
//                 await document.fonts.ready;
//             }

//             const printable = createPrintableClone(element);
//             wrapper = printable.wrapper;

//             await waitForImages(printable.clone);

//             const canvas = await html2canvas(printable.clone, {
//                 scale: 2,
//                 useCORS: true,
//                 backgroundColor: '#ffffff',
//                 logging: false,
//                 scrollX: 0,
//                 scrollY: 0,
//             });

//             const pdf = new jsPDF({
//                 orientation: 'portrait',
//                 unit: 'mm',
//                 format: 'a4',
//             });

//             const pageWidth = pdf.internal.pageSize.getWidth();
//             const pageHeight = pdf.internal.pageSize.getHeight();

//             // Le CV occupe toute la largeur de la page (pas de réduction).
//             const totalHeightMm = (canvas.height * pageWidth) / canvas.width;

//             if (totalHeightMm <= pageHeight + 1) {
//                 // Une seule page : placée en haut à gauche, sans déformation.
//                 pdf.addImage(
//                     canvas.toDataURL('image/jpeg', 0.95),
//                     'JPEG',
//                     0,
//                     0,
//                     pageWidth,
//                     totalHeightMm
//                 );
//             } else {
//                 // Plusieurs pages : on découpe le canvas par tranches d'A4.
//                 const sliceHeightPx = Math.floor(
//                     (canvas.width * pageHeight) / pageWidth
//                 );
//                 let position = 0;
//                 let pageIndex = 0;

//                 while (position < canvas.height) {
//                     const currentSlice = Math.min(
//                         sliceHeightPx,
//                         canvas.height - position
//                     );

//                     const pageCanvas = document.createElement('canvas');
//                     pageCanvas.width = canvas.width;
//                     pageCanvas.height = currentSlice;

//                     const context = pageCanvas.getContext('2d');
//                     context.fillStyle = '#ffffff';
//                     context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
//                     context.drawImage(
//                         canvas,
//                         0,
//                         position,
//                         canvas.width,
//                         currentSlice,
//                         0,
//                         0,
//                         canvas.width,
//                         currentSlice
//                     );

//                     if (pageIndex > 0) {
//                         pdf.addPage();
//                     }

//                     pdf.addImage(
//                         pageCanvas.toDataURL('image/jpeg', 0.95),
//                         'JPEG',
//                         0,
//                         0,
//                         pageWidth,
//                         (currentSlice * pageWidth) / canvas.width
//                     );

//                     position += currentSlice;
//                     pageIndex += 1;
//                 }
//             }

//             pdf.save(filename);
//         } catch (error) {
//             console.error('Erreur lors de la génération du PDF :', error);
//             alert('Erreur PDF : ' + (error?.message || 'Erreur inconnue.'));
//         } finally {
//             // Toujours supprimer la copie temporaire.
//             wrapper?.remove();
//         }
//     };

//     return (
//         <button
//             type="button"
//             onClick={handleExportPdf}
//             className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
//         >
//             Télécharger en PDF
//         </button>
//     );
// }






import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Nettoie une valeur pour l'utiliser dans un nom de fichier.
function sanitize(value, fallback = '') {
    return (value || fallback).trim().replace(/[^a-zA-Z0-9-_]/g, '_');
}

// Recopie toutes les règles CSS de la page dans le document utilisé pour la capture.
// Sans ça, les classes Tailwind ne sont pas appliquées dans le PDF.
function copyStylesTo(targetDocument) {
    let css = '';

    Array.from(document.styleSheets).forEach((sheet) => {
        try {
            css += Array.from(sheet.cssRules)
                .map((rule) => rule.cssText)
                .join('\n');
        } catch {
            // Feuille d'une autre origine (ex. Google Fonts) : illisible, on l'ignore.
        }
    });

    const style = targetDocument.createElement('style');
    style.textContent = css;
    targetDocument.head.appendChild(style);
}

// Attend que toutes les images du clone soient chargées et décodées.
async function waitForImages(root) {
    const images = Array.from(root.querySelectorAll('img'));

    await Promise.all(
        images.map(async (img) => {
            if (!img.complete) {
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }

            if (img.naturalWidth === 0) {
                console.warn('Image non chargée :', img.src);
                return;
            }

            if (typeof img.decode === 'function') {
                try {
                    await img.decode();
                } catch (error) {
                    console.warn('Décodage impossible :', img.src, error);
                }
            }
        })
    );
}

// Crée une copie du CV à taille A4 réelle, hors de l'écran.
function createPrintableClone(element) {
    const clone = element.cloneNode(true);
    clone.removeAttribute('id');

    Object.assign(clone.style, {
        transform: 'none',
        zoom: '1',
        position: 'static',
        margin: '0',
        width: `${A4_WIDTH_MM}mm`,
        minHeight: `${A4_HEIGHT_MM}mm`,
        maxWidth: 'none',
        boxShadow: 'none',
    });

    const wrapper = document.createElement('div');
    Object.assign(wrapper.style, {
        position: 'fixed',
        top: '0',
        left: '-10000px',
        width: `${A4_WIDTH_MM}mm`,
        background: '#ffffff',
    });

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    return { wrapper, clone };
}

// Ajoute le canvas au PDF : une seule page si possible, sinon plusieurs.
function addCanvasToPdf(pdf, canvas) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Le CV occupe toute la largeur de la page (pas de réduction).
    const totalHeightMm = (canvas.height * pageWidth) / canvas.width;

    if (totalHeightMm <= pageHeight + 1) {
        pdf.addImage(
            canvas.toDataURL('image/jpeg', 0.95),
            'JPEG',
            0,
            0,
            pageWidth,
            totalHeightMm
        );
        return;
    }

    // Plusieurs pages : on découpe le canvas par tranches d'A4.
    const sliceHeightPx = Math.floor((canvas.width * pageHeight) / pageWidth);
    let position = 0;
    let pageIndex = 0;

    while (position < canvas.height) {
        const currentSlice = Math.min(sliceHeightPx, canvas.height - position);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = currentSlice;

        const context = pageCanvas.getContext('2d');

        if (!context) {
            throw new Error('Impossible de préparer la page du PDF.');
        }

        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        context.drawImage(
            canvas,
            0,
            position,
            canvas.width,
            currentSlice,
            0,
            0,
            canvas.width,
            currentSlice
        );

        if (pageIndex > 0) {
            pdf.addPage();
        }

        pdf.addImage(
            pageCanvas.toDataURL('image/jpeg', 0.95),
            'JPEG',
            0,
            0,
            pageWidth,
            (currentSlice * pageWidth) / canvas.width
        );

        position += currentSlice;
        pageIndex += 1;
    }
}

export default function ExportCv({ cv }) {
    const handleExportPdf = async () => {
        const element = document.getElementById('cv-preview');

        if (!element) {
            alert("L'aperçu du CV est introuvable.");
            return;
        }

        const filename = `${sanitize(cv?.nom, 'CV')}_${sanitize(cv?.prenom)}_CV.pdf`;

        let wrapper = null;

        try {
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }

            const printable = createPrintableClone(element);
            wrapper = printable.wrapper;

            await waitForImages(printable.clone);

            const canvas = await html2canvas(printable.clone, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                scrollX: 0,
                scrollY: 0,
                // Applique les styles Tailwind dans le document de capture.
                onclone: (clonedDocument) => copyStylesTo(clonedDocument),
            });

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            addCanvasToPdf(pdf, canvas);
            pdf.save(filename);
        } catch (error) {
            console.error('Erreur lors de la génération du PDF :', error);
            alert('Erreur PDF : ' + (error?.message || 'Erreur inconnue.'));
        } finally {
            // Toujours supprimer la copie temporaire.
            wrapper?.remove();
        }
    };

    return (
        <button
            type="button"
            onClick={handleExportPdf}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
            Télécharger en PDF
        </button>
    );
}