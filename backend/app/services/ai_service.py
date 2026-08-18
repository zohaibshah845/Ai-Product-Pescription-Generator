import openai
import json
import logging
from typing import Dict, List, Any, Optional
from app.utils.config import settings

logger = logging.getLogger(__name__)

class AIDescriptionService:
    def __init__(self):
        self.openai_client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        
        self.tone_prompts = {
            "professional": "Write in a professional, business-oriented tone with formal language.",
            "casual": "Write in a friendly, conversational tone using everyday language.",
            "luxury": "Write in an elegant, premium, sophisticated tone with refined vocabulary.",
            "fun": "Write in an energetic, playful, enthusiastic tone with creative language.",
            "persuasive": "Write in a persuasive, benefit-driven tone with strong calls to action.",
            "emotional": "Write in an emotional, storytelling tone that connects with feelings.",
            "technical": "Write in a technical, detailed tone focusing on specifications and features."
        }
        
        self.length_guidelines = {
            "short": "50-100 words, concise and impactful.",
            "medium": "100-200 words, balanced and informative.",
            "long": "200-300 words, detailed and comprehensive.",
            "extra_long": "300-500 words, extensive and thorough."
        }

    async def generate_description(
        self,
        product_name: str,
        category: str,
        key_features: List[str],
        target_audience: str,
        tone: str,
        length: str,
        additional_info: Optional[str] = None,
        template: Optional[Dict] = None,
        language: str = "en"
    ) -> Dict[str, Any]:
        prompt = self._build_prompt(
            product_name, category, key_features, 
            target_audience, tone, length, additional_info,
            template, language
        )
        
        try:
            response = await self._generate_with_openai(prompt)
        except Exception as e:
            logger.warning(f"OpenAI failed: {str(e)}")
            response = self._get_fallback_response()
        
        return self._parse_response(response, product_name)

    def _build_prompt(self, product_name, category, features, audience, 
                      tone, length, additional_info, template, language):
        base_prompt = f"""Generate a compelling product description for the following product:

Product Name: {product_name}
Category: {category}
Key Features: {', '.join(features)}
Target Audience: {audience}
{additional_info if additional_info else ''}

Language: {language}

Tone: {self.tone_prompts.get(tone, 'Write in a professional tone.')}
Length: {self.length_guidelines.get(length, 'Write a balanced description.')}

Please provide the following in JSON format:
1. title: A catchy, SEO-friendly product title
2. description: The main product description with engaging content
3. bullet_points: List of 5-7 key features/benefits
4. seo_keywords: List of 5-8 SEO-optimized keywords

Make the description compelling, benefit-focused, and tailored to the target audience.
"""
        return base_prompt

    async def _generate_with_openai(self, prompt: str) -> str:
        response = self.openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are an expert e-commerce copywriter. Respond in valid JSON format."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000,
            response_format={"type": "json_object"}
        )
        return response.choices[0].message.content

    def _get_fallback_response(self) -> str:
        return json.dumps({
            "title": "Premium Product",
            "description": "High-quality product designed for your needs.",
            "bullet_points": ["High quality", "Durable", "Great value"],
            "seo_keywords": ["quality", "durable", "value"]
        })

    def _parse_response(self, response: str, product_name: str) -> Dict[str, Any]:
        try:
            clean_response = response.strip()
            if clean_response.startswith("```json"):
                clean_response = clean_response[7:]
            if clean_response.endswith("```"):
                clean_response = clean_response[:-3]
            
            data = json.loads(clean_response)
            
            return {
                "title": data.get("title", f"Premium {product_name}"),
                "description": data.get("description", "High-quality product designed for your needs."),
                "bullet_points": data.get("bullet_points", ["High quality", "Durable", "Great value"]),
                "seo_keywords": data.get("seo_keywords", ["quality", "durable", "value"])
            }
        except json.JSONDecodeError:
            logger.error(f"Failed to parse JSON response")
            return {
                "title": f"Premium {product_name}",
                "description": "High-quality product designed for your needs.",
                "bullet_points": ["High quality", "Durable", "Great value"],
                "seo_keywords": ["product", "quality", "value"]
            }