import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import axios from 'axios';

function Recommendations() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const formData = JSON.parse(localStorage.getItem('musicFormData'));
        if (!formData) {
          throw new Error('No form data found');
        }

        const response = await axios.post('http://localhost:5000/api/recommendations', formData);
        setRecommendations(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Music Recommendations
        </Typography>

        {/* GPT Recommendations */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            AI Suggestions
          </Typography>
          <Typography variant="body1" paragraph>
            {recommendations?.gptRecommendations}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Spotify Recommendations */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Spotify Recommendations
          </Typography>
          <Grid container spacing={3}>
            {recommendations?.spotifyTracks?.map((track) => (
              <Grid item xs={12} sm={6} md={4} key={track.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={track.album.images[0]?.url}
                    alt={track.name}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {track.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {track.artists.map((artist) => artist.name).join(', ')}
                    </Typography>
                    <Button
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ mt: 1 }}
                    >
                      Open in Spotify
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* YouTube Videos */}
        <Box>
          <Typography variant="h5" gutterBottom>
            YouTube Previews
          </Typography>
          <Grid container spacing={3}>
            {recommendations?.youtubeVideos?.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {video.snippet.title}
                    </Typography>
                    <Button
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ mt: 1 }}
                    >
                      Watch on YouTube
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default Recommendations; 