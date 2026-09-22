'use client';



import { GalleryCarouselRow } from '@/components/public/gallery/GalleryCarouselRow';

import type { GalleryDiskCollection } from '@/lib/load-gallery-images';



interface GalleryScrollRowsProps {

  collections: GalleryDiskCollection[];

  onImageClick?: (collectionIndex: number, imageIndex: number) => void;

}



export function GalleryScrollRows({ collections, onImageClick }: GalleryScrollRowsProps) {

  if (!collections.length) return null;



  return (

    <section className="py-10 sm:py-14 bg-light-canvas overflow-hidden w-full max-w-full text-gallery-black">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 text-center">

        <p className="font-dramatic text-artist-crimson text-xs tracking-[0.3em] uppercase mb-3">Art Collections</p>

        <h2 className="font-display text-3xl sm:text-4xl text-deep-oxblood">Four Galleries</h2>

        <p className="text-gallery-black/70 mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">

          Three paintings at a time — tap the sides to browse, centre image opens full view.

        </p>

      </div>



      <div className="space-y-14 sm:space-y-20">

        {collections.map((collection, collectionIndex) => (

          <div key={collection.id} className="border-t border-warm-gray/15 pt-10 sm:pt-12 first:border-t-0 first:pt-0">

            <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center sm:text-left">

              <h3 className="font-display text-2xl sm:text-3xl text-deep-oxblood">{collection.title}</h3>

            </div>



            <GalleryCarouselRow

              images={collection.images}

              onImageClick={(imageIndex) => onImageClick?.(collectionIndex, imageIndex)}

            />

          </div>

        ))}

      </div>

    </section>

  );

}


