import { IPageSection } from '../models/Page';

export interface SectionInput {
  sectionId?: string;
  sectionKey: string;
  sectionType?: string;
  label?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  richText?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundImage?: string;
  mainImage?: string;
  additionalImages?: { url: string; alt?: string; order?: number }[];
  layout?: string;
  theme?: string;
  order?: number;
  isVisible?: boolean;
}

export function createSection(input: SectionInput): IPageSection {
  return {
    sectionId: input.sectionId || input.sectionKey,
    sectionKey: input.sectionKey,
    sectionType: input.sectionType || 'content',
    label: input.label || input.sectionKey,
    eyebrow: input.eyebrow || '',
    heading: input.heading || '',
    subheading: input.subheading || '',
    description: input.description || '',
    richText: input.richText || '',
    buttonText: input.buttonText || '',
    buttonUrl: input.buttonUrl || '',
    backgroundImage: input.backgroundImage || '',
    mainImage: input.mainImage || '',
    additionalImages: input.additionalImages || [],
    layout: input.layout || 'default',
    theme: input.theme || 'dark',
    order: input.order ?? 0,
    isVisible: input.isVisible !== false,
  };
}
