import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { updateMajor, fetchMajorById } from './api.admin'; // Impor fungsi fetchMajorById

type FormData = {
  majorName: string;
  linkIcon: string;
};

type UpdateModalProps = {
  open: boolean;
  onClose: () => void;
  majorId: string;
  currentMajorName: string;
  currentIconUrl: string;
};

const modalEditMajor = ({ open, onClose, majorId, currentMajorName, currentIconUrl }: UpdateModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    majorName: currentMajorName,
    linkIcon: currentIconUrl,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadMajorData = async () => {
      if (majorId) {
        try {
          const majorData = await fetchMajorById(majorId); // Ambil data berdasarkan majorId
          setFormData({
            majorName: majorData.titleMajor,
            linkIcon: majorData.iconUrl,
          });
        } catch (error) {
          console.error('Failed to load major data:', error);
        }
      }
    };

    loadMajorData(); // Panggil fungsi untuk mengambil data major saat pertama kali load
  }, [majorId]); // Efek ini akan dipanggil ulang jika majorId berubah

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({}); // Reset errors sebelum submit

    // Validasi input
    if (!formData.majorName || !formData.linkIcon) {
      setErrors({
        majorName: formData.majorName ? '' : 'Major name is required.',
        linkIcon: formData.linkIcon ? '' : 'Link icon is required.',
      });
      return;
    }

    try {
      await updateMajor(majorId, formData.majorName, formData.linkIcon); // Update data
      alert('Major updated successfully!');
      onClose(); // Tutup modal setelah berhasil update
    } catch (error) {
      console.error('Error updating major:', error);
      alert('Failed to update major. Please try again.');
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: 24 }}>
      <form onSubmit={handleSubmit}>
        {/* Major Name */}
        <TextField
          label="Major Name"
          name="majorName"
          value={formData.majorName}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          error={Boolean(errors.majorName)}
          helperText={errors.majorName}
        />

        {/* Link Icon */}
        <TextField
          label="Link Icon"
          name="linkIcon"
          value={formData.linkIcon}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          error={Boolean(errors.linkIcon)}
          helperText={errors.linkIcon}
        />

        {/* Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default modalEditMajor;
