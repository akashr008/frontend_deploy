import React from 'react';
import { Box, Button, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const FilterCards = ({ jobTitles, locations, selectedJobTitles, selectedLocations, handleJobTitleChange, handleLocationChange, resetFilters }) => {
  return (
    <Box sx={{
      width: '180px',
      padding: 2,
      backgroundColor: '#ecf0f1',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
      borderRadius: '4px',
      height: 'auto',
      position:'fixed'
    }}>
      <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: 'bold', fontSize: '16px' }}>Industry</Typography>
      <FormGroup>
        {jobTitles.map(title => (
          <FormControlLabel
            key={title}
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={selectedJobTitles.includes(title)}
                onClick={() => handleJobTitleChange(title)}
                value={title}
                size="30px"
              />
            }
            label={title}
            sx={{
              marginBottom: 1,
              '& .MuiFormControlLabel-label': {
                fontSize: '14px',
                color: '#555',
              },
            }}
          />
        ))}
      </FormGroup>

      <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: 'bold', fontSize: '16px' }}>Location</Typography>
      <FormGroup>
        {locations.map(location => (
          <FormControlLabel
            key={location}
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={selectedLocations.includes(location)}
                onClick={() => handleLocationChange(location)}
                value={location}
                size="30px"
              />
            }
            label={location}
            sx={{
              marginBottom: 1,
              '& .MuiFormControlLabel-label': {
                fontSize: '14px',
                color: '#555',
              },
            }}
          />
        ))}
      </FormGroup>

      <Button
        onClick={resetFilters}
        fullWidth
        sx={{
          marginTop: 2,
          backgroundColor: '#f8f8f8',
          borderRadius: '4px',
          color: '#444',
          '&:hover': {
            backgroundColor: '#e1e1e1',
          },
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterCards;


