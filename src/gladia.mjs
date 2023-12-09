import axios from "axios";
import FormData from "form-data";
import audiofile from "./speech.mp3";
const form = new FormData();
form.append("audio_file", audiofile);
form.append("toggle_diarization", "true");

const response = await axios.post(
  "https://api.gladia.io/audio/text/audio-transcription/",
  form,
  {
    headers: {
      ...form.getHeaders(),
      "x-gladia-key": "404b3198-852b-45fa-bd27-cd06c29be377",
    },
  }
);

console.log(response.data);
