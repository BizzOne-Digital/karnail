import { redirect } from 'next/navigation';

/** Category URLs are no longer used — all artwork lives on the main gallery page. */
export default function GalleryCategoryPage() {
  redirect('/gallery');
}
