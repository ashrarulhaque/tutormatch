import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Pencil, Save, X } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Student, Teacher } from '../utils/types';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user || !user.profile) return <LoadingSpinner />;

  const isTeacher = user.role === 'Teacher';
  const [formData, setFormData] = useState<Student | Teacher>(user.profile);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'education'>('general');

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...(prev as any)[section], [field]: value },
    }));
  };

  const handleSubmit = async () => {
    console.log('Saving profile', formData);
    setEditMode(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={(formData as Teacher | Student).avatar || 'https://res.cloudinary.com/djenv5out/image/upload/user_wlzzc7.png'}
          alt={formData.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-900">{formData.name}</h1>
          <p className="text-sm text-gray-600">{formData.email}</p>
        </div>
      </div>

      <div className="flex space-x-4 border-b mb-4 text-sm">
        <button
          className={`py-2 px-1 border-b-2 ${
            activeTab === 'general' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
          }`}
          onClick={() => setActiveTab('general')}
        >
          General Info
        </button>
        <button
          className={`py-2 px-1 border-b-2 ${
            activeTab === 'education' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
          }`}
          onClick={() => setActiveTab('education')}
        >
          {isTeacher ? 'Education & Experience' : 'Institution Info'}
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'general' && (
          <>
            <InputField
              label="Name"
              value={formData.name}
              disabled={!editMode}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <InputField
              label="Phone Number"
              type="tel"
              value={(formData.phoneNumber ?? '').toString()}
              disabled={!editMode}
              onChange={(e) => handleChange('phoneNumber', Number(e.target.value))}
            />
            <InputField
              label="Country Code"
              type="number"
              value={formData.countryCode ?? 91}
              disabled={!editMode}
              onChange={(e) => handleChange('countryCode', Number(e.target.value))}
            />
            <SelectField
              label="Gender"
              value={formData.gender}
              disabled={!editMode}
              onChange={(e) => handleChange('gender', e.target.value)}
              options={['Male', 'Female', 'Prefer not to say']}
            />
          </>
        )}

        {activeTab === 'education' && (
          <>
            {isTeacher ? (
              <>
                <TextareaField
                  label="Bio"
                  value={(formData as Teacher).bio || ''}
                  disabled={!editMode}
                  onChange={(e) => handleChange('bio', e.target.value)}
                />
                <TextareaField
                  label="Experience"
                  value={(formData as Teacher).experience || ''}
                  disabled={!editMode}
                  onChange={(e) => handleChange('experience', e.target.value)}
                />
                <TextareaField
                  label="Education (comma-separated)"
                  value={((formData as Teacher).education || []).join(', ')}
                  disabled={!editMode}
                  onChange={(e) => handleChange('education', e.target.value.split(',').map(str => str.trim()))}
                />
                <InputField
                  label="Hourly Rate (₹)"
                  type="number"
                  value={(formData as Teacher).hourlyRate || ''}
                  disabled={!editMode}
                  onChange={(e) => handleChange('hourlyRate', Number(e.target.value))}
                />
                <InputField
                  label="Location"
                  value={(formData as Teacher).location || ''}
                  disabled={!editMode}
                  onChange={(e) => handleChange('location', e.target.value)}
                />
              </>
            ) : (
              <>
                <InputField
                  label="Institution Name"
                  value={(formData as Student).institution?.name || ''}
                  disabled={!editMode}
                  onChange={(e) => handleNestedChange('institution', 'name', e.target.value)}
                />
                <InputField
                  label="Class"
                  value={(formData as Student).institution?.class || ''}
                  disabled={!editMode}
                  onChange={(e) => handleNestedChange('institution', 'class', e.target.value)}
                />
              </>
            )}
          </>
        )}

        <div className="mt-6 flex justify-end space-x-2">
          {editMode ? (
            <>
              <button
                className="flex items-center gap-1 border px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setEditMode(false)}
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                onClick={handleSubmit}
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </>
          ) : (
            <button
              className="flex items-center gap-1 border px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setEditMode(true)}
            >
              <Pencil className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, disabled = false, type = 'text' }: {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md text-sm ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, disabled = false }: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        disabled={disabled}
        onChange={onChange}
        rows={3}
        className={`w-full px-3 py-2 border rounded-md text-sm ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, disabled = false, options = [] }: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md text-sm ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
