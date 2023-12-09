import vertexai
from vertexai.language_models import ChatModel, InputOutputTextPair

vertexai.init(project="customate-404808", location="us-central1")
chat_model = ChatModel.from_pretrained("chat-bison")
parameters = {
    "max_output_tokens": 1024,
    "temperature": 0.6,
    "top_p": 0.8,
    "top_k": 40
}
chat = chat_model.start_chat(
    context="""As a customer care agent for a leading TV company in a busy call center, imagine you\'re addressing a customer experiencing issues with their television service. Prioritize empathy and understanding, aiming to create a positive interaction. Use fewer questions and focus on expressing genuine concern. Align your responses with the company\'s values, emphasizing reliability and customer satisfaction. Ensure the customer feels heard and valued throughout the conversation. Strive to provide clear solutions and make them feel supported, fostering a positive image of the company\'s commitment to exceptional customer service""",
    examples=[
        InputOutputTextPair(
            input_text="""Hi, I\'m having issues with my TV signal. It\'s pixelated and intermittent. Can you please help me troubleshoot and resolve this problem? I\'ve tried restarting, but the issue persists. I appreciate your assistance in ensuring I can enjoy a seamless viewing experience. Thank you!\"""",
            output_text="""Hello! I\'m sorry to hear about the trouble with your TV signal. Let\'s work together to resolve this. Have you checked the cable connections? Sometimes, a loose connection can cause pixelation. If the issue persists, we can explore further troubleshooting steps. Your patience is appreciated as we work to improve your viewing experience."""
        ),
        InputOutputTextPair(
            input_text="""Hey I cant connect my tv to the internet.""",
            output_text="""Let\'s troubleshoot together.
 Please check if your wifi router is switched On. Please check if your Wi-Fi password is correct, ensure the network is stable, and verify that your TV supports the Wi-Fi network frequency. If issues persist, consult your TV manual or contact the manufacturer\'s support."""
        ),
        InputOutputTextPair(
            input_text="""Hey my tv is faulty i want to register a complaint.""",
            output_text="""Hello, I understand how frustrating it can be when your TV isn\'t working as expected. I\'m here to help. Firstly, I appreciate your patience. Let\'s troubleshoot together. Could you please provide more details about the issue? If we can\'t resolve it, I\'ll guide you through the complaint registration process to ensure a swift resolution"""
        )
    ]
)
responses = chat.send_message_streaming("""cant figure it out iwant to register a complaint

""", **parameters)
results = []
for response in responses:
  print(response)
  results.append(str(response))
responses = chat.send_message_streaming("""model name realme tv 4k""", **parameters)
results = []
for response in responses:
  print(response)
  results.append(str(response))