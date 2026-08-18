from typing import Dict, List, Optional
import random

class TemplateService:
    def __init__(self):
        self.templates = {
            "professional": {
                "name": "Professional",
                "prefixes": [
                    "Experience the excellence of",
                    "Discover the quality of",
                    "Introducing the professional-grade"
                ],
                "suffixes": [
                    "Designed for discerning professionals.",
                    "Built to exceed expectations.",
                    "The trusted choice for businesses."
                ]
            },
            "casual": {
                "name": "Casual",
                "prefixes": [
                    "Check out this amazing",
                    "You've got to see this",
                    "Get ready for"
                ],
                "suffixes": [
                    "It's seriously awesome!",
                    "You won't be disappointed.",
                    "Totally worth it!"
                ]
            },
            "luxury": {
                "name": "Luxury",
                "prefixes": [
                    "Indulge in the premium",
                    "Experience the epitome of luxury with",
                    "Elevate your lifestyle with"
                ],
                "suffixes": [
                    "Crafted for those who demand the best.",
                    "Where excellence meets elegance.",
                    "The ultimate in refined taste."
                ]
            },
            "technical": {
                "name": "Technical",
                "prefixes": [
                    "Engineered for performance:",
                    "Technical excellence in",
                    "Precision-engineered"
                ],
                "suffixes": [
                    "Optimized for maximum efficiency.",
                    "Built to exacting specifications.",
                    "Tested for reliability and durability."
                ]
            },
            "friendly": {
                "name": "Friendly",
                "prefixes": [
                    "You'll love this",
                    "Say hello to",
                    "Meet your new favorite"
                ],
                "suffixes": [
                    "We know you'll enjoy it!",
                    "It's made just for you.",
                    "You're going to love it!"
                ]
            },
            "enthusiastic": {
                "name": "Enthusiastic",
                "prefixes": [
                    "Get excited about",
                    "Amazing news! Check out",
                    "You won't believe this"
                ],
                "suffixes": [
                    "It's absolutely incredible!",
                    "This changes everything!",
                    "You need this in your life!"
                ]
            },
            "minimalist": {
                "name": "Minimalist",
                "prefixes": [
                    "Introducing",
                    "Presenting",
                    "Meet"
                ],
                "suffixes": [
                    "Simple. Clean. Effective.",
                    "Less is more.",
                    "Essential by design."
                ]
            }
        }
    
    def generate_from_template(
        self, 
        template_id: str, 
        product_name: str, 
        features: List[str], 
        audience: str = "general audience"
    ) -> Dict:
        """Generate description from template"""
        template = self.templates.get(template_id, self.templates["professional"])
        
        prefix = random.choice(template["prefixes"])
        suffix = random.choice(template["suffixes"])
        
        short_desc = f"{prefix} {product_name}. "
        if features:
            short_desc += f"Features {', '.join(features[:3])}. "
        short_desc += f"Perfect for {audience}. {suffix}"
        
        # Generate bullet points from features
        bullet_points = features[:7] if features else [
            "High quality construction",
            "Durable and long-lasting",
            "Easy to use",
            "Excellent value for money",
            "Satisfaction guaranteed"
        ]
        
        return {
            "title": f"{product_name} - Quality Product",
            "short_description": short_desc,
            "long_description": (
                f"{short_desc}\n\n"
                f"This exceptional product offers outstanding value and performance. "
                f"With {len(features) if features else 'multiple'} key features, "
                f"it's designed to meet your needs and exceed your expectations. "
                f"Whether you're a professional or a casual user, {product_name} "
                f"delivers consistent quality and reliability."
            ),
            "bullet_points": bullet_points,
            "seo_title": f"Buy {product_name} Online | Best Price",
            "meta_description": short_desc[:150],
            "model_used": f"template_{template_id}"
        }
    
    def get_all_templates(self) -> List[Dict]:
        """Get all available templates"""
        return [
            {
                "id": key, 
                "name": value["name"],
                "description": f"Generate {value['name'].lower()} product descriptions"
            }
            for key, value in self.templates.items()
        ]
    
    def get_template_by_id(self, template_id: str) -> Optional[Dict]:
        """Get template by ID"""
        return self.templates.get(template_id)