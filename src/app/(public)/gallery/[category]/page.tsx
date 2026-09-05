import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ category: string }>;
}

/** Category URLs are no longer used — all artwork lives on the main gallery page. */
export default async function GalleryCategoryPage(_props: Props) {
  redirect('/gallery');
}
