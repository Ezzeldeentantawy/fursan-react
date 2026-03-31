import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";


const KeyValueEditor = ({ value = {}, onChange, lang }) => {
  const entries = Object.entries(value);

  const updateKey = (oldKey, newKey) => {
    const updated = {};
    Object.entries(value).forEach(([k, v]) => {
      updated[k === oldKey ? newKey : k] = v;
    });
    onChange(updated);
  };

  const updateValue = (key, newVal) => {
    onChange({ ...value, [key]: newVal });
  };

  const addRow = () => {
    const newKey = `field_${Date.now()}`;
    onChange({ ...value, [newKey]: '' });
  };

  const removeRow = (key) => {
    const updated = { ...value };
    delete updated[key];
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {entries.map(([key, val]) => (
        <div key={key} className="flex gap-2 items-center">
          <input
            className="w-1/3 p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A69C6] outline-none text-sm"
            placeholder={lang === 'en' ? 'Key (e.g. Experience)' : 'المفتاح'}
            value={key.startsWith('field_') ? '' : key}
            onChange={(e) => updateKey(key, e.target.value)}
          />
          <input
            className="flex-1 p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A69C6] outline-none text-sm"
            placeholder={lang === 'en' ? 'Value' : 'القيمة'}
            value={val}
            onChange={(e) => updateValue(key, e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeRow(key)}
            className="text-red-400 hover:text-red-600 px-2 text-lg font-bold"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="text-[#2A69C6] text-sm font-semibold hover:underline mt-1"
      >
        + Add field
      </button>
    </div>
  );
};

const CreateJob = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    type: 'onsite',
    is_easy_apply: false,
    apply_link: '',
    location: { en: '', ar: '' }, // ✅ now localized
    title: { en: '', ar: '' },
    details: { en: {}, ar: {} },
    job_description: { en: '', ar: '' },
    requirements: { en: '', ar: '' },
    benefits: { en: '', ar: '' },
    overview: { en: '', ar: '' },
    image: null
  });

  const handleInputChange = (field, value, isLocalized = true) => {
    if (isLocalized) {
      setJobData(prev => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value }
      }));
    } else {
      setJobData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('type', jobData.type);
    formData.append('is_easy_apply', jobData.is_easy_apply ? '1' : '0'); // ✅ add this
    if (!jobData.is_easy_apply && !jobData.apply_link.trim()) {
      alert(getLabel('Apply link is required when Easy Apply is disabled.', 'رابط التقديم مطلوب عند تعطيل التقديم السريع.'));
      setLoading(false);
      return;
    }
    if (jobData.image) formData.append('image', jobData.image);

    Object.keys(jobData).forEach(key => {
      if (key === 'image' || key === 'type' || key === 'is_easy_apply' || key === 'apply_link') return;

      if (key === 'details') {
        formData.append('details[en]', JSON.stringify(jobData.details.en));
        formData.append('details[ar]', JSON.stringify(jobData.details.ar));
      } else if (typeof jobData[key] === 'object' && jobData[key] !== null) {
        formData.append(`${key}[en]`, jobData[key].en);
        formData.append(`${key}[ar]`, jobData[key].ar);
      }
    });

    try {
      await api.post(`/api/employer/jobs`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Job created successfully!");
      navigate('/employer/dashboard/jobs');
    } catch (error) {
      console.error("Failed:", error.response?.data || error.message);
      alert("Error creating job. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const getLabel = (en, ar) => (lang === 'en' ? en : ar);

  const dummyJob = {
    type: 'onsite',
    location: { en: 'Riyadh, KSA', ar: 'الرياض, السعودية' }, // ✅ updated
    title: { en: 'Senior Full Stack Developer', ar: 'مطور فول ستاك سينيور' },
    details: {
      en: {
        'experience': 'Remote friendly, 5+ years experience'
      }, ar: {
        'experience': 'خيارات العمل عن بعد، خبرة +5 سنوات'
      }
    },
    job_description: {
      en: 'We are looking for a React and Laravel expert...',
      ar: 'نحن نبحث عن خبير في React و Laravel...'
    },
    requirements: {
      en: 'Proficiency in PHP, JavaScript, and SQL.',
      ar: 'إتقان لغات PHP و JavaScript و SQL.'
    },
    benefits: {
      en: 'Health Insurance, Performance Bonus, Paid Time Off',
      ar: 'تأمين صحي، مكافآت أداء، إجازة مدفوعة'
    },
    overview: {
      en: 'A leading tech startup in the heart of Riyadh.',
      ar: 'شركة تقنية ناشئة رائدة في قلب الرياض.'
    },
    image: null
  };

  const fillTestData = () => setJobData(dummyJob);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto bg-white rounded-[30px] shadow-xl overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="bg-[#2A69C6] p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold font-['Roboto']">
              {getLabel('Post a New Job', 'نشر وظيفة جديدة')}
            </h2>
            <p className="opacity-80 mt-1 text-sm">Fill in the details in both English and Arabic</p>
          </div>
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={fillTestData}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors"
            >
              ⚡ Quick Fill (Test)
            </button>
          </div>
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors text-sm font-medium"
          >
            {lang === 'en' ? 'Switch to Arabic 🇸🇦' : 'Switch to English 🇺🇸'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Easy Apply Checkbox */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => {
                const next = !jobData.is_easy_apply;
                handleInputChange('is_easy_apply', next, false);
                if (next) handleInputChange('apply_link', '', false);
              }}
              className={`w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center rounded-[5px] border cursor-pointer transition-colors duration-150 ${jobData.is_easy_apply
                ? 'bg-emerald-600 border-emerald-700'
                : 'bg-white border-gray-300'
                }`}
            >
              {jobData.is_easy_apply && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path
                    d="M1 4L4 7.5L10 1"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              id="is_easy_apply"
              name="is_easy_apply"
              checked={jobData.is_easy_apply}
              onChange={(e) => handleInputChange('is_easy_apply', e.target.checked, false)}
              className="hidden"
            />
            <label
              htmlFor="is_easy_apply"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              {getLabel('Easy Apply', 'تقديم سريع')}
            </label>
          </div>

          {/* Apply Link — shown only when Easy Apply is off */}
          {!jobData.is_easy_apply && (
            <div className="flex flex-col gap-1.5 mt-1">
              <label htmlFor="apply_link" className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {getLabel('Apply Link', 'رابط التقديم')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-2.5 text-gray-400">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1" />
                    <path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" />
                  </svg>
                </span>
                <input
                  type="url"
                  id="apply_link"
                  name="apply_link"
                  value={jobData.apply_link}
                  onChange={(e) => handleInputChange('apply_link', e.target.value, false)}
                  placeholder="https://yourcompany.com/careers/apply"
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                />
              </div>
            </div>
          )}
          {/* Basic Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{getLabel('Job Type', 'نوع الوظيفة')}</label>
              <select
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A69C6] outline-none transition-all"
                value={jobData.type}
                onChange={(e) => handleInputChange('type', e.target.value, false)}
              >
                <option value="remote">Remotely</option>
                <option value="onsite">On-site</option>
              </select>
            </div>

            {/* ✅ Location is now localized — uses handleInputChange with isLocalized: true */}
            <div className={`space-y-2 transition-opacity ${jobData.type !== 'onsite' ? 'opacity-30 pointer-events-none' : ''}`}>
              <label className="text-sm font-bold text-gray-700">{getLabel('Location', 'الموقع')}</label>
              <input
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A69C6] outline-none"
                type="text"
                placeholder={getLabel('e.g. Riyadh, KSA', 'مثال: الرياض، السعودية')}
                value={jobData.location[lang]}  // ✅ reads current lang
                onChange={(e) => handleInputChange('location', e.target.value)} // ✅ isLocalized defaults to true
              />
            </div>
          </div>

          <div className="border-t border-gray-100 my-6"></div>

          {/* Localized Content Section */}
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-[#2A69C6] flex items-center justify-center text-xs font-bold">
                {lang.toUpperCase()}
              </span>
              <span className="text-gray-500 text-sm font-medium">Currently Editing {lang === 'en' ? 'English' : 'Arabic'} version</span>
            </div>

            {/* ✅ input fields stay as-is, textarea fields now use RichTextEditor */}
            {[
              { id: 'title', label: ['Job Title', 'المسمى الوظيفي'], type: 'input' },
              { id: 'details', label: ['Job Subtitle/Details', 'تفاصيل فرعية'], type: 'kv' },
              { id: 'overview', label: ['Company Overview', 'نظرة عامة'], type: 'rich' },
              { id: 'job_description', label: ['Job Description', 'الوصف الوظيفي'], type: 'rich' },
              { id: 'requirements', label: ['Requirements', 'المتطلبات'], type: 'rich' },
              { id: 'benefits', label: ['Benefits & Perks', 'المميزات'], type: 'rich' },
            ].map((field) => (
              <div key={field.id} className="space-y-1">
                <label className="text-sm font-bold text-gray-700">
                  {getLabel(field.label[0], field.label[1])}
                </label>
                {field.type === 'input' ? (
                  <input
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A69C6] outline-none"
                    value={jobData[field.id][lang]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    required
                  />
                ) : field.type === 'kv' ? (
                  // ✅ Key-Value editor for localized content
                  <KeyValueEditor
                    lang={lang}
                    value={jobData[field.id][lang]}
                    onChange={(val) => handleInputChange(field.id, val)}
                  />
                ) : (
                  // ✅ RichTextEditor receives the current lang's value and updates only that lang
                  <RichTextEditor
                    lang={lang}
                    value={jobData[field.id][lang]}
                    onChange={(val) => handleInputChange(field.id, val)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Image Upload */}
          <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200 text-center">
            <label className="block text-sm font-bold text-gray-700 mb-2">{getLabel('Cover Image', 'صورة الغلاف')}</label>
            <input
              type="file"
              accept="image/*"
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => handleInputChange('image', e.target.files[0], false)}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-6">
            <button
              disabled={loading}
              type="submit"
              className="flex-1 bg-[#2A69C6] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#1e4b8f] transition-all shadow-lg shadow-blue-200 disabled:bg-gray-300"
            >
              {loading ? 'Processing...' : getLabel('Publish Job', 'نشر الوظيفة')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateJob;