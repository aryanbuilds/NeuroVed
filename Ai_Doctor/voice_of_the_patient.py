import os
import logging
import speech_recognition as sr
from pydub import AudioSegment
from io import BytesIO
import shutil  
from groq import Groq


logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def check_ffmpeg():
    """Check if FFmpeg is installed"""
    if shutil.which("ffmpeg") is None:
        logging.error("FFmpeg is not installed! Install it using `brew install ffmpeg` (Mac) or `sudo apt install ffmpeg` (Linux).")
        return False
    return True

def select_microphone():
    """List and select a microphone"""
    mic_list = sr.Microphone.list_microphone_names()
    
    if not mic_list:
        logging.error("No microphone detected! Please check your microphone settings.")
        return None
    
    logging.info(f"Available Microphones: {mic_list}")
    return 0  

def record_audio(file_path, timeout=20, phrase_time_limit=None):
    """Records audio from the microphone and saves it as an MP3 file."""
    if not check_ffmpeg():
        return

    mic_index = select_microphone()
    if mic_index is None:
        return

    recognizer = sr.Recognizer()
    
    try:
        with sr.Microphone(device_index=mic_index) as source:
            logging.info("Adjusting for ambient noise...")
            recognizer.adjust_for_ambient_noise(source, duration=1)
            logging.info("Start speaking now...")

            
            audio_data = recognizer.listen(source, timeout=timeout, phrase_time_limit=phrase_time_limit)
            logging.info("Recording complete.")

            
            wav_data = audio_data.get_wav_data()
            audio_segment = AudioSegment.from_wav(BytesIO(wav_data))
            
            
            audio_segment.export(file_path, format="mp3", bitrate="128k")
            logging.info(f"Audio successfully saved to {file_path}")

    except sr.WaitTimeoutError:
        logging.error("No speech detected within the timeout period.")
    except sr.RequestError:
        logging.error("Could not request results from the speech recognition service.")
    except FileNotFoundError:
        logging.error("Pydub or FFmpeg might not be installed correctly. Ensure `ffmpeg` is in your system path.")
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}", exc_info=True)

def transcribe_with_groq(stt_model, audio_filepath):
    """Transcribes audio using Groq API."""
    
    groq_api_key = os.environ.get("GROQ_API_KEY")
    if not groq_api_key:
        logging.error("GROQ_API_KEY is missing. Set it as an environment variable.")
        return " ERROR: GROQ_API_KEY is missing."

    client = Groq(api_key=groq_api_key)
    
    with open(audio_filepath, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model=stt_model,
            file=audio_file,
            language="en"
        )
    
    
    return transcription.text


if __name__ == "__main__":
    print("Script started...")
    record_audio(file_path="patient_voice_test.mp3")
    print("Script finished.")
