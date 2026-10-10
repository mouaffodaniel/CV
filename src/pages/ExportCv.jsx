
// import html2pdf from 'html2pdf.js';

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

//         const options = {
//             margin: 0,
//             filename,
//             image: {
//                 type: 'jpeg',
//                 quality: 0.98,
//             },
//             html2canvas: {
//                 scale: 2,
//                 useCORS: true,
//                 backgroundColor: '#ffffff',
//                 scrollX: 0,
//                 scrollY: 0,
//             },
//             jsPDF: {
//                 unit: 'mm',
//                 format: 'a4',
//                 orientation: 'portrait',
//             },
//             pagebreak: {
//                 mode: ['css', 'legacy'],
//             },
//         };

//         try {
//             await html2pdf()
//                 .set(options)
//                 .from(element)
//                 .save();
//         } 
//         // catch (error) {
//         //     console.error(
//         //         "Erreur lors de la génération du PDF :",
//         //         error
//         //     );
//         //     alert("Impossible de générer le PDF.");
//         // }

//         catch (error) {
//     console.error("Erreur lors de la génération du PDF :", error);

//     alert(
//         "Erreur PDF : " +
//         (error?.message || "Erreur inconnue. Consulte la console.")
//     );
// }
//     };

//     return (
//         <button
//             type="button"
//             onClick={handleExportPdf}
//             className="rounded-lg bg-emerald-600 px-5 py-2.5
//                        text-sm font-semibold text-white
//                        transition hover:bg-emerald-700"
//         >
//             Télécharger en PDF
//         </button>
//     );
// }


import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

export default function ExportCv({ cv }) {
    const handleExportPdf = async () => {
        const element = document.getElementById('cv-preview');

        if (!element) {
            alert("L'aperçu du CV est introuvable.");
            return;
        }

        const nom = (cv?.nom || 'CV')
            .trim()
            .replace(/[^a-zA-Z0-9-_]/g, '_');

        const prenom = (cv?.prenom || '')
            .trim()
            .replace(/[^a-zA-Z0-9-_]/g, '_');

        const filename = `${nom}_${prenom}_CV.pdf`;

        try {
            // Attendre le chargement des polices
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }

            // // Attendre le chargement des images
            // const images = Array.from(element.querySelectorAll('img'));

            // await Promise.all(
            //     images.map((img) => {
            //         if (img.complete) {
            //             return Promise.resolve();
            //         }

            //         return new Promise((resolve) => {
            //             img.onload = resolve;
            //             img.onerror = resolve;
            //         });
            //     })
            // );
             // Attendre le chargement et le décodage des images
const images = Array.from(element.querySelectorAll('img'));

await Promise.all(
    images.map(async (img) => {
        if (!img.complete) {
            await new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        }

        if (img.naturalWidth === 0) {
            console.warn("Image non chargée :", img.src);
            return;
        }

        if (typeof img.decode === 'function') {
            try {
                await img.decode();
            } catch (error) {
                console.warn("Décodage impossible :", img.src, error);
            }
        }
    })
);

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                scrollX: 0,
                scrollY: 0,
            });

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            // const pageWidth = pdf.internal.pageSize.getWidth();
            // const pageHeight = pdf.internal.pageSize.getHeight();

            // // Hauteur du contenu correspondant à une page A4
            // const pageHeightPx =
            //     Math.floor(canvas.width * pageHeight / pageWidth);

            // let position = 0;
            // let pageNumber = 0;

            // while (position < canvas.height) {
            //     const sliceHeight = Math.min(
            //         pageHeightPx,
            //         canvas.height - position
            //     );

            //     const pageCanvas = document.createElement('canvas');
            //     pageCanvas.width = canvas.width;
            //     pageCanvas.height = sliceHeight;

            //     const context = pageCanvas.getContext('2d');

            //     if (!context) {
            //         throw new Error(
            //             "Impossible de préparer la page du PDF."
            //         );
            //     }

            //     context.fillStyle = '#ffffff';
            //     context.fillRect(
            //         0,
            //         0,
            //         pageCanvas.width,
            //         pageCanvas.height
            //     );

            //     context.drawImage(
            //         canvas,
            //         0,
            //         position,
            //         canvas.width,
            //         sliceHeight,
            //         0,
            //         0,
            //         canvas.width,
            //         sliceHeight
            //     );

            //     if (pageNumber > 0) {
            //         pdf.addPage();
            //     }

            //     const imageData = pageCanvas.toDataURL('image/jpeg', 0.98);
            //     const imageHeight = sliceHeight * pageWidth / canvas.width;

            //     pdf.addImage(
            //         imageData,
            //         'JPEG',
            //         0,
            //         0,
            //         pageWidth,
            //         imageHeight
            //     );

            //     position += sliceHeight;
            //     pageNumber += 1;
            // }

            // pdf.save(filename);

            const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();

// Calculer les dimensions de l'image
const imageWidth = canvas.width;
const imageHeight = canvas.height;

const ratio = Math.min(
    pageWidth / imageWidth,
    pageHeight / imageHeight
);

// Adapter le CV à une seule page A4
const finalWidth = imageWidth * ratio;
const finalHeight = imageHeight * ratio;

// Centrer le CV sur la page
const x = (pageWidth - finalWidth) / 2;
const y = (pageHeight - finalHeight) / 2;

const imageData = canvas.toDataURL('image/jpeg', 0.98);

pdf.addImage(
    imageData,
    'JPEG',
    x,
    y,
    finalWidth,
    finalHeight
);

pdf.save(filename);
        } catch (error) {
            console.error(
                "Erreur lors de la génération du PDF :",
                error
            );

            alert(
                "Erreur PDF : " +
                (error?.message || "Erreur inconnue.")
            );
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