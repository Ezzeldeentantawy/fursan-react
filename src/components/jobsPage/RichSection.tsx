import { getVal } from './utils/jobUtils';

const RichSection = ({ id, label, html }) => {
    const text = getVal(html);
    if (!text) return null;

    return (
        <section aria-labelledby={id} id={id} className="border-b">
            <h4 id={id} className="text-xl font-semibold text-[#A2A6A4] pb-2 mb-4">
                {label}
            </h4>
            <div
                className="text-gray-700 leading-relaxed prose max-w-none"
                dangerouslySetInnerHTML={{ __html: text }}
            />
        </section>
    );
};

export default RichSection;