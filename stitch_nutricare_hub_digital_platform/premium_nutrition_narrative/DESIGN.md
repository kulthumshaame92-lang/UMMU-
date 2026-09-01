---
name: Premium Nutrition Narrative
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#534434'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#867461'
  outline-variant: '#d8c3ad'
  surface-tint: '#855300'
  primary: '#855300'
  on-primary: '#ffffff'
  primary-container: '#f59e0b'
  on-primary-container: '#613b00'
  inverse-primary: '#ffb95f'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#795900'
  on-tertiary: '#ffffff'
  tertiary-container: '#e0a800'
  on-tertiary-container: '#584000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb95f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system embodies a **Premium Boutique Wellness** aesthetic. It moves away from the clinical coldness of traditional healthcare towards an elevated, personalized nutrition experience. The brand personality is expert yet inviting, combining the authority of a clinical dietician with the warmth of a luxury wellness retreat.

The visual style is **Minimalist with Citrus Vitality**. It leverages high-end editorial layouts characterized by generous whitespace and precise typography. The "Boutique" feel is achieved through softer geometry—eschewing sharp edges for organic, approachable curves—while maintaining professional rigor through a structured grid and a disciplined color application. The emotional goal is to evoke a sense of clarity, rejuvenation, and trustworthy guidance.

## Colors

The palette is anchored by the **Citrus Seed (#F59E0B)**, used strategically to highlight energy, action, and motivation. This is balanced by **Vitality Green (#10B981)**, which provides the necessary grounding in health and natural freshness.

- **Primary (Amber/Citrus):** Reserved for primary calls-to-action, progress indicators, and high-energy highlights.
- **Secondary (Green):** Used for success states, "healthy choice" badges, and organic motifs.
- **Neutrals:** A range of sophisticated grays (from Slate 50 to Slate 900) ensures professional legibility.
- **Surface Strategy:** We use a "Pure White" base with "Off-White" surface containers to create a subtle layered effect without relying on heavy borders.

## Typography

The typography pairings bridge modern tech with lifestyle elegance. **Plus Jakarta Sans** is used for headings to provide a friendly, optimistic, and slightly rounded character that feels modern and approachable. **Manrope** is used for all functional and body text; its balanced, geometric proportions ensure exceptional readability for nutritional data and long-form advice.

- **Scale:** On mobile, `display-lg` should scale down to 32px to maintain hierarchy without overwhelming the viewport.
- **Emphasis:** Use medium weights for labels to ensure they stand out against data values. 
- **Leading:** Generous line-heights are maintained across body text to promote a calm, easy reading experience.

## Layout & Spacing

The layout follows a **structured 12-column fixed grid** for desktop, transitioning to a fluid single-column for mobile. The spacing philosophy is "Airy and Intentional," utilizing a 8px base unit.

- **Margins:** Large outer margins (min 24px mobile, up to 80px desktop) frame the content like a high-end magazine.
- **Vertical Rhythm:** Use the `lg` (48px) and `xl` (80px) tokens to separate major content sections, reinforcing the minimalist, "clean" aesthetic.
- **Sectioning:** Content should be grouped into clear logical containers with `md` (24px) internal padding to prevent overcrowding.

## Elevation & Depth

To maintain a premium feel, this design system avoids harsh borders in favor of **Ambient Tonal Depth**. 

- **Level 1 (Default):** Flat surfaces with a subtle 1px border in a very light neutral (#F1F5F9).
- **Level 2 (Cards):** Ultra-soft, diffused shadows. Use a high blur radius (24px-32px) with very low opacity (4-6%) tinted with the primary amber or a neutral cool gray.
- **Level 3 (Modals/Popovers):** Deeper shadows to indicate significant distance from the base layer, paired with a subtle backdrop blur (12px) to keep the focus on the foreground.
- **Interaction:** On hover, cards should subtly lift (decreasing shadow spread and increasing blur) to provide tactile feedback.

## Shapes

The shape language is **Rounded**, reflecting the "Boutique Wellness" theme. By avoiding sharp corners, the UI feels more organic and less like a clinical tool.

- **Standard Components:** Buttons, inputs, and small cards use the `rounded-md` (0.5rem) setting.
- **Feature Containers:** Large meal plan cards or recipe headers use `rounded-lg` (1rem) to emphasize their role as primary content pieces.
- **Interactive Elements:** Small chips and tags use the `rounded-xl` or full pill shape to distinguish them from actionable buttons.

## Components

### Buttons
Primary buttons use a solid Citrus (#F59E0B) fill with white text. Secondary buttons use a "Ghost" style with a 1px border in the secondary green or neutral gray. Interaction states include a subtle darken on press.

### Cards (Meal Plans & Recipes)
Cards are the hero of the platform. They feature high-quality imagery with a `rounded-lg` top-corner radius. Content inside the card uses `body-md` for descriptions and `label-md` for nutritional metrics (e.g., "Kcal", "Protein").

### Input Fields
Inputs are clean and professional: a 1px neutral border, `rounded-md` corners, and a generous 16px internal padding. Focus states should use a subtle 2px Citrus glow.

### Chips & Badges
Used for dietary preferences (e.g., "Vegan," "Gluten-Free"). These are styled with a soft background tint of the Vitality Green (#10B981 at 10% opacity) and dark green text to maintain high contrast and readability.

### Progress & Health Data
Visualized through "Ring" charts or "Soft Bar" charts using the Primary and Secondary colors to denote completion and health targets. These should always be accompanied by clear `headline-sm` data labels.