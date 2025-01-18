// import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { BlogSkeleton } from "./BlogSkeleton";
import Navbar from "./user-profile/Navbar";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { useBlogs } from '../hooks/index';
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export default  function BentoGridDemo() {

   const { loading, blogs } = useBlogs()
    const navigate = useNavigate()
    if (!localStorage.getItem('token')) {
      navigate('/signin')
    }
    if (loading) {
      return (
        <div>
          <Navbar />
          <div className='flex justify-center'>
            <div>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </div>
          </div>
        </div>
      )
    }
  return (
    <BentoGrid className="max-w-7xl mx-auto">
  {blogs.map((item, i) => (
    <BentoGridItem
      key={i}
      title={item.title}
      description={item.content}
      className="relative"
      icon={item._count.comment} // Add this
    >
      {/* Add a fixed aspect ratio container */}
      <div className="relative aspect-[16/9] w-full h-full">
        <img
          src={item.url}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      
      {/* Optional: Add an overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
      
      {/* Position the content at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2 className="text-white text-xl font-bold line-clamp-2">{item.title}</h2>
        <p className="text-white/80 text-sm mt-2 line-clamp-2">{item.description}</p>
      </div>
    </BentoGridItem>
  ))}
</BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
