import { Heading } from '../Common/Typography';
import { GalleryCard } from '../gallery/GalleryCard';
import { Button } from '../ui/button';
import { FeaturedCard } from './FeaturedCard';

export const FeatureAndCards = ({
  data,
  title,
  navigate,
  dark,
}: {
  navigate?: boolean;
  title: string;
  data: any;
  dark?: boolean;
}) => {
  return (
    <section className=" ">
      <div className="space-y-12">
        <Heading variant="h3">{title}</Heading>
        <FeaturedCard data={data[0]} />
        <div className="grid gap-x-6 grid-cols-3 ">
          {data?.slice(1, data.length).map((item: any, idx: any) => {
            return (
              <GalleryCard
                key={idx}
                gallery={false}
                data={item}
              />
            );
          })}
        </div>
        {navigate && (
          <div className="flex justify-end">
            <Button className='cursor-pointer'>All News And Press Releases</Button>
          </div>
        )}
      </div>
    </section>
  );
};
