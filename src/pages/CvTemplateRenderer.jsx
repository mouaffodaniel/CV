import CvTemplateClassic from './CvTemplateClassic';
import CvTemplateMinimal from './CvTemplateMinimal';
import CvTemplateModern from './CvTemplateModern';
import CvTemplateStudent from './CvTemplateStudent';
import CvTemplateExecutive from './CvTemplateExecutive';
import CvTemplateElegant from './CvTemplateElegant';
import CvTemplateCorporate from './CvTemplateCorporate';

export default function CvTemplateRenderer({ cv }) {
    const template = cv?.template || 'classic';

    switch (template) {
        case 'minimal':
            return <CvTemplateMinimal cv={cv} />;

        case 'modern':
            return <CvTemplateModern cv={cv} />;

        case 'student':
            return <CvTemplateStudent cv={cv} />;
        case 'executive':
            return <CvTemplateExecutive cv={cv} />;
        case 'elegant':
            return <CvTemplateElegant cv={cv} />;
        case 'corporate':
            return <CvTemplateCorporate cv={cv} />;

        case 'classic':
        default:
            return <CvTemplateClassic cv={cv} />;
        
    }
}