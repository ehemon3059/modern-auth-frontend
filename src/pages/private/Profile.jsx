/**
 * Profile Page Component
 * User profile management
 */

import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import Card from '../../components/common/Card';
import userService from '../../services/userService';

/**
 * Profile component
 * Displays and allows editing of user profile
 */
const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form handling
  const { formData, handleChange, handleSubmit, errors } = useForm(
    {
      name: user?.name || '',
      bio: user?.profile?.bio || '',
      phone: user?.profile?.phone || '',
      location: user?.profile?.location || ''
    },
    // Validation
    (data) => {
      const newErrors = {};
      
      if (!data.name) {
        newErrors.name = 'Name is required';
      }
      
      if (data.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(data.phone)) {
        newErrors.phone = 'Phone number is invalid';
      }
      
      return newErrors;
    },
    // Submit handler
    async (data) => {
      try {
        setIsLoading(true);
        setError(null);
        
        const profileData = {
          name: data.name,
          profile: {
            bio: data.bio,
            phone: data.phone,
            location: data.location
          }
        };
        
        await userService.updateProfile(profileData);
        setSuccess('Profile updated successfully');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update profile');
      } finally {
        setIsLoading(false);
      }
    }
  );

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      
      <div className="profile-content">
        <Card title="Personal Information">
          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}
          
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            
            <div className="form-field">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="form-textarea"
                rows="4"
              />
            </div>
            
            <Input
              type="tel"
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            
            <Input
              type="text"
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
            />
            
            <Button
              type="submit"
              variant="primary"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;