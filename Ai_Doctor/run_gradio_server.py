import os
import gradio as gr
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from brain_of_the_doctor import encode_image, analyze_image_with_query
from voice_of_the_patient import transcribe_with_groq
from voice_of_the_doctor import text_to_speech_with_elevenlabs


system_prompt = (
    "You have to act as a professional doctor. This is for learning purposes. "
    "Analyze the provided image. If you detect a medical issue, suggest possible causes and remedies. "
    "Do not use numbers or bullet points. Keep your response in a natural, human-like tone. "
    "Be concise—max two sentences. Do not mention that you are an AI or describe the image explicitly."
)

def process_inputs(text_input, audio_filepath, image_filepath):
    
    # Handle text input or audio input
    if text_input:
        speech_to_text_output = text_input
    elif audio_filepath:
        speech_to_text_output = transcribe_with_groq(
            stt_model="whisper-large-v3",
            audio_filepath=audio_filepath
        )
    else:
        speech_to_text_output = "No input provided."

    
    if image_filepath:
        encoded_image = encode_image(image_filepath)
        if encoded_image:
            
            query = system_prompt + " " + speech_to_text_output
            doctor_response = analyze_image_with_query(
                query=query,
                encoded_image=encoded_image,
                model="llama-3.2-90b-vision-preview"
            )
        else:
            doctor_response = " ERROR: Image encoding failed."
    else:
        doctor_response = "No image provided for analysis."

    
    doctor_voice_filepath = text_to_speech_with_elevenlabs(
        input_text=doctor_response,
        output_filepath="final.mp3",
        autoplay=False
    )

    return speech_to_text_output, doctor_response, doctor_voice_filepath


iface = gr.Interface(
    fn=process_inputs,
    inputs=[
        gr.Textbox(placeholder="Type your symptoms here...", label="Text Input"),
        gr.Audio(sources=["microphone", "upload"], type="filepath", label="Or Speak Your Symptoms (Optional)"),
        gr.Image(type="filepath", label="Upload an Image (Optional)")
    ],
    outputs=[
        gr.Textbox(label="Your Input"),
        gr.Textbox(label="Doctor's Diagnosis"),
        gr.Audio(label="Doctor's Response Audio")
    ],
    title="AI Doctor with Vision & Voice",
    description="Type or speak your symptoms and optionally upload an image. The AI doctor will analyze and provide a response.",
    theme="default"
)

if __name__ == "__main__":
    # Launch with specific server settings for integration with Next.js
    iface.launch(
        server_name="0.0.0.0",  # Bind to all network interfaces
        server_port=7860,       # Default Gradio port
        share=False,            # Don't use Gradio's sharing feature
        debug=True
    ) 