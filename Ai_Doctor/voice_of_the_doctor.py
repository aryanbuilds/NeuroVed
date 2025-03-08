import os
import platform
import subprocess
from gtts import gTTS
import elevenlabs
from elevenlabs.client import ElevenLabs


ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY")
if not ELEVENLABS_API_KEY:
    raise ValueError(" ERROR: ELEVENLABS_API_KEY is not set in environment variables.")


def play_audio(file_path):
    os_name = platform.system()
    try:
        print(f"🔊 Playing {file_path} using subprocess...", flush=True)
        if os_name == "Darwin":  
            subprocess.run(["afplay", file_path], check=True)
        elif os_name == "Windows":
            subprocess.run(["powershell", "-c", f'(New-Object Media.SoundPlayer "{file_path}").PlaySync();'], check=True)
        elif os_name == "Linux":
            subprocess.run(["aplay", file_path], check=True)
        else:
            raise OSError("Unsupported operating system")
        print(" Audio playback completed successfully!", flush=True)
    except subprocess.CalledProcessError as e:
        print(f" ERROR: Subprocess failed to play audio: {e}", flush=True)
    except Exception as e:
        print(f" ERROR: Unable to play audio: {e}", flush=True)


def text_to_speech_with_gtts(input_text, output_filepath, autoplay=False):
    print(" Generating speech with gTTS...", flush=True)
    try:
        audioobj = gTTS(text=input_text, lang="en", slow=False)
        print(f" Saving gTTS file to {output_filepath}...", flush=True)
        audioobj.save(output_filepath)
        print(" gTTS Speech synthesis complete!", flush=True)
        if autoplay:
            play_audio(output_filepath)
        return output_filepath
    except Exception as e:
        print(f" ERROR in gTTS: {e}", flush=True)
        return None


def text_to_speech_with_elevenlabs(input_text, output_filepath, autoplay=False):
    try:
        print("🔍 Checking ElevenLabs API key...", flush=True)
        client = ElevenLabs(api_key=ELEVENLABS_API_KEY)
        print(" ElevenLabs API Key Loaded!", flush=True)

        print("🎙️ Generating speech with ElevenLabs...", flush=True)
        audio = client.generate(
            text=input_text,
            voice="Aria",
            output_format="mp3_22050_32",
            model="eleven_turbo_v2"
        )

        print(f" Saving ElevenLabs audio to {output_filepath}...", flush=True)
        elevenlabs.save(audio, filename=output_filepath)
        print(" ElevenLabs Speech synthesis complete!", flush=True)
        if autoplay:
            play_audio(output_filepath)
        return output_filepath
    except Exception as e:
        print(f" ERROR in ElevenLabs: {e}", flush=True)
        return None

if __name__ == "__main__":
    input_text = "Hi, this is Utkarsh"
    gtts_output_file = "gtts_testing.mp3"
    elevenlabs_output_file = "elevenlabs_testing.mp3"
    
    print(" Script started...", flush=True)
    
    text_to_speech_with_gtts(input_text, gtts_output_file, autoplay=True)
    text_to_speech_with_elevenlabs(input_text, elevenlabs_output_file, autoplay=True)
    print(" Script execution finished.", flush=True)
