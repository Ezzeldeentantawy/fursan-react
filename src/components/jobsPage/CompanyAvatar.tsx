const CompanyAvatar = ({ image, name }) => {
    const initial = name?.charAt(0)?.toUpperCase() ?? '?';
    const storageUrl = import.meta.env.VITE_API_URL ?? '';

    return (
        <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
            {image ? (
                <img
                    src={`${storageUrl}/${image}`}
                    alt={`${name} logo`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            ) : (
                <span className="text-[10px] font-semibold text-gray-500">{initial}</span>
            )}
        </div>
    );
};

export default CompanyAvatar;