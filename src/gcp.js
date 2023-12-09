const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const { transcribeAudio } = require("tinywhisper");

const app = express();
const PORT = 3000;

// Supabase configuration
const supabaseUrl = "https://fvkizqrdfbyphvkwwthf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2a2l6cXJkZmJ5cGh2a3d3dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2Nzk1NjMsImV4cCI6MjAwMzI1NTU2M30.dNIK_gRseH0BfjYK88bq1LFCGmKQ4YZRriU6G5sMJss";
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint to transcribe a file from Supabase Storage
app.get("/transcribe/:filename", async (req, res) => {
  const { filename } = req.params;

  // Download file from Supabase Storage
  const { data, error } = await supabase.storage
    .from("image")
    .download(`/${filename}`);

  if (error) {
    return res
      .status(500)
      .json({ error: "Error downloading file from Supabase Storage" });
  }

  const audioBuffer = Buffer.from(data);

  // Transcribe the audio using TinyWhisper
  const transcription = await transcribeAudio(audioBuffer);

  res.json({ transcription });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
