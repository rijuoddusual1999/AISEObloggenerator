import Image from "next/image";
import { Logo } from "../components/Logo";
import image from "../public/image_lg1.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex justify-center items-center">
      {/* Background Image */}
      <Image src={image} alt="image" layout="fill" objectFit="cover" className="absolute" />

      {/* Logo Container */}
      <div className="relative z-10 text-gray-700 text-center">
        <div className="bg-yellow-200/95 rounded-md backdrop-blur-sm p-12">
          <Logo />
          <p>
          Elevate engagement with our SEO-optimized AI-generated blogs!
          </p>
          <p>
          Stay ahead digitally with smart, industry-tailored content creation. Explore the future of blogging with us!
          </p>
          <Link href='/post/new' className='btn'>Start</Link>
        </div>
      </div>
    </div>
  );
}
