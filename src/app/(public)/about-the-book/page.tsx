import { redirect } from 'next/navigation';

export default function AboutTheBookPage() {
  redirect('/books?tab=excerpts');
}
