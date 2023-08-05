import Carousel from "components/Carousel/Carousel";
import Image from "next/image";
import { LoanRequestForm } from "components/LoanRequestForm/LoanRequestForm";
import { client, urlFor } from "lib/sanity-client";
import { toySlugQuery } from "lib/sanity-queries";
import { Toy } from "types/common";
import { PortableTxt } from "components/PortableTxt/PortableTxt";

interface Props {
  params: {
    slug: string;
  };
}

async function Page({ params: { slug } }: Props) {
  const toy = await client.fetch<Toy>(toySlugQuery, { slug });
  const images = toy.images;
  const description = toy.description;
  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl">
        <h4 className="mb-4 text-center">Juguetes</h4>
        <h1 className="mb-8 text-center text-2xl font-bold md:text-4xl">
          {toy.name}
        </h1>

        <Carousel isFullWidth>
          {images.map((image) => (
            <Image
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw"
              placeholder={"blur"}
              blurDataURL={image.placeholder}
              key={image.asset._ref}
              src={urlFor(image).url()}
              alt={image.altText}
              className="mx-auto aspect-video w-full rounded"
            />
          ))}
        </Carousel>

        <h2 className="my-8 text-2xl font-bold md:text-4xl">Descripción</h2>
        <PortableTxt content={description} />
        <LoanRequestForm />
      </div>
    </section>
  );
}

export default Page;
