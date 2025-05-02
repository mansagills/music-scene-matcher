const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const SpotifyWebApi = require('spotify-web-api-node');
const { google } = require('googleapis');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Spotify
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Initialize YouTube
const youtube = google.youtube('v3');

// Routes
app.post('/api/recommendations', async (req, res) => {
  try {
    const { scene, mood, tempo, genre, instrumentation, referenceTrack } = req.body;

    // Get GPT recommendations
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a music expert that provides detailed music recommendations based on scene descriptions and mood."
        },
        {
          role: "user",
          content: `Please suggest music styles and artists for the following scene:
            Scene: ${scene}
            Mood: ${mood}
            Tempo: ${tempo}
            Genre: ${genre}
            Instrumentation: ${instrumentation}
            Reference Track: ${referenceTrack}`
        }
      ]
    });

    // Get Spotify recommendations
    const spotifyResponse = await spotifyApi.getRecommendations({
      seed_genres: [genre],
      target_tempo: tempo,
      limit: 5
    });

    // Get YouTube videos
    const youtubeResponse = await youtube.search.list({
      key: process.env.YOUTUBE_API_KEY,
      part: 'snippet',
      q: `${referenceTrack} official audio`,
      type: 'video',
      maxResults: 5
    });

    res.json({
      gptRecommendations: gptResponse.choices[0].message.content,
      spotifyTracks: spotifyResponse.body.tracks,
      youtubeVideos: youtubeResponse.data.items
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 