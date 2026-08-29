# WhatsApp RAG Bot Integration — Kairos Flow

## 1. Overview
The Kairos Flow AI Consultant is connected to WhatsApp in two ways:
1. **Interactive Client Handover**: When visitors chat with the AI Consultant on the website, they can click **"Continue on WhatsApp"** or the WhatsApp icon in the header. The system automatically compiles the conversation brief and opens a pre-filled WhatsApp chat with Founder Desvanth (+91 77022 56073).
2. **Direct WhatsApp Business Cloud Webhook (`/api/whatsapp/webhook`)**: Incoming messages received via WhatsApp Business Cloud API are automatically processed by the RAG knowledge base, generating instant consulting replies and scope recommendations.

## 2. Webhook Endpoints
- **Verification URL**: `https://kairosflow.agency/api/whatsapp/webhook`
- **Verify Token**: Configured via `WHATSAPP_VERIFY_TOKEN` (required)
- **Supported Methods**: `GET` (Meta verification handshake), `POST` (Incoming WhatsApp message dispatcher)

## 3. Environment Variables
- `WHATSAPP_VERIFY_TOKEN`: Verification secret for Meta Developers portal
- `WHATSAPP_ACCESS_TOKEN`: Meta Graph API token to send automated WhatsApp replies
- `WHATSAPP_PHONE_NUMBER_ID`: WhatsApp Business Phone ID (for number +91 77022 56073)
