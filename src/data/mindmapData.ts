export interface MindmapNode {
  id: string;
  title: string;
  summary: string;
  description?: string;
  notes?: string;
  children?: MindmapNode[];
}

export const mindmapData: MindmapNode = {
  id: "root",
  title: "Vitamins in Human Body",
  summary: "Essential organic compounds required for normal physiological functions, growth, and maintenance of health.",
  description: "Vitamins are micronutrients that the body needs in small amounts to function properly. They play crucial roles in metabolism, immunity, and overall health.",
  notes: "There are 13 essential vitamins that humans need.",
  children: [
    {
      id: "classification",
      title: "Vitamin Classification",
      summary: "Vitamins are classified based on their solubility properties.",
      description: "The two main categories are fat-soluble and water-soluble vitamins, each with distinct absorption and storage characteristics.",
      children: [
        {
          id: "fat-soluble",
          title: "Fat-Soluble Vitamins",
          summary: "Vitamins A, D, E, and K - stored in body fat tissues.",
          description: "These vitamins are absorbed along with fats in the diet and can be stored in the body's fatty tissue and liver.",
          children: [
            {
              id: "vitamin-a",
              title: "Vitamin A (Retinol)",
              summary: "Essential for vision, immune function, and skin health.",
              notes: "Found in liver, fish oils, eggs, and orange vegetables."
            },
            {
              id: "vitamin-d",
              title: "Vitamin D (Calciferol)",
              summary: "Regulates calcium absorption and bone health.",
              notes: "Synthesized through sunlight exposure."
            },
            {
              id: "vitamin-e",
              title: "Vitamin E (Tocopherol)",
              summary: "Powerful antioxidant protecting cells from damage.",
              notes: "Found in nuts, seeds, and vegetable oils."
            },
            {
              id: "vitamin-k",
              title: "Vitamin K",
              summary: "Essential for blood clotting and bone metabolism.",
              notes: "Found in leafy greens and fermented foods."
            }
          ]
        },
        {
          id: "water-soluble",
          title: "Water-Soluble Vitamins",
          summary: "B-complex vitamins and Vitamin C - not stored in body.",
          description: "These vitamins dissolve in water and are not stored in significant amounts, requiring regular dietary intake.",
          children: [
            {
              id: "vitamin-c",
              title: "Vitamin C (Ascorbic Acid)",
              summary: "Antioxidant essential for collagen synthesis and immunity.",
              notes: "Abundant in citrus fruits, berries, and peppers."
            },
            {
              id: "b-complex",
              title: "B-Complex Vitamins",
              summary: "Eight vitamins essential for energy metabolism.",
              children: [
                {
                  id: "b1",
                  title: "B1 (Thiamine)",
                  summary: "Converts nutrients into energy."
                },
                {
                  id: "b2",
                  title: "B2 (Riboflavin)",
                  summary: "Helps break down fats and drugs."
                },
                {
                  id: "b12",
                  title: "B12 (Cobalamin)",
                  summary: "Critical for nerve function and DNA synthesis."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "functions",
      title: "Vitamin Functions",
      summary: "Key roles vitamins play in maintaining body health.",
      description: "Vitamins serve as coenzymes, antioxidants, and regulators of various metabolic processes.",
      children: [
        {
          id: "metabolism",
          title: "Metabolic Support",
          summary: "B vitamins act as coenzymes in energy production pathways.",
          notes: "Essential for converting food into cellular energy."
        },
        {
          id: "immunity",
          title: "Immune Function",
          summary: "Vitamins A, C, D, and E support immune system health.",
          notes: "Help protect against infections and diseases."
        },
        {
          id: "antioxidant",
          title: "Antioxidant Protection",
          summary: "Vitamins C and E neutralize harmful free radicals.",
          notes: "Protect cells from oxidative stress and damage."
        }
      ]
    },
    {
      id: "sources",
      title: "Dietary Sources",
      summary: "Natural food sources rich in essential vitamins.",
      children: [
        {
          id: "fruits-veg",
          title: "Fruits & Vegetables",
          summary: "Rich in vitamins A, C, K, and folate.",
          notes: "Colorful produce offers diverse vitamin profiles."
        },
        {
          id: "animal-products",
          title: "Animal Products",
          summary: "Primary source of B12, D, and preformed vitamin A.",
          notes: "Includes meat, fish, eggs, and dairy."
        },
        {
          id: "fortified-foods",
          title: "Fortified Foods",
          summary: "Foods enhanced with added vitamins.",
          notes: "Common examples: cereals, milk, plant-based alternatives."
        }
      ]
    },
    {
      id: "deficiency",
      title: "Deficiency Disorders",
      summary: "Health conditions caused by inadequate vitamin intake.",
      children: [
        {
          id: "scurvy",
          title: "Scurvy",
          summary: "Vitamin C deficiency causing bleeding gums and weakness.",
        },
        {
          id: "rickets",
          title: "Rickets",
          summary: "Vitamin D deficiency leading to bone deformities.",
        },
        {
          id: "night-blindness",
          title: "Night Blindness",
          summary: "Vitamin A deficiency affecting vision in low light.",
        }
      ]
    }
  ]
};
