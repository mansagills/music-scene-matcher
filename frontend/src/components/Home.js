import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Slider,
} from '@mui/material';

const genres = [
  'Pop',
  'Rock',
  'Hip Hop',
  'Electronic',
  'Jazz',
  'Classical',
  'R&B',
  'Country',
  'Metal',
  'Folk',
];

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    scene: '',
    mood: '',
    tempo: 120,
    genre: '',
    instrumentation: '',
    referenceTrack: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTempoChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      tempo: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store form data in localStorage for the recommendations page
    localStorage.setItem('musicFormData', JSON.stringify(formData));
    navigate('/recommendations');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Find the Perfect Music for Your Scene
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Scene Description"
                name="scene"
                value={formData.scene}
                onChange={handleChange}
                multiline
                rows={3}
                required
                helperText="Describe your scene or situation"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mood"
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                required
                helperText="e.g., Happy, Sad, Tense, Relaxed"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Tempo (BPM)</Typography>
              <Slider
                value={formData.tempo}
                onChange={handleTempoChange}
                min={60}
                max={200}
                valueLabelDisplay="auto"
                marks={[
                  { value: 60, label: '60' },
                  { value: 120, label: '120' },
                  { value: 200, label: '200' },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Instrumentation"
                name="instrumentation"
                value={formData.instrumentation}
                onChange={handleChange}
                helperText="e.g., Piano, Guitar, Strings, Electronic"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reference Track"
                name="referenceTrack"
                value={formData.referenceTrack}
                onChange={handleChange}
                helperText="A song that has a similar feel to what you're looking for"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Get Recommendations
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default Home; 